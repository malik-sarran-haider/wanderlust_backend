const express = require('express');
const postController = require('../controllers/PostController'); // Corrected import

const router = express.Router();

// Route to handle post creation
router.post('/:userId', postController.Post);

module.exports = router;
