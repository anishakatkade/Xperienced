import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Experience from "../models/Experience.js";

import {
  getSingleExperience,
  createExperience,
  getAllExperiences,
  addComment,
  toggleLike,
  toggleSave,
  addReply,
  addView,
} from "../controllers/experienceController.js";

const router = express.Router();

router.post("/", authMiddleware, createExperience);

router.get("/", async (req, res) => {
  try {
    const posts = await Experience.find()
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.log("GET POSTS ERROR:", err.message);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

router.post("/:id/like", authMiddleware, async (req, res) => {
  try {
    const post = await Experience.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id;
    if (!post.likes) post.likes = [];

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId.toString(),
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString(),
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    console.log("LIKE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id/save", authMiddleware, async (req, res) => {
  try {
    const post = await Experience.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id;
    if (!post.savedBy) post.savedBy = [];

    const alreadySaved = post.savedBy.some(
      (id) => id.toString() === userId.toString(),
    );

    if (alreadySaved) {
      post.savedBy = post.savedBy.filter(
        (id) => id.toString() !== userId.toString(),
      );
    } else {
      post.savedBy.push(userId);
    }

    await post.save();
    res.json({ savedBy: post.savedBy });
  } catch (err) {
    console.log("SAVE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/view", authMiddleware, addView);

router.post("/:id/comment", authMiddleware, async (req, res) => {
  try {
    const post = await Experience.findById(req.params.id);
    post.comments.push({ user: req.user._id, text: req.body.text });
    await post.save();

    const updated = await Experience.findById(req.params.id).populate(
      "comments.user",
      "name",
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

router.post(
  "/:postId/comment/:commentId/like",
  authMiddleware,
  async (req, res) => {
    try {
      const { postId, commentId } = req.params;
      const userId = req.user._id;

      const post = await Experience.findById(postId);
      const comment = post.comments.id(commentId);

      if (!comment.likes) comment.likes = [];

      const alreadyLiked = comment.likes.some(
        (id) => id.toString() === userId.toString(),
      );

      if (alreadyLiked) {
        comment.likes = comment.likes.filter(
          (id) => id.toString() !== userId.toString(),
        );
      } else {
        comment.likes.push(userId);
      }

      await post.save();
      res.json(comment);
    } catch (err) {
      res.status(500).json({ message: "Error" });
    }
  },
);

router.post(
  "/:postId/comment/:commentId/reply",
  authMiddleware,
  async (req, res) => {
    try {
      const { postId, commentId } = req.params;

      const post = await Experience.findById(postId);
      const comment = post.comments.id(commentId);

      comment.replies.push({
        text: req.body.text,
        user: req.user._id,
        replyTo: req.body.replyTo || comment.user,
      });

      await post.save();

      const updated = await Experience.findById(postId)
        .populate("comments.user", "name")
        .populate("comments.replies.user", "name")
        .populate("comments.replies.replyTo", "name");

      res.json(updated);
    } catch (err) {
      console.log("REPLY ERROR:", err);
      res.status(500).json({ message: "Error" });
    }
  },
);

router.get("/:id", getSingleExperience);

export default router;
