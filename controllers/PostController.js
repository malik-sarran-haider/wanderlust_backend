const Post = require("../models/Post");
const mongoose = require("mongoose");

const postController = {
  createPost: async (req, res) => {
    const {
      userId,
      title,
      description,
      images,
    
    } = req.body;

    try {
      const post = new Post({
        userId,
        title,
        description,
        images,
        
      });

      await post.save();

      res.status(201).json({ success: true, message: "Post submitted successfully" });
    } catch (error) {
      console.error("Error submitting post:", error);
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = postController;
