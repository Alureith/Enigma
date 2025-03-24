// Load .env FIRST!
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Imports
const express = require('express');
const cors = require('cors');

// Init app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Log server start
console.log('Starting server...');

// Import DB client
const client = require('./configs/database');

// Routes
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Enigma!');
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
