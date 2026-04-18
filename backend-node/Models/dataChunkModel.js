const db = require("../config/db");

// 🔹 INSERT SINGLE CHUNK
exports.insertChunk = (content, sourceId = null) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO data_chunks (content, source_id) VALUES (?, ?)",
      [content, sourceId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 🔹 INSERT MULTIPLE CHUNKS (BULK)
exports.insertMultipleChunks = (chunks, sourceId = null) => {
  return new Promise((resolve, reject) => {
    if (!chunks || chunks.length === 0) {
      return resolve([]);
    }

    const values = chunks.map(chunk => [chunk, sourceId]);

    db.query(
      "INSERT INTO data_chunks (content, source_id) VALUES ?",
      [values],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 🔹 SEARCH CHUNKS
exports.searchChunks = (query) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM data_chunks WHERE content LIKE ? LIMIT 5",
      [`%${query}%`],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

// 🔹 GET ALL CHUNKS
exports.getAllChunks = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM data_chunks ORDER BY id DESC",
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

// 🔹 DELETE CHUNKS BY SOURCE
exports.deleteBySourceId = (sourceId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM data_chunks WHERE source_id = ?",
      [sourceId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};