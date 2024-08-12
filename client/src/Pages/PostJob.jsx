import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { createJobAPI } from '../APIServices/jobAPI.js';
import { toast } from 'react-toastify';

export default function PostJob() {
    const [jobData, setFormData] = useState({
        jobTitle: '',
        description: '',
        qualifications: '',
        responsibility: '',
        location: '',
        salaryRange: ''
    });

    const createJobMutation = useMutation({
        mutationKey: ['post-job'],
        mutationFn: createJobAPI,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...jobData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createJobMutation
            .mutateAsync(jobData)
            .then(() => {toast.success('Job posted successfully')})
            .catch((error) => {console.log(error)});
        // Handle form submission logic here
        console.log('Form data submitted:', jobData);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md my-24">
            <h2 className="text-2xl font-bold mb-6 text-center">Post a Job</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input
                        type="text"
                        name="jobTitle"
                        value={jobData.jobTitle}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={jobData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Qualifications</label>
                    <textarea
                        name="qualifications"
                        value={jobData.qualifications}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Responsibility</label>
                    <textarea
                        name="responsibility"
                        value={jobData.responsibility}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={jobData.location}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Salary Range(optional)</label>
                    <input
                        type="text"
                        name="salaryRange"
                        value={jobData.salaryRange}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Post Job
                    </button>
                </div>
            </form>
        </div>
    );
}