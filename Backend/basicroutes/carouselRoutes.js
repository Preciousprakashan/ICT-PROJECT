const express = require('express');
const multer = require('multer');
const carouselData = require('../model/carouselData'); // Carousel image model

const carouselRouter = express.Router();

// Middleware to handle JSON data
carouselRouter.use(express.json());
carouselRouter.use(express.urlencoded({ extended: true }));

// Set up storage for Multer (store image in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /upload route for uploading carousel images
carouselRouter.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // Check if an image is uploaded
        if (!req.file) {
            return res.status(400).send('No image uploaded');
        }

        // Retrieve caption from request
        const { caption } = req.body; // Get the caption from the form data
        if (!caption) {
            return res.status(400).send('Caption is required');
        }

        // Create a new image entry in the database
        const newImage = new carouselData({
            imageName: caption, // Use caption from frontend as the imageName
            image: req.file.buffer, // Store the image as binary data
        });

        // Save the image to MongoDB
        await newImage.save();

        res.status(200).send('Image uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading image');
    }
});


// GET /images route to retrieve all uploaded images
carouselRouter.get('/images', async (req, res) => {
    try {
        // Fetch images from database
        const images = await carouselData.find();

        // Convert buffer data to Base64 for each image
        const imagesWithBase64 = images.map(image => {
            return {
                _id: image._id,
                imageUrl: `data:image/jpeg;base64,${image.image.toString('base64')}`, // Convert buffer to Base64
                caption: image.imageName, // Assuming 'imageName' is the caption
            };
        });

        res.json({ status: 'ok', data: imagesWithBase64 });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// GET /image/:id route to retrieve a specific image by its ID
carouselRouter.get('/image/:id', async (req, res) => {
    try {
        const image = await carouselData.findById(req.params.id);
        if (!image) {
            return res.status(404).send('Image not found');
        }
        res.status(200).json(image);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching image');
    }
});

// DELETE /image/:id route to delete a specific image by its ID
carouselRouter.delete('/image/:id', async (req, res) => {
    try {
        const image = await carouselData.findByIdAndDelete(req.params.id);
        if (!image) {
            return res.status(404).send('Image not found');
        }
        res.status(200).send('Image deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting image');
    }
});

module.exports = carouselRouter;
