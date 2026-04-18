const db = require("../config/db");

exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM admin_users WHERE email = ?",
      [email],
      (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      }
    );
  });
};

exports.createUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO admin_users (email, password) VALUES (?, ?)",
      [email, password],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};