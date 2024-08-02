import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { registerAPI } from '../APIServices/userAPI.js';
import { toast } from 'react-toastify';

export default function Register() {
    // State variables for form fields
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerMutation = useMutation({
        mutationKey: ["login"],
        mutationFn: registerAPI,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Form data to be submitted
        const formData = {
            fullName,
            role,
            email,
            password
        };
        // console.log('Form Data Submitted:', formData);

        registerMutation
            .mutateAsync(formData)
            // .then((data) => dispatch(isAuthenticated(data)))
            // .then(() => navigate("/"))
            .then(() => toast.success("User registered successfully! 😊"))
            .catch((err) => console.log(err));
            // .catch((err) => toast.error(err?.response?.data?.error));
    };

    const { isPending } = registerMutation;

    return (
        <div className="container mx-auto my-4 max-w-sm">
            <h1 className="text-center my-4 text-2xl font-bold">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <select
                    className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm my-4"
                    aria-label="Default select example"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="" disabled>Select role</option>
                    <option value="employer">Employer</option>
                    <option value="job-seeker">Job Seeker</option>
                </select>
                <div className="mb-4">
                    <label htmlFor="exampleInputEmail1" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input
                        type="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div id="emailHelp" className="text-sm text-gray-500">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-4">
                    <label htmlFor="exampleInputPassword1" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={isPending}>
                    Register
                </button>
            </form>
        </div>
    );
}