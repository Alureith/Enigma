// Debug: Log the DATABASE_URL to verify it's loaded correctly
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Import the PostgreSQL Client from the pg module
const { Client } = require('pg');

// Create a new PostgreSQL client using the connection string from .env
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Example: postgres://enigma_user:enigma123@localhost:5432/enigma_db
});

// Connect to the PostgreSQL database and log the connection status
client.connect()
  .then(() => console.log('Connected to PostgreSQL Database'))
  .catch(err => console.error('PostgreSQL connection error', err.stack));

// Export the client for use in controllers
module.exports = client;
