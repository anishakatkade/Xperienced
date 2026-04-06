import User from "../models/User.js";
import Experience from "../models/Experience.js";

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);

    res.json({
      message: "user deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// delete experience
export const deleteExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;
    await Experience.findByIdAndDelete(experienceId);
    res.json({
      message: "experince deleted succufully",
    });
  } catch {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*delete comment */
export const deleteComment = async (res, req) => {
  try {
    const { CommentId } = req.body;
    await Comment.findByIdAndDelete(commentId);
    res.json({
      message: "coment delete",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
