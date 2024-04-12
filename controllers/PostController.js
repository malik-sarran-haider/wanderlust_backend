const Post = require("../models/Post");
const mongoose = require("mongoose");

const postController = {
  Post: async (req, res) => {
    const {  description, images } = req.body; // Updated to only include userId, description, and images

    try {
      const post = new Post({
        description,
        images,
      });

      await post.save();

      res.status(201).json({success: 'true'});
    } catch (error) {
      console.error("Error submitting post:", error);
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = postController;
