const express = require("express");
const router = express.Router();

const News = require("../models/News");


// LIKE / UNLIKE
router.put("/like/:id", async (req, res) => {
  try {
    const { userId } = req.body;

    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    const alreadyLiked = news.likes.includes(userId);

    if (alreadyLiked) {
      news.likes = news.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      news.likes.push(userId);
    }

    await news.save();

    res.json(news);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// SHARE COUNT
router.put("/share/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    news.shares += 1;

    await news.save();

    res.json({
      shares: news.shares,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ADD COMMENT
router.put("/comment/:id", async (req, res) => {
  try {
    const { userId, userName, text } = req.body;

    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    news.comments.push({
      userId,
      userName,
      text,
    });

    await news.save();

    res.json(news);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;