import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  bio: String,
  skills: [String]
});

export default mongoose.model("Profile", profileSchema);
