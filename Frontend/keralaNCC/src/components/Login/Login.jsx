import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinterception'; // Importing axios instance
import styles from './Login.module.css'; // Style imports
import avatar from '../../../../../images/avatar.svg'; // Avatar Image


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
            // Use the updated route here
            const response = await axiosInstance.post("/user/login", user);

            if (response.data.usertoken) {
                localStorage.setItem("token", response.data.usertoken); // Save the token
                alert(`Welcome ${user.username}`);
                navigate('/Admin'); // Navigate to the Home page after login
            }
        } catch (error) {
            // Handle specific error responses from the backend
            if (error.response) {
                if (error.response.status === 404) {
                    setErrors({ username: 'User not found' });
                } else if (error.response.status === 401) {
                    setErrors({ password: 'Invalid credentials' });
                } else {
                    alert('An error occurred. Please try again.');
                }
            }
        }
    };

    return (
        <Box className={styles["login-container"]}>
            <img src={avatar} alt="Avatar" className={styles["avatar-img"]} />
            <h2 className={styles["login-title"]}>Welcome Back</h2>
            <div className={styles["input-wrapper"]}>
                <TextField
                    label="Username"
                    name="username"
                    value={user.username}
                    onChange={updateUser}
                    fullWidth
                    variant="outlined"
                    error={!!errors.username}
                    helperText={errors.username}
                />
            </div>
            <div className={styles["input-wrapper"]}>
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
                />
            </div>
            <Button
                variant="contained"
                onClick={sentData}
                className={styles["login-btn"]}
            >
                Log In
            </Button>
            <br />
            <Link to="/Home">
              <Button variant="contained">
                Home
              </Button>
            </Link>
        </Box>
    );
};

export default Login;
