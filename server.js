console.log('Starting server...')

const express = require('express');
const { Client } = require('pg');
require('dotenv').config(); //Load environment variable from .env

const app = express();
const port = 4000;

// PostgreSQL client configuration
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));



//Testing
app.get('/', (req, res) => {
    res.send('Welcome to Enigma!');
});


//Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
