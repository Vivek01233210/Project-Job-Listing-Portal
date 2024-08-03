import React, { useState, useRef } from 'react';
import axios from 'axios';
import { CiUser } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";

export default function EmployerDash() {

  const imageInputRef = useRef(null);

  const [profile, setProfile] = useState({
    profilePic: '',
    companyName: 'Tech Solutions Inc.',
    designation: '',
    description: '',
    email: '',
    mobile: '',
    linkedin: ''
  });

  const [isEditing, setIsEditing] = useState({
    profilePic: false,
    companyName: false,
    designation: false,
    description: false,
    contact: false
  });

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
      console.error('Invalid file type. Only .jpg, .jpeg, and .png files are allowed.');
    }
  };

  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleSave = (field) => {
    axios.post(`/api/employer/profile/${field}`, { [field]: profile[field] })
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
            </div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">
              {isEditing.companyName ? (
                <input type="text" name="companyName" value={profile.companyName} onChange={handleInputChange} className="border p-1" />
              ) : (
                profile.companyName
              )}
              <button onClick={() => handleEditClick('companyName')} className="ml-2 bg-gray-300 p-1 rounded-full">
                <HiPencil />
              </button>
            </h2>
            <p className="text-gray-600">
              {isEditing.designation ? (
                <input type="text" name="designation" value={profile.designation} onChange={handleInputChange} className="border p-1" />
              ) : (
                profile.designation
              )}
              <button onClick={() => handleEditClick('designation')} className="ml-2 bg-gray-300 p-1 rounded-full">
                <HiPencil />
              </button>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">About</h3>
          <div>
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
      </div>
    </div>
  );
}