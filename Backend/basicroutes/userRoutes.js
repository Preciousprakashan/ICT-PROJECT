// userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userData'); // User data model

const userrouter = express.Router();

// Middleware to handle JSON data
userrouter.use(express.json());
userrouter.use(express.urlencoded({ extended: true }));

// POST /login route for user login (Token Generation)
userrouter.post('/login', async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password === req.body.password) {
            // Generate token if credentials match
            const payload = { uname: req.body.username };
            const token = jwt.sign(payload, process.env.JWT_SECRET || 'default_secret');
            return res.status(200).json({ message: "Login Successful", usertoken: token });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// POST /register route for new user registration
userrouter.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new userModel({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /users route to retrieve all users (Optional)
userrouter.get('/', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
});

module.exports = userrouter;
