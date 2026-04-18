const db = require('../config/db');

// 🔐 REGISTER (SP)
exports.register = (req, res) => {
  const { email, password } = req.body;

  const keyId = "KEY" + Math.floor(Math.random() * 10000);

  db.query(
    "CALL AdminRegister(?, ?, ?)",
    [keyId, email, password],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.json({ message: "Email already exists ❌" });
        }
        return res.status(500).json(err);
      }

      res.json({
        message: "User registered successfully ✅",
        keyId
      });
    }
  );
};


const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("CALL AdminLogin(?)", [email], (err, results) => {
    if (err) return res.status(500).json(err);

    const user = results[0][0];

    if (!user) {
      return res.json({ message: "User not found ❌" });
    }

    if (password !== user.password) {
      return res.json({ message: "Wrong password ❌" });
    }

    // ✅ CREATE TOKEN
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful ✅",
      token, // 🔥 VERY IMPORTANT
      user
    });
  });
};

// 📊 DASHBOARD STATS (SP)
exports.getDashboardStats = (req, res) => {
  db.query("CALL GetDashboardStats()", (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results[0][0]);
  });
};


// 👥 GET USERS (SP)
exports.getUsers = (req, res) => {
  db.query("CALL GetAllUsers()", (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results[0]);
  });
};


// ➕ ADD USER (SP)
exports.addUser = (req, res) => {
  const { keyId, email, password } = req.body;

  db.query(
    "CALL AddUser(?, ?, ?)",
    [keyId, email, password],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "User added successfully ✅" });
    }
  );
};


// ✏️ UPDATE USER (SP)
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { email, status } = req.body;

  db.query(
    "CALL UpdateUser(?, ?, ?)",
    [id, email, status],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "User updated successfully ✅" });
    }
  );
};


// ❌ DELETE USER (SP)
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  db.query(
    "CALL DeleteUser(?)",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "User deleted successfully ✅" });
    }
  );
};


// 🤖 GET BOT SETTINGS (SP)
exports.getBotSettings = (req, res) => {
  db.query("CALL GetBotSettings()", (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results[0][0] || {});
  });
};


// 🤖 SAVE BOT SETTINGS (SP)
exports.saveBotSettings = (req, res) => {
  const { bot_name, welcome_message, theme_color } = req.body;

  db.query(
    "CALL SaveBotSettings(?, ?, ?)",
    [bot_name, welcome_message, theme_color],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Bot settings saved ✅" });
    }
  );
};