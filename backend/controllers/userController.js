import { User } from "../models/User.js";
import Profile from "../models/Profile.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("savedPosts")
      .populate("likedPosts");

    const profile = await Profile.findOne({
      user: req.user.id,
    });

    console.log("BACKEND USER:", user);

    res.json({
      user: {
        name: user.name,
        email: user.email,
      },
      savedPosts: user.savedPosts,
      likedPosts: user.likedPosts,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//upadte user
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true },
    );

    res.json({
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//delete user profile
export const deleteUserPrfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({
      message: "user deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
