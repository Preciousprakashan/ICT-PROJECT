// pdfDetails.js (Schema)
const mongoose = require("mongoose");

const PdfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url_link: {
    type: String, // To store the filename of the uploaded PDF
    required: false,
  },
  pdf_link: {
    type: String, // To store the URL link
    required: false,
  },
  date: {
    type: Date,
    default: Date.now, // Store the current date when added
  },
});

module.exports = mongoose.model("latest_new", PdfSchema);
