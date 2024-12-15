require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./back-end/routes/userRoutes');
const blogRoutes = require('./back-end/routes/blogRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {  serverSelectionTimeoutMS: 30000, 
    socketTimeoutMS: 45000
    })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

module.exports = app;
