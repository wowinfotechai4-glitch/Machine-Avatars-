const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const keyId = "KEY" + Math.floor(Math.random() * 10000);

    await Admin.register(keyId, email, password);

    res.json({
      message: "User registered successfully ✅",
      keyId
    });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.json({ message: "Email already exists ❌" });
    }
    res.status(500).json(err);
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.login(email);

    if (!user) {
      return res.json({ message: "User not found ❌" });
    }

    if (password !== user.password) {
      return res.json({ message: "Wrong password ❌" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      user
    });

  } catch (err) {
    res.status(500).json(err);
  }
};

// DASHBOARD
exports.getDashboardStats = async (req, res) => {
  try {
    const data = await Admin.getDashboardStats();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await Admin.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ADD USER
exports.addUser = async (req, res) => {
  try {
    const { keyId, email, password } = req.body;

    await Admin.addUser(keyId, email, password);

    res.json({ message: "User added successfully ✅" });

  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, status } = req.body;

    await Admin.updateUser(id, email, status);

    res.json({ message: "User updated successfully ✅" });

  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await Admin.deleteUser(id);

    res.json({ message: "User deleted successfully ✅" });

  } catch (err) {
    res.status(500).json(err);
  }
};

// BOT SETTINGS
exports.getBotSettings = async (req, res) => {
  try {
    const settings = await Admin.getBotSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.saveBotSettings = async (req, res) => {
  try {
    const { bot_name, welcome_message, theme_color } = req.body;

    await Admin.saveBotSettings(bot_name, welcome_message, theme_color);

    res.json({ message: "Bot settings saved ✅" });

  } catch (err) {
    res.status(500).json(err);
  }
};