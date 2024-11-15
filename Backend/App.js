// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
require('dotenv').config();
require('./db/connection'); // Connect to MongoDB

const userRoutes = require('./basicroutes/userRoutes');
const fileRoutes = require('./basicroutes/pdfRoutes');
const carouselRoutes = require('./basicroutes/carouselRoutes');

// Middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure "files" directory exists
const filesDir = 'files';
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

// Static folder for serving uploaded files
app.use("/files", express.static(filesDir));

// Routes
app.use('/user', userRoutes);           // User-related requests
app.use('/api/files', fileRoutes);
app.use('/carousel', carouselRoutes);      

// Error handling for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
