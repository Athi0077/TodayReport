const mongoose = require("mongoose");

const suggestedNewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    newsDate: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuggestedNews", suggestedNewsSchema);
