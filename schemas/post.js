const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: Number,
    required: true,
    unique: true,
  },

  title: {
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

module.exports = mongoose.model("Posts", postsSchema);
