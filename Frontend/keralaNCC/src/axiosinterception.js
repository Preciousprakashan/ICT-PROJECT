import axios from 'axios';

// Creating an axios instance with base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000', // Replace with your actual server URL if needed
});

// Request interceptor to add JWT token to the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Attach token if available
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
