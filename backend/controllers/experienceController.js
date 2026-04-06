import Experience from "../models/Experience.js";
import User from "../models/User.js"; // ✅ User import — toggleLike/toggleSave ke liye zaroori tha
import { io } from "../server.js";

export const createExperience = async (req, res) => {
  try {
    console.log("BODY DATA:", req.body);
    const {
      title,
      company,
      role,
      text,
      outcome,
      yoe,
      package: pkg,
      rating,
      difficulty,
      rounds,
      prepTips,
      questions,
      tags,
      companyLogo,
    } = req.body;

    if (!title || !company || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newExp = await Experience.create({
      title,
      company,
      role,
      difficulty,
      outcome,
      rating,
      yoe,
      package: pkg,

      rounds: Array.isArray(rounds)
        ? rounds.map((r) => r.trim()).filter(Boolean)
        : [],
      text,
      prepTips,
      questions,
      tags: Array.isArray(tags)
        ? tags.map((t) => t.trim()).filter(Boolean)
        : [],
      companyLogo,
      user: req.user._id,
      likes: [],
      views: [],
      comments: [],
      savedBy: [],
    });

    console.log("CREATED EXP ROUNDS:", newExp.rounds);
    res.status(201).json(newExp);
  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      user: req.user._id,
      createdAt: new Date(),
      replies: [],
    };

    exp.comments.push(newComment);
    await exp.save();

    const updated = await Experience.findById(req.params.id)
      .populate("comments.user", "name")
      .populate("comments.replies.user", "name")
      .populate("comments.replies.replyTo", "name");

    io.emit("newComment", { postId: req.params.id, data: updated });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const expId = req.params.id;

    const exp = await Experience.findById(expId);
    if (!exp) return res.status(404).json({ message: "Post not found" });

    if (!exp.likes) exp.likes = [];

    const alreadyLiked = exp.likes.some(
      (id) => id.toString() === userId.toString(),
    );

    if (alreadyLiked) {
      exp.likes = exp.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      exp.likes.push(userId);
    }

    await exp.save();
    res.json({ likes: exp.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleSave = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;

    const post = await Experience.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

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
};

export const addReply = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const exp = await Experience.findById(postId);
    const comment = exp.comments.id(commentId);

    comment.replies.push({
      text: req.body.text,
      user: req.user._id,
      replyTo: req.body.replyTo,
    });

    await exp.save();

    const updated = await Experience.findById(postId)
      .populate("comments.user", "name")
      .populate("comments.replies.user", "name")
      .populate("comments.replies.replyTo", "name");

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};

export const getSingleExperience = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id)
      .populate("user", "name")
      .populate("comments.user", "name")
      .populate("comments.replies.user", "name")
      .populate("comments.replies.replyTo", "name");

    res.json(exp);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};

export const addView = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    if (!postId || postId === "undefined") {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const exp = await Experience.findById(postId);
    if (!exp) return res.status(404).json({ message: "Post not found" });

    const alreadyViewed = exp.views?.some(
      (id) => id.toString() === userId.toString(),
    );

    if (!alreadyViewed) {
      await Experience.findByIdAndUpdate(postId, {
        $push: { views: userId },
      });
    }

    res.json({ views: (exp.views?.length || 0) + (alreadyViewed ? 0 : 1) });
  } catch (err) {
    console.log("ADDVIEW ERROR:", err.message);
    res.status(500).json({ message: "Error" });
  }
};
