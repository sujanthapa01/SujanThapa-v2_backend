const User = require("../model/DBmodel");
const bcrypt = require('bcrypt');
const generateToken = require('../utils/GenrateToken');

async function handlenewUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    console.log("User saved successfully:", newUser);
    res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error, user not registered" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
  const token = generateToken(user);

    // Return token to client
    res.json({ token });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error, login failed" });
  }
}

module.exports = { login, handlenewUser };
