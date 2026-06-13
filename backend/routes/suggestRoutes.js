const router = require("express").Router();
const SuggestedNews = require("../models/SuggestedNews");
const authMiddleware = require("../middleware/authMiddleware"); // assuming there is one, or I can just use it without if not needed. Wait, I saw authMiddleware.js earlier.

// ADD SUGGESTED NEWS
router.post("/add", async (req, res) => {
  try {
    const suggestedNews = new SuggestedNews(req.body);
    await suggestedNews.save();
    res.status(201).json("Suggested News Added");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL SUGGESTED NEWS
router.get("/", async (req, res) => {
  try {
    const suggested = await SuggestedNews.find().sort({ createdAt: -1 });
    res.status(200).json(suggested);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE SUGGESTED NEWS
router.delete("/:id", async (req, res) => {
  try {
    await SuggestedNews.findByIdAndDelete(req.params.id);
    res.status(200).json("Suggested News Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
