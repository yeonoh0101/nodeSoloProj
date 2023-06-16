const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
  },

  password: {
    type: Number,
    required: true,
    unique: true,
  },

  user: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Comments", commentsSchema);
