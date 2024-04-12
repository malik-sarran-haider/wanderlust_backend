const Post = require("../models/Post");
const mongoose = require("mongoose");

const postController = {
  Post: async (req, res) => {
    const {  description, images = [] } = req.body; // Default images to empty array

    try {
      const post = new Post({
        userId,
        description,
        images,
      });

      await post.save();

      res.status(201).json({ suceess: "true" });
    } catch (error) {
      console.error("Error submitting post:", error);
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = postController;
