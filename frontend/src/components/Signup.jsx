import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Signup = () => {
    const { user, login, signup } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(username, password);
            navigate('/'); // Redirect to login or desired page
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Signup</h2>
            <form onSubmit={handleSignupSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
