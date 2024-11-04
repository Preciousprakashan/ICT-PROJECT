const mongoose = require('mongoose');

// Creating schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone: String,
}, { versionKey: false });

// Mapping collection
const userData = mongoose.model('user', userSchema);

// Exporting schema
module.exports = userData;
