
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const UserModel = require("./models/User");

dotenv.config(); 

const authRoutes = require("./routes/auth"); 

const app = express();

const cardRoutes = require("./routes/cards");


app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", cardRoutes);

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }


    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }


    const newUser = new UserModel({ username, password });
    await newUser.save();

    res.json({ message: "✅ User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
