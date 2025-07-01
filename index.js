const express = require("express");
const connectDB = require("./db");
const Menu = require("./modules/menu.module");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// MongoDB connection
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World! Node.js + Express + MongoDB");
});

const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
app.use("/users", userRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
