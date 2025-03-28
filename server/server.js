// Load environment variables from the .env file early
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  // Import required modules
  const express = require('express');
  const cors = require('cors');
  
  // Initialize Express app
  const app = express();
  
  // Middleware for parsing JSON bodies and enabling CORS
  app.use(express.json());
  app.use(cors());
  
  // Log that the server is starting
  console.log('Starting server...');
  
  // Import the database client to ensure connection is established
  const client = require('./configs/database');
  
  // Import authentication routes (registration and login)
  const userRoutes = require('./routes/user');
  
  // Mount the user routes under the "/user" path
  app.use('/user', userRoutes);
  
  // Define a simple root route for testing
  app.get('/', (req, res) => {
    res.send('Welcome to Enigma!');
  });
  
  // Get the port from environment or default to 4000
  const port = process.env.PORT || 4000;
  
  // Start the server and log the listening port
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  