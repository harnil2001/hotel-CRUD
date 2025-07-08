const express = require("express");
const router = express.Router();
const Menu = require("../modules/menu.module");

router.post("/", async (req, res) => {
  try {
    const menu = new Menu(req.body);
    const response = await menu.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
    log("Error adding menu", err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/test", async (req, res) => {
  try {
    const params = req.query;
    if (("sweet", "sour", "spicy", "bitter", "umami".includes(params.test))) {
      const response = await User.find({ params });
      res.json(response);
    } else {
      return res.status(400).json({ error: "Invalid test parameter" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (["sweet", "sour", "spicy", "bitter", "umami"].includes(taste)) {
      const response = await Menu.find({ test: taste });
      res.json(response);
    } else {
      return res.status(400).json({ error: "Invalid taste parameter" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateMenuId = req.params.id;
    const updateMenu = await Menu.findByIdAndUpdate(updateMenuId, req.body, {
      new: true,
      runValidators: true, // Validate the update against the schema
    });
    if (!updateMenu) {
      return res.status(404).json({ error: "Menu not found" });
    }
    res.json(updateMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteMenuId = req.params.id;
    const deleteMenu = await Menu.findByIdAndDelete(deleteMenuId);
    if (!deleteMenu) {
      return res.status(404).json({ error: "Menu not found" });
    }
    res.json(deleteMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
