const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const path = require("path");
const { readFile } = require("../utils/fsUtils");
const validator = require("validator");
const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const data = await readFile("../data/users.json");

    if (data.find((user) => user.email === email)) {
      return res.status(400).json({ message: "Email already exists" });
    }
    data.push({
      id: data.length + 1,
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });
    await fs.writeFile(
      path.join(__dirname, "../data/users.json"),
      JSON.stringify(data)
    );
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    if (res.headersSent) {
      return; // Response udah dikirim, gak usah ngapa-ngapain
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await readFile("../data/users.json");
    const user = data.find((user) => user.email === email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET_KEY
    );
    res.json({
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    console.error(error);
    if (res.headersSent) {
      return; // Response udah dikirim, gak usah ngapa-ngapain
    }
    res.status(500).json({ message: "Internal server error" });
  }
};


const getUsers = async (req, res) => {
  try {
    const data = await readFile("../data/users.json");
    res.json({
      message: "Users retrieved successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    if (res.headersSent) {
      return; // Response udah dikirim, gak usah ngapa-ngapain
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login , getUsers};
