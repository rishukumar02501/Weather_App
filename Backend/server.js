const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*"
}));

// MongoDB Connection

mongoose.connect("mongodb+srv://rishukumar02501_db_user:hwXKKzYhaZ6InhoO@weather-app.5dsxcjc.mongodb.net/weatherApp?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err));

// User Schema
const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
});

// Register
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashed,
  });

  await user.save();
  res.json({ message: "User Registered" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "secretKey");

  res.json({ token });
});

// Protected Route Example
app.get("/profile", (req, res) => {
  res.json({ message: "Protected data" });
});

app.listen(5000, () => console.log("Server running on port 5000"));