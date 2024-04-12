const express = require('express');
const postController = require('../controllers/PostController');

const router = express.Router();

// Route to handle post creation
router.post('/:userId', postController.Post);

// Route to get posts for a specific user
router.get('/:userId', postController.getPosts);

module.exports = router;
