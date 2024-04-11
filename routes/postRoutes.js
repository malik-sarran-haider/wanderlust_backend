const express = require('express');
const postController = require('../controllers/PostController');

const router = express.Router();

// Route to handle post creation
router.post('/', postController.createPost); // Update to use createPost

module.exports = router;
