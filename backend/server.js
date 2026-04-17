import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import passport from "passport";
import "./config/passport.js";
import ProfileRoutes from "./routes/profileRoutes.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
connectDB();

app.use(
  cors({
   origin: [
    "http://localhost:5173",
    "https://xperienced-eight.vercel.app"
  ],  
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/users", userRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/experiences", experienceRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://xperienced-eight.vercel.app",
    ],
  },
});

io.on("connection", (Socket) => {
  console.log("User connected: ", Socket.id);

  Socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export { io };

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`server ruunning on port ${PORT}`);
});
