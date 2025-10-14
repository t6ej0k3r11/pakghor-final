import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserModel from "./models/User.js";

import authRoutes from "./routes/auth.js";
import cardRoutes from "./routes/cards.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", cardRoutes);

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `🚀 Server running at http://localhost:${PORT} and http://0.0.0.0:${PORT}`
  );
});
