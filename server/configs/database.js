console.log("DATABASE_URL:", process.env.DATABASE_URL);


// Import PostgreSQL Client
const { Client } = require('pg');

// Create PostgreSQL client using environment variable from .env
const client = new Client({
    connectionString: process.env.DATABASE_URL, // Example: postgres://user:pass@localhost:5432/enigma_db
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);


// Connect to PostgreSQL database
client.connect()
    .then(() => console.log('Connected to PostgreSQL Database'))
    .catch(err => console.error('PostgreSQL connection error', err.stack));

// Export client to use in other files (like controllers)
module.exports = client;
