import User from "../models/User.js";
import Profile from "../models/Profile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
  try {
    console.log("🔥 register API hit");

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

    // 🔥 EMAIL SEND
    try {
      console.log("📩 Email sending start...");
      await sendEmail(email, "Welcome to X'perienced 🚀", name);
      console.log("✅ Email sent");
    } catch (err) {
      console.log("❌ Email failed:", err.message);
    }

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
    console.log("❌ Register error:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

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
        message: "invalid password",
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

export const logoutUser = async (req, res) => {
  try {
    res.json({
      message: "user logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};