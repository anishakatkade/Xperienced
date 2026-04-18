import express from "express";
import { User } from "../models/User.js";
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

router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting account" });
  }
});
export default router;
