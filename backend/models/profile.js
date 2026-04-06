import mongoose from "mongoose";
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    college: {
      type: String,
    },
    company: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export default Profile;
