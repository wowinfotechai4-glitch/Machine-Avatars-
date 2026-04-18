const db = require("../config/db");

// 🔹 CREATE SOURCE
exports.createSource = (content, type = "manual") => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO data_sources (content, type) VALUES (?, ?)",
      [content, type],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 🔹 GET SOURCE BY ID
exports.getSourceById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM data_sources WHERE id = ?",
      [id],
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      }
    );
  });
};

// 🔹 GET ALL SOURCES
exports.getAllSources = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM data_sources ORDER BY id DESC",
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

// 🔹 DELETE SOURCE
exports.deleteSource = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM data_sources WHERE id = ?",
      [id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};