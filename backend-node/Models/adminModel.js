const db = require("../config/db");

// REGISTER
exports.register = (keyId, email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "CALL AdminRegister(?, ?, ?)",
      [keyId, email, password],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// LOGIN
exports.login = (email) => {
  return new Promise((resolve, reject) => {
    db.query("CALL AdminLogin(?)", [email], (err, results) => {
      if (err) reject(err);
      else resolve(results[0][0]);
    });
  });
};

// DASHBOARD
exports.getDashboardStats = () => {
  return new Promise((resolve, reject) => {
    db.query("CALL GetDashboardStats()", (err, results) => {
      if (err) reject(err);
      else resolve(results[0][0]);
    });
  });
};

// USERS
exports.getUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("CALL GetAllUsers()", (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

// ADD USER
exports.addUser = (keyId, email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "CALL AddUser(?, ?, ?)",
      [keyId, email, password],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// UPDATE USER
exports.updateUser = (id, email, status) => {
  return new Promise((resolve, reject) => {
    db.query(
      "CALL UpdateUser(?, ?, ?)",
      [id, email, status],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// DELETE USER
exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query("CALL DeleteUser(?)", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// BOT SETTINGS
exports.getBotSettings = () => {
  return new Promise((resolve, reject) => {
    db.query("CALL GetBotSettings()", (err, results) => {
      if (err) reject(err);
      else resolve(results[0][0] || {});
    });
  });
};

exports.saveBotSettings = (bot_name, welcome_message, theme_color) => {
  return new Promise((resolve, reject) => {
    db.query(
      "CALL SaveBotSettings(?, ?, ?)",
      [bot_name, welcome_message, theme_color],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};