// user.js
const express = require('express');
const router = express.Router();

// Double-check these EXACT import paths (relative to user.js)
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');

// TEMP DEBUG: Print out what we actually imported
console.log("Register import:", register);
console.log("Login import:", login);

// POST /user/register
router.post('/register', register);

// POST /user/login
router.post('/login', login);

module.exports = router;
