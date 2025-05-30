const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Allow all origins (development use)
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', productRoutes);

module.exports = app;
