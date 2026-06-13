const router = require("express").Router();

const News = require("../models/news");

const adminMiddleware = require(
  "../middleware/adminMiddleware"
);



// ADD NEWS
router.post(
  "/add",
  adminMiddleware,
  async (req, res) => {
    try {

      const news = new News({
        ...req.body,
        createdBy: req.user.id,
        adminName: req.user.name,
      });

      await news.save();

      res.status(201).json("News Added");

    } catch (err) {
      res.status(500).json(err);
    }
  }
);



// GET ALL NEWS
router.get("/", async (req, res) => {
  try {
    const { adminId } = req.query;
    let query = {};

    if (adminId) {
      query.createdBy = adminId;
    }

    const news = await News.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json(news);

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SINGLE NEWS
router.get("/:id", async (req, res) => {

  try {

    const news =
      await News.findById(req.params.id);

    res.status(200).json(news);

  } catch (err) {
    res.status(500).json(err);
  }
});



// DELETE NEWS
router.delete(
  "/:id",
  adminMiddleware,
  async (req, res) => {
    try {

      await News.findByIdAndDelete(req.params.id);

      res.status(200).json("News Deleted");

    } catch (err) {
      res.status(500).json(err);
    }
  }
);



// UPDATE NEWS
router.put(
  "/:id",
  adminMiddleware,
  async (req, res) => {
    try {

      await News.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      res.status(200).json("News Updated");

    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;