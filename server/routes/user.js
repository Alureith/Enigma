const express = require('express');
const router = express.Router();

// Import controller functions from controllers
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');

// Define POST routes for registration and login
router.post('/register', register);
router.post('/login', login);

module.exports = router;
