const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment");


// ADD COMMENT
router.post("/", async (req, res) => {
  try {
    const { newsId, userId, username, text } = req.body;

    const comment = await Comment.create({
      newsId,
      userId,
      username,
      text,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET COMMENTS BY NEWS ID
router.get("/:newsId", async (req, res) => {
  try {
    const comments = await Comment.find({
      newsId: req.params.newsId,
    }).sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;