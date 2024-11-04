const express = require('express');
const basicModel = require('../model/basicData'); // Using CommonJS require
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware for parsing JSON and URL-encoded data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Adding VerifyToken Middleware
function VerifyToken(req, res, next) {
    let token = req.headers.token; // Fixed the typo here
    try {
        if (!token) throw 'Unauthorized Access';
        let payload = jwt.verify(token, 'secret');
        if (!payload) throw 'Unauthorized Access';
        next();
    } catch (error) {
        res.status(403).json({ message: error }); // Changed to 403 for forbidden access
    }
}

// Default root route
router.get('/', VerifyToken, async (req, res) => {
    try {
        const data = await basicModel.find(); // Fetch all courses from the database
        res.status(200).json(data); // Send the data as a JSON response
    } catch (error) {
        res.status(500).send('Error retrieving data'); // Send an error response if fetching fails
    }
});

// Get course by ID
router.get('/:id', VerifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await basicModel.findById(id);
        if (!data) throw 'Data not found';
        res.status(200).json(data); // Send JSON response
    } catch (error) {
        res.status(404).send('Data not found'); // Error handling for data not found
    }
});

// POST operation: Add new course
router.post('/addCourse', VerifyToken, async (req, res) => {
    try {
        const item = req.body;
        const newCourse = new basicModel(item);
        await newCourse.save();
        res.status(201).send('Post Successful'); // Changed to 201 for created
    } catch (error) {
        res.status(400).send(error); // 400 for bad request
    }
});

// PUT operation: Update course by ID
router.put('/edit/:id', VerifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await basicModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) throw 'Course not found';
        res.status(200).send('Update Successful');
    } catch (error) {
        res.status(404).send(error); // 404 for not found
    }
});

// DELETE operation: Delete course by ID
router.delete('/delete/:id', VerifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await basicModel.findByIdAndDelete(id);
        if (!deleted) throw 'Course not found';
        res.status(200).send('Delete Successful');
    } catch (error) {
        res.status(404).send(error); // 404 for not found
    }
});

module.exports = router;
