const db = require("../config/db");

exports.processData = (sourceId) => {
  db.query(
    "SELECT content FROM data_sources WHERE id = ?",
    [sourceId],
    (err, result) => {
      if (err || result.length === 0) {
        console.log("❌ No data found");
        return;
      }

      const content = result[0].content;

      // Split into chunks (200 chars)
      const chunks = content.match(/.{1,200}/g);

      if (!chunks) return;

      chunks.forEach(chunk => {
        db.query(
          "INSERT INTO data_chunks (content, source_id) VALUES (?, ?)",
          [chunk, sourceId],
          (err) => {
            if (err) console.log("Chunk insert error:", err);
          }
        );
      });

      console.log("✅ Data processed into chunks");
    }
  );
};