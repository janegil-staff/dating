import express from "express";
import dotenv from "dotenv";

dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import mongoose from "mongoose";
import {createServer} from "http";
import { initializeSocket } from "./socket/socket.server.js";

const app = express();

const httpServer = createServer(app);

initializeSocket(httpServer);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5010;
try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
