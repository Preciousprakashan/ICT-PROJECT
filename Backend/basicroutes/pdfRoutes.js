const express = require('express');
const multer = require('multer');
const pdfModel = require('../model/pdfDetails');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Ensure the file upload directory exists
const uploadDirectory = './files';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up multer storage configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory); // Define where to save the uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Create a unique filename using the timestamp
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // Max file size 10MB
    }
});

// Function to delete file if exists
const deleteFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Synchronously delete the file
    }
}

// Route to upload PDF and save URL
router.post('/upload-file', upload.single('file'), async (req, res) => {
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

// Route to update a specific article by ID
router.put('/update/:id', upload.single('file'), async (req, res) => {
    const { title, url_link } = req.body;
    const { id } = req.params;
    const pdf_link = req.file ? req.file.filename : null; // If a new file is uploaded

    try {
        // Find the article by ID
        const article = await pdfModel.findById(id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        // Update fields
        article.title = title || article.title;
        article.url_link = url_link || article.url_link;
        if (pdf_link) {
            // Delete the old file if it's being replaced
            if (article.pdf_link) {
                const filePath = path.join(uploadDirectory, article.pdf_link);
                deleteFile(filePath);
            }
            article.pdf_link = pdf_link; // Update with the new file link
        }

        await article.save();
        res.status(200).json({ message: "Article updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating article", error });
    }
});

// Route to delete a specific article by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the article by ID
        const article = await pdfModel.findById(id);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        // If the article has a file associated with it, delete the file from the filesystem
        if (article.pdf_link) {
            const filePath = path.join(uploadDirectory, article.pdf_link);
            deleteFile(filePath); // Delete the file from the server
        }

        // Delete the article from the database
        await pdfModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Article deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting article", error });
    }
});

module.exports = router;
