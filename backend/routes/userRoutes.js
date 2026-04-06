import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  try {
    res.json({
      user: req.user,
      stats: {
        experiences: 0,
        likes: 0,
        bookmarks: 0,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
