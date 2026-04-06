import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    username: {
      type: String,
    },

    company: String,
    companyLogo: String,
    text: String,

    title: {
      type: String,
      required: true,
    },
    role: { type: String },
    outcome: {
      type: String,
      enum: ["selected", "rejected", "pending"],
      default: "pending",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard", "Very Hard"],
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    yoe: {
      type: String,
    },

    package: {
      type: String,
    },
    rounds: [
      {
        type: String,
        default: [],
      },
    ],
    tags: [
      {
        type: String,
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    views: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        text: String,

        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        likes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],

        replies: [
          {
            text: String,

            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },

            replyTo: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },

            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Experience", experienceSchema);
