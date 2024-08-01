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
            .catch((err) => toast.error(err.response.data.error));
    };

    const { isPending, error, isError } = registerMutation;

    return (
        <div className="container-sm my-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <select
                    className="form-select my-4"
                    aria-label="Default select example"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="" disabled>Select role</option>
                    <option value="employer">Employer</option>
                    <option value="job-seeker">Job Seeker</option>
                </select>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isPending}>Register</button>
            </form>
        </div>
    );
}