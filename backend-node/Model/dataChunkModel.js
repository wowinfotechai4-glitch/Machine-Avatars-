const db = require("../config/db");

// 🔹 INSERT SINGLE CHUNK
exports.insertChunk = (content, sourceId = null) => {
  return new Promise((resolve, reject) => {
    db.query(
      "CALL sp_InsertDataChunk(?, ?)",
      [content, sourceId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// 🔹 INSERT MULTIPLE CHUNKS
exports.insertMultipleChunks = async (chunks, sourceId = null) => {
  try {
    for (let chunk of chunks) {
      await exports.insertChunk(chunk, sourceId);
    }
    return true;
  } catch (err) {
    throw err;
  }
};

// 🔹 SEARCH CHUNKS (SP)
exports.searchChunks = (query) => {
  return new Promise((resolve, reject) => {
    db.query(
      "CALL sp_SearchChunks(?)",
      [query],
      (err, result) => {
        if (err) reject(err);
        else resolve(result[0]); // IMPORTANT
      }
    );
  });
};

// 🔹 GET ALL CHUNKS
exports.getAllChunks = async () => {

  const [rows] = await db
    .promise()
    .query("CALL sp_GetAllChunks()");

  return rows[0];

};

// 🔹 DELETE BY SOURCE
exports.deleteBySourceId = (sourceId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "CALL sp_DeleteChunksBySource(?)",
      [sourceId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};