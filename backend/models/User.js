import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "employee", "admin"],
      default: "student",
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
    likedPost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
export default User;
