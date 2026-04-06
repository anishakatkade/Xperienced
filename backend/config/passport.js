import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import GitHubStrategy from "passport-github2";
console.log("GOOGLE CLIENT:", process.env.GOOGLE_CLIENT_ID);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        //  Check user exists
        let user = await User.findOne({ email });

        if (!user) {
          //  Create user
          user = await User.create({
            name: profile.displayName,
            email: email,
            googleId: profile.id,
            password: "google-auth",
          });
        }

        //  PROFILE CHECK
        let userProfile = await Profile.findOne({ user: user._id });

        if (!userProfile) {
          await Profile.create({
            user: user._id,
            bio: "",
            college: "",
            company: "",
            linkedin: "",
            github: "",
            profilePic: profile.photos?.[0]?.value || "",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails?.[0]?.value || `${profile.username}@github.com`;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.username,
            email: email,
            githubId: profile.id,
            password: "github-auth",
          });
        }

        // PROFILE CHECK
        let userProfile = await Profile.findOne({ user: user._id });

        if (!userProfile) {
          await Profile.create({
            user: user._id,
            bio: "",
            college: "",
            company: "",
            linkedin: "",
            github: "",
            profilePic: profile.photos?.[0]?.value || "",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);
