const express = require("express");
const router = express.Router();

const Posts = require("../schemas/post.js");

// 전체 게시글 조회 API
router.get("/posts", async (req, res) => {
  try {
    const posts = await Posts.find()
      .select("-password -content -__v")
      .sort({ createdAt: -1 });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ error: "게시물 조회에 실패했습니다." });
  }
});

// 게시글 추가 API
router.post("/posts", async (req, res) => {
  const { user, password, title, content } = req.body;

  const existingPosts = await Posts.find({ user });
  if (existingPosts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "중복되는 게시물이 존재합니다.",
    });
  }

  const createdPosts = await Posts.create({
    user,
    password,
    title,
    content,
    createdAt: new Date(),
  });

  res.json({ posts: "게시물을 생성하였습니다." });
});

// 게시글 상세 조회 API
router.get("/posts/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const posts = await Posts.findById(_id)
      .select("-password -content -__v")
      .sort({ createdAt: -1 });
    if (!posts) {
      return res
        .status(404)
        .json({ error: "해당하는 게시물을 찾을 수 없습니다." });
    }
    res.json({ data: posts });
  } catch (error) {
    // 오류가 발생한 경우 오류 메시지를 응답합니다.
    res.status(500).json({ error: "게시글 조회에 실패했습니다." });
  }
});

// 게시글 수정 API
router.put("/posts/:_id", async (req, res) => {
  const { _id } = req.params;
  const { password, title, content } = req.body;

  try {
    const posts = await Posts.findOne({ _id, password });
    if (!posts) {
      return res
        .status(404)
        .json({ error: "해당하는 게시물을 찾을 수 없습니다." });
    }
    await Posts.updateOne({ _id, password }, { $set: { title, content } });
    res.json({ data: "게시물 수정에 성공했습니다." });
  } catch (err) {
    res.status(500).json({ error: "게시물 수정에 실패했습니다." });
  }
});

// 게시글 삭제 API
router.delete("/posts/:_id", async (req, res) => {
  const { _id } = req.params;
  const { password } = req.body;

  try {
    const posts = await Posts.findById(_id);
    if (!posts) {
      return res
        .status(404)
        .json({ error: "해당하는 게시물을 찾을 수 없습니다." });
    }
    if (posts.password !== password) {
      return res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
    }
    const delPost = await Posts.findByIdAndDelete(_id);
    res.json({ data: "게시물 삭제 완료했습니다." });
  } catch (err) {
    res.status(500).json({ error: "게시물 삭제에 실패했습니다." });
  }
});

module.exports = router;
