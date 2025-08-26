const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// http://localhost:3001/api/auth/register
router.post('/register', authController.registerUser);

// http://localhost:3001/api/auth/login
router.post('/login', authController.loginUser);

module.exports = router;