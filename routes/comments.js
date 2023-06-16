const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post.js");
const Comments = require("../schemas/comments.js");

// 전체 댓글 조회 API
router.get("/posts/:_id/comments", async (req, res) => {
  try {
    const comments = await Comments.find()
      .select("-password -__v")
      .sort({ createdAt: -1 });
    res.json({ data: comments });
  } catch (error) {
    res.status(404).json({ error: "댓글 조회에 실패했습니다." });
  }
});

// 댓글 추가 API
router.post("/posts/:_id/comments", async (req, res) => {
  const { _id } = req.params;
  const { user, password, content } = req.body;

  const existingComments = await Comments.findById(_id);
  if (!content) {
    return res.status(400).json({
      success: false,
      errorMessage: "댓글 내용을 입력해주세요.",
    });
  }

  const createdComments = await Comments.create({
    commentId: _id,
    user,
    password,
    content,
    createdAt: new Date(),
  });

  res.json({ comments: "댓글 작성이 완료되었습니다." });
});

module.exports = router;
