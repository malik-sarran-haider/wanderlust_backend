const Post = require("../models/Post");
const mongoose = require("mongoose");

const postController = {
  getPosts: async (req, res) => {
    try {
      const { userId } = req.params; // Assuming userId is sent in the request body

      const posts = await Post.find({ userId }).sort({ createdAt: -1 });

      res.status(200).json({ posts });
    } catch (error) {
      console.error("Error getting posts:", error);
      res.status(500).json({ error: "Server Error" });
    }
  },
  Post: async (req, res) => {
    const { userId } = req.params; // Assuming userId is sent in the request body

    const { description, images } = req.body;

    try {
      const post = new Post({
        userId, // Make sure userId is being included
        description,
        images,
      });

      await post.save();

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error submitting post:", error);
      res.status(500).json({ error: "Server Error" });
    }
  },
  
};

module.exports = postController;
