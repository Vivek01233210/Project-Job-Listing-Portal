import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { loginAPI } from '../APIServices/userAPI.js';
import { toast } from 'react-toastify';

export default function Login() {
    // State variables for form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginMutation = useMutation({
        mutationKey: ["login"],
        mutationFn: loginAPI,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email,
            password
        };
        console.log('Form Data Submitted:', formData);
        loginMutation
            .mutateAsync(formData)
            .then(() => toast.success("User logged in successfully! 😊"))
            // .then((data) => dispatch(isAuthenticated(data)))
            // .then(() => navigate("/"))
            .catch((err) => toast.error(err.response.data.error));
    };

    const { isPending, error, isError } = loginMutation;
   
    return (
        <div className="container-sm my-4">
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary" disabled={isPending}>Login</button>
            </form>
        </div>
    );
}