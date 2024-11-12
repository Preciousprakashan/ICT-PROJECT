const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose); // Pass mongoose here

// Create a new schema for storing images
const imageSchema = new mongoose.Schema({
    imageName: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer, // Store image as binary or use String for URL/Path
        required: true,
    },
}, { versionKey: false });

// Add auto-incrementing field for image name
imageSchema.plugin(mongooseSequence, {
    inc_field: 'imageNumber', // field for auto increment
    start_seq: 1, // starting value
    collection_name: 'imageCounters' // name of collection for storing counters
});

// Creating a model based on the imageSchema
const carouselData = mongoose.model('carousel', imageSchema);

// Exporting the model
module.exports = carouselData;
