require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth");

const authRoutes = require("./routes/auth");

// Creating the express app
const app = express();

// Adding middleware
app.use(cors());
app.use(express.json());

// Adding routes
app.use(authRoutes);

// Default Routes
app.post("/auth-test", auth, (req, res) => {
  res.status(200).send("Welcome");
});

module.exports = app;
