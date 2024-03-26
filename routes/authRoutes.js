// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { Post } = require('../controllers/PostController'); // Corrected the import path

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/Post', Post); // Changed the route to '/'

module.exports = router;
