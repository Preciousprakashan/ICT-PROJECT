// Login.jsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinterception';
import './Login.css';
import avatar from '../../../../../images/avatar.svg';

const Login = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const updateUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const sentData = async () => {
        try {
            const response = await axiosInstance.post("/user", user);
            if (response.data.usertoken) {
                localStorage.setItem("token", response.data.usertoken);
                alert(`Welcome ${user.username}`);
                navigate('/Home');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const { fieldErrors } = error.response.data;
                setErrors({
                    username: fieldErrors?.username || '',
                    password: fieldErrors?.password || '',
                });
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <Box className="login-container">
            <img src={avatar} alt="Avatar" className="avatar-img" />
            <h2 className="login-title">Welcome Back</h2>
            <div className="input-wrapper">
                <TextField
                    label="Username"
                    name="username"
                    value={user.username}
                    onChange={updateUser}
                    fullWidth
                    variant="outlined"
                    error={!!errors.username}
                    helperText={errors.username}
                    aria-label="Username"
                />
            </div>
            <div className="input-wrapper">
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={updateUser}
                    fullWidth
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password}
                    aria-label="Password"
                />
            </div>
            <Button
                variant="contained"
                onClick={sentData}
                className="login-btn"
                aria-label="Log In Button"
            >
                Log In
            </Button>
            <Link to="#" className="forgot-password">Forgot Password?</Link>
        </Box>
    );
};

export default Login;
