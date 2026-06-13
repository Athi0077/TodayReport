const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    res.status(201).json("User Registered");
  } catch (err) {
    res.status(500).json(err);
  }
});



// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      role: user.role,
      name: user.name,
      id: user._id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;