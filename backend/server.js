const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");
const suggestRoutes = require("./routes/suggestRoutes");
const actionRoutes = require("./routes/newsActions");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(cors());
app.use(express.json());  

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/suggested", suggestRoutes);
app.use("/api/actions", actionRoutes);
app.use("/api/comments", commentRoutes);

mongoose 
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});