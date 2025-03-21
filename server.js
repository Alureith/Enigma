// Log when the server starts
console.log('Starting server...');

// Import the Express framework for building the web server
const express = require('express');

// Import the pg library's Client object to connect to PostgreSQL
const { Client } = require('pg');

// Load environment variables from the .env file into process.env
require('dotenv').config();

// Initialize an Express application
const app = express();

// Define the port your server will listen on (hardcoded to 4000 for now)
const port = 4000;

// PostgreSQL client configuration using the DATABASE_URL from your .env file
const client = new Client({
    connectionString: process.env.DATABASE_URL, // ex: postgres://user:pass@localhost:5432/enigma_db
});

// Connect to the PostgreSQL database
client.connect()
    .then(() => console.log('Connected to PostgreSQL')) // Success message
    .catch(err => console.error('Connection error', err.stack)); // Log error stack on failure

// Route handler for GET requests to the root URL "/"
app.get('/', (req, res) => {
    res.send('Welcome to Enigma!'); // Respond with a simple message
});

// Start the Express server and listen on the defined port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); // Confirmation message on successful start
});
