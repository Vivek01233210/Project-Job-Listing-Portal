import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CiUser } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserProfileAPI, updateProfileAPI, updateResumeAPI } from '../../APIServices/userAPI.js';

export default function JobSeekerDash() {

  const imageInputRef = useRef(null);

  const { data: user } = useQuery({
    queryKey: ["user-auth"],
    queryFn: getUserProfileAPI,
  });
  // console.log(user);

  useEffect(() => {
    if (user) {
      setProfile(prevProfile => ({
        ...prevProfile,
        fullName: user?.user?.fullName || '',
        email: user?.user?.email || '',
        profilePic: user?.user?.profilePic || '',
        headline: user?.user?.headline || '',
        skills: user?.user?.skills || '',
        description: user?.user?.description || '',
        city: user?.user?.city || '',
        state: user?.user?.state || '',
        country: user?.user?.country || '',
        mobile: user?.user?.mobile || '',
        linkedIn: user?.user?.linkedIn || '',
      }));
    }
  }, [user]);

  const [profile, setProfile] = useState({
    profilePic: '',
    fullName: '',
    headline: '',
    skills: '',
    description: '',
    city: '',
    state: '',
    country: '',
    email: '',
    mobile: '',
    linkedIn: '',
  });

  const [isEditing, setIsEditing] = useState({
    fullName: false,
    headline: false,
    skills: false,
    description: false,
    location: false,
    contact: false,
  });

  const saveMutation = useMutation({
    mutationKey: ["checkout"],
    mutationFn: updateProfileAPI,
  });

  const updateResume = useMutation({
    mutationKey: ["checkout"],
    mutationFn: updateResumeAPI,
  });

  const handleSave = async (field) => {
    saveMutation
      .mutateAsync(profile)
      .then(() => toast.success('Profile updated successfully'))
    setIsEditing({ ...isEditing, [field]: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Invalid file type. Only .jpg, .jpeg, and .png files are allowed.');
    }
  };

  const handleResumeChange = async (event) => {
    const file = event.target.files[0];
    // setProfile({ ...profile, resume: file });
    // console.log(file)
    const formData = new FormData();
    formData.append('resume', file);

    updateResume
      .mutateAsync(formData)
      .then(() => toast.success('Resume uploaded successfully'))
      .catch((error) => console.log(error));
  };

  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  return (
    <div className="container mx-auto p-6 min-h-screen max-w-lg lg:max-w-2xl">
      <div className="p-6 rounded shadow-xl">
        <div className="flex items-center mb-6">
          <div className="relative">
            {profile.profilePic ? (
              <img src={profile.profilePic} alt="Profile" className="w-24 h-24 rounded-full" />
            ) : (
              <CiUser className="w-24 h-24 p-4 bg-gray-200 rounded-full" />
            )}
            {/* <img src={profile.profilePic || 'https://via.placeholder.com/150'} alt="Profile" className="w-24 h-24 rounded-full" /> */}
            <button onClick={() => imageInputRef.current.click()} className="absolute bottom-1 right-1 bg-gray-300 p-1 rounded-full">
              <HiPencil />
            </button>
            <div className="mt-2">
              <input
                type="file"
                ref={imageInputRef}
                className='hidden'
                name="profilePic"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageFileChange}
              />
            </div>

          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">
              {isEditing.fullName ? (
                <input type="text" name="fullName" value={profile.fullName} onChange={handleInputChange} className="border p-1 w-40" />
              ) : (
                profile.fullName
              )}
              <button onClick={() => handleEditClick('fullName')} className="ml-2 hover:bg-gray-300 text-base p-1 rounded-full">
                <HiPencil />
              </button>
            </h2>
            <p className="text-gray-600">
              {isEditing.headline ? (
                <input type="text" name="headline" value={profile.headline} onChange={handleInputChange} className="border p-1" />
              ) : (
                profile.headline
              )}
              <button onClick={() => handleEditClick('headline')} className="ml-2 text-black hover:bg-gray-300 text-sm p-1 rounded-full">
                <HiPencil />
              </button>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">About</h3>

          <div>
            <label className="text-gray-700 mr-2">Skills</label>
            <button onClick={() => handleEditClick('skills')} className="hover:bg-gray-300 text-sm p-1 rounded-full">
              <HiPencil />
            </button>
            {isEditing.skills ? (
              <input type="text" name="skills" value={profile.skills} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.skills}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-gray-700 mr-2">Description</label>
            <button onClick={() => handleEditClick('description')} className="hover:bg-gray-300 text-sm p-1 rounded-full">
              <HiPencil />
            </button>
            {isEditing.description ? (
              <textarea name="description" value={profile.description} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.description}</p>
            )}
          </div>

        </div>

        <div className="mb-6">
          <h3 className="inline text-xl font-bold mb-2 mr-2">Location</h3>
          <button onClick={() => handleEditClick('location')} className="hover:bg-gray-300 text-sm p-1 rounded-full">
            <HiPencil />
          </button>
          <div>
            <label className="text-gray-700 mr-2">City</label>
            {isEditing.location ? (
              <input type="text" name="city" value={profile.city} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.city}</p>
            )}

          </div>
          <div className="mt-4">
            <label className="block text-gray-700">State</label>

            {isEditing.location ? (
              <input type="text" name="state" value={profile.state} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.state}</p>
            )}

          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Country</label>
            {isEditing.location ? (
              <input type="text" name="country" value={profile.country} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.country}</p>
            )}

          </div>
        </div>

        <div className="mb-6">
          <h3 className="inline mr-2 text-xl font-bold mb-2">Contact</h3>
          <button onClick={() => handleEditClick('contact')} className="hover:bg-gray-300 text-sm p-1 rounded-full">
            <HiPencil />
          </button>
          <div>
            <label className="block text-gray-700">Email Id:</label>
            {isEditing.contact ? (
              <input type="email" name="email" value={profile.email} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Mobile No:</label>
            {isEditing.contact ? (
              <input type="text" name="mobile" value={profile.mobile} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.mobile}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">LinkedIn URL:</label>
            {isEditing.contact ? (
              <input type="url" name="linkedIn" value={profile.linkedIn} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.linkedIn}</p>
            )}
          </div>
        </div>

        {/* RESUME UPLOAD HERE */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Upload Resume</h3>
          <div>
            <input type="file" name="resume" accept=".pdf" onChange={handleResumeChange} className="border p-1 w-full" />
            {/* <p>{profile.resume ? profile.resume.name : 'No resume uploaded'}</p> */}
            {/* {console.log(profile?.resume)} */}
          </div>
        </div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}