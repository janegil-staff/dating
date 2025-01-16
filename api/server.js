import express from "express";
import dotenv from "dotenv";

dotenv.config();
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
  console.log("Server started at this port: " + PORT);
  connectDB;
});
