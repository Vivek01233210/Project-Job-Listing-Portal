import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CiUser } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { getUserProfileAPI } from '../../APIServices/userAPI.js';

export default function JobSeekerDash() {

  const imageInputRef = useRef(null);

  const { data: user } = useQuery({
    queryKey: ["user-auth"],
    queryFn: getUserProfileAPI,
  });
  console.log(user);

  useEffect(() => {
    if (user) {
      setProfile(prevProfile => ({
        ...prevProfile,
        fullName: user?.user?.fullName || '',
        email: user?.user?.email || ''
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
    linkedin: '',
    resume: ''
  });

  // console.log(profile)

  const [isEditing, setIsEditing] = useState({
    profilePic: false,
    fullName: false,
    headline: false,
    skills: false,
    description: false,
    location: false,
    contact: false,
    resume: false
  });


  //   useEffect(() => {
  //     // Fetch profile data from API
  //     axios.get('/api/jobseeker/profile')
  //       .then(response => {
  //         setProfile(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching profile data:', error);
  //       });
  //   }, []);

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

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setProfile({ ...profile, resume: file });
    } else {
      toast.error('Invalid file type. Only .pdf and .docx files are allowed.');
    }
  };

  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleSave = (field) => {
    // Save the updated field to the server
    axios.post(`/api/jobseeker/profile/${field}`, { [field]: profile[field] })
      .then(response => {
        setIsEditing({ ...isEditing, [field]: false });
      })
      .catch(error => {
        console.error('Error saving profile data:', error);
      });
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
            <button onClick={() => imageInputRef.current.click()} className="absolute bottom-0 right-0 bg-gray-300 p-1 rounded-full">
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
              {/* <button onClick={() => handleSave('profilePic')} className="bg-blue-500 text-white px-2 py-1 rounded">Save</button> */}
            </div>

          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">
              {isEditing.fullName ? (
                <input type="text" name="fullName" value={profile.fullName} onChange={handleInputChange} className="border p-1" />
              ) : (
                profile.fullName
              )}
              <button onClick={() => handleEditClick('fullName')} className="ml-2 bg-gray-300 p-1 rounded-full">
                <HiPencil />
              </button>
            </h2>
            <p className="text-gray-600">
              {isEditing.headline ? (
                <input type="text" name="headline" value={profile.headline} onChange={handleInputChange} className="border p-1" />
              ) : (
                profile.headline
              )}
              <button onClick={() => handleEditClick('headline')} className="ml-2 bg-gray-300 p-1 rounded-full">
                <HiPencil />
              </button>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">About</h3>
          <div>
            <label className="block text-gray-700">Skills</label>
            {isEditing.skills ? (
              <input type="text" name="skills" value={profile.skills} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.skills}</p>
            )}
            <button onClick={() => handleEditClick('skills')} className="bg-gray-300 p-1 rounded-full">
              <HiPencil />
            </button>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Description</label>
            {isEditing.description ? (
              <textarea name="description" value={profile.description} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.description}</p>
            )}
            <button onClick={() => handleEditClick('description')} className="bg-gray-300 p-1 rounded-full">
              <HiPencil />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Location</h3>
          <div>
            <label className="block text-gray-700">City</label>
            {isEditing.location ? (
              <input type="text" name="city" value={profile.city} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.city}</p>
            )}
            <button onClick={() => handleEditClick('location')} className="bg-gray-300 p-1 rounded-full">
              <HiPencil />
            </button>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">State</label>
            {isEditing.location ? (
              <input type="text" name="state" value={profile.state} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.state}</p>
            )}
            <button onClick={() => handleEditClick('location')} className="bg-gray-300 p-1 rounded-full">
              <HiPencil />
            </button>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Country</label>
            {isEditing.location ? (
              <input type="text" name="country" value={profile.country} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.country}</p>
            )}
            <button onClick={() => handleEditClick('location')} className="bg-gray-300 p-1 rounded-full">
              <HiPencil />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Contact</h3>
          <div>
            <label className="block text-gray-700">Email Id:</label>
            {isEditing.contact ? (
              <input type="email" name="email" value={profile.email} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.email}</p>
            )}
            <button onClick={() => handleEditClick('contact')} className="bg-gray-300 p-1 rounded-full">
              <HiPencil />
            </button>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Mobile No:</label>
            {isEditing.contact ? (
              <input type="text" name="mobile" value={profile.mobile} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.mobile}</p>
            )}
            <button onClick={() => handleEditClick('contact')} className="bg-gray-300 p-1 rounded-full">
              <HiPencil />
            </button>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">LinkedIn URL:</label>
            {isEditing.contact ? (
              <input type="url" name="linkedin" value={profile.linkedin} onChange={handleInputChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.linkedin}</p>
            )}
            <button onClick={() => handleEditClick('contact')} className="bg-gray-300 p-1 rounded-full">
              <HiPencil />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Upload Resume</h3>
          <div>
            {isEditing.resume ? (
              <input type="file" name="resume" accept=".pdf,.docx" onChange={handleResumeChange} className="border p-1 w-full" />
            ) : (
              <p>{profile.resume ? profile.resume.name : 'No resume uploaded'}</p>
            )}
            <button onClick={() => handleEditClick('resume')} className="bg-gray-300 p-1 rounded-full">
              <HiPencil />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}