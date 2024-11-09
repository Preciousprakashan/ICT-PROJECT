// basicRoutes.js
const express = require('express');
const basicrouter = express.Router();
const basicData = require('../model/basicData'); // Assuming this is the correct path to the basicData model

// GET /data route to retrieve all data
basicrouter.get('/data', async (req, res) => {
    try {
        const data = await basicData.find(); // Retrieves all data from the basicData model
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error });
    }
});

module.exports = basicrouter;
