import User from "../models/User.js";
import Profile from "../models/Profile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "user already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    await Profile.create({
      user: user._id,
      bio: "",
      college: "",
      company: "",
      linkedin: "",
      github: "",
      profilePic: "",
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.status(201).json({
      message: "signup successful",
      token,
      user,
      profile: await Profile.findOne({ user: user._id }),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//login

export const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "invaild password",
      });
    }

    let profile = await Profile.findOne({ user: user._id });

    if (!profile) {
      profile = await Profile.create({
        user: user._id,
        bio: "",
        college: "",
        company: "",
        linkedin: "",
        github: "",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    res.json({
      message: "login successful",
      token,
      user,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//logout
export const logoutUser = async (req, res) => {
  try {
    res.json({
      message: "user loogout successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
