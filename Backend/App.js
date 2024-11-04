const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
require('./db/connection');

const userRoutes = require('./basicroutes/userRoutes');
const basicRoutes = require('./basicroutes/basicRoutes');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for user-related requests
app.use('/user', userRoutes);

// Route for course-related requests
app.use('/', basicRoutes);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
