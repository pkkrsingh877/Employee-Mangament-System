import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserContext from './UserContext';

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Signup function
    const signup = async (username, password) => {
        try {
            const response = await axios.post('https://2f07ef1f-af05-4f1e-a06d-8e9869c51966-00-1kpwza9d05l5m.sisko.replit.dev/api/signup', { username, password });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    // Function to set the user after login
    const login = async (username, password) => {
        try {
            const response = await axios.post('https://2f07ef1f-af05-4f1e-a06d-8e9869c51966-00-1kpwza9d05l5m.sisko.replit.dev/api/login', { username, password });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // Function to logout the user
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    // Function to check if the user is already logged in when app loads
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // You can add a token validation check with an API call here
            axios.get('https://2f07ef1f-af05-4f1e-a06d-8e9869c51966-00-1kpwza9d05l5m.sisko.replit.dev/api/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setUser(response.data.user);
                })
                .catch((err) => {
                    console.log(err)
                    // Token might be expired or invalid
                    logout();
                });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;