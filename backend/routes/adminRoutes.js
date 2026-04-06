import express from "express";

import {
  getAllUsers,
  deleteComment,
  deleteExperience,
  deleteUser,
} from "../controllers/adminController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, getAllUsers);
router.delete("/user/:userId", authMiddleware, deleteUser);
router.delete("/experience/:experienceId", authMiddleware, deleteExperience);
router.delete("/comment/:commentId", authMiddleware, deleteComment);

export default router;
