const express = require("express");
const router = express.Router();
const User = require("../modules/user.module");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./authMiddleware");

// Signup route (public)
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    const response = await user.save();
    res.status(201).json({ message: "User registered successfully", user: response });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login route (public)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || "secretkey", { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users (public, NO auth middleware)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protect all routes below this middleware
router.use(auth);

router.get("/:role", async (req, res) => {
  try {
    const role = req.params.role;
    if (["waiter", "chef", "manager", "user"].includes(role)) {
      const response = await User.find({ role: role });
      res.json(response);
    } else {
      return res.status(400).json({ error: "Invalid role parameter" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add user (protected)
router.post("/", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Bulk insert
      const response = await User.insertMany(req.body);
      res.status(201).json(response);
    } else {
      // Single insert
      const user = new User(req.body);
      const response = await user.save();
      res.status(201).json(response);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Edit user (protected)
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update against the schema
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    return res.status(404).json({ error: "Internal server error" });
  }
});

// Delete user (protected)
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(deleteUser);
  } catch (err) {
    return res.status(404).json({ error: "Internal server error" });
  }
});

module.exports = router;