const express = require('express');
const multer = require('multer');
const pdfModel = require('../model/pdfDetails'); // Pdf data model
const jwt = require('jsonwebtoken');
const path = require('path');

const router = express.Router();

// Set up multer storage configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files'); // Define where to save the uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Create a unique filename using the timestamp
    },
});

const upload = multer({ storage: storage });

// JWT Verification Middleware
function VerifyToken(req, res, next) {
    const token = req.headers.token;
    try {
        if (!token) return res.status(403).json({ message: 'Unauthorized Access: No token provided' });

        const payload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        if (!payload) return res.status(403).json({ message: 'Unauthorized Access: Invalid token' });

        next();
    } catch (error) {
        res.status(403).json({ message: 'Unauthorized Access', error });
    }
}

// Route to upload PDF and save URL
router.post('/upload-file', VerifyToken, upload.single('file'), async (req, res) => {
    const { title, url_link } = req.body;
    const pdf_link = req.file ? req.file.filename : null; // Save the filename if file is uploaded

    if (!title || (!url_link && !pdf_link)) {
        return res.status(400).json({ message: "Title and either URL or file are required" });
    }

    try {
        const newArticle = new pdfModel({
            title,
            pdf_link,
            url_link,
            date: new Date(),
        });

        await newArticle.save();
        res.status(201).json({ message: 'Article added successfully!' });
    } catch (error) {
        res.status(500).json({ message: "Error uploading article", error });
    }
});

// Route to fetch all uploaded PDFs or URLs
router.get('/get-files', async (req, res) => {
    try {
        const articles = await pdfModel.find({});
        res.status(200).json({ status: 'ok', data: articles });
    } catch (error) {
        res.status(500).json({ message: "Error fetching files", error });
    }
});

// Route to delete a specific article by ID
router.delete('/delete/:id', VerifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        // Find the article by ID
        const article = await pdfModel.findById(id);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        // If the article has a file associated with it, delete the file from the filesystem
        if (article.pdf_link) {
            const fs = require('fs');
            const filePath = path.join(__dirname, '../files', article.pdf_link);

            // Delete the file from the server
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return res.status(500).json({ message: "Error deleting file", error: err });
                }
                console.log('File deleted successfully');
            });
        }

        // Delete the article from the database
        await pdfModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Article deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting article", error });
    }
});

module.exports = router;
