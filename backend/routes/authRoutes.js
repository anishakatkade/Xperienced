import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/authValidator.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/register", registerValidator, validate, registerUser);

router.post("/login", loginValidator, validate, loginUser);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.redirect(`http://localhost:5173/profile?token=${token}`);
  },
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.redirect(`http://localhost:5173/profile?token=${token}`);
  },
);

router.post("/logout", logoutUser);
export default router;
