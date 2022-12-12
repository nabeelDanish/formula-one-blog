const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const { TOKEN_KEY } = process.env;

// Creating the Router
const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    // Getting Request Data
    const { firstName, lastName, userName, email, password } = req.body;

    // Validating User Input
    if (!(email && password && firstName && lastName && userName)) {
      return res.status(400).send("All Inputs Required");
    }

    // Checking for older users by email
    const oldUserEmail = await User.findOne({ email });

    if (oldUserEmail) {
      return res.status(409).send("Email Already in Use");
    }

    // Encrypting User Password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create a New User
    const user = await User.create({
      firstName,
      lastName,
      userName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Creating the Token
    const token = jwt.sign({ userId: user._id, email }, TOKEN_KEY, {
      expiresIn: "2h",
    });

    // Saving and Returning
    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validating User Input
    if (!(email && password)) {
      return res.status(400).send("All Inputs Required");
    }

    // Check if User exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User Does not exists");
    }

    // Checking Password
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(400).send("Incorrect Password!");
    }

    // Creating the Token
    const token = jwt.sign({ userId: user._id, email }, TOKEN_KEY, {
      expiresIn: "2h",
    });

    // Saving and Returning
    user.token = token;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
