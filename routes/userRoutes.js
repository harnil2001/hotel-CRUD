const express = require("express");
const router = express.Router();
const User = require("../modules/user.module");

// Route to create a user (supports single and bulk insert)
router.post("/", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Bulk insert
      const response = await User.insertMany(req.body);
      res.status(201).json(response);
      console.log("Users added", response);
    } else {
      // Single insert
      const user = new User(req.body);
      const response = await user.save();
      res.status(201).json(response);
      console.log("User added", response);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:role", async (req, res) => {
  try {
    const role = req.params.role;
    if (["waiter", "chef", "manager", "user"].includes(role)) {
      const response = await User.find({ role });
      res.json(response);
    } else {
      return res.status(400).json({ error: "Invalid role" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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