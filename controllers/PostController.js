const Post = require("../models/Post");
const mongoose = require("mongoose");

const postController = {
  Post: async (req, res) => {
    const {
      userId,
      title,
      description,
      location,
      images,
      video,
      tags,
      likes,
      comments,
      privacy,
      travelCategory,
    } = req.body;

    try {
      const post = new Post({
        userId,
        title,
        description,
        location,
        images,
        video,
        tags,
        likes,
        comments,
        privacy,
        travelCategory,
      });

      await post.save();

      res.status(201).json({ message: "Post submitted successfully" });
    } catch (error) {
      console.error("Error submitting post:", error);
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = postController;
