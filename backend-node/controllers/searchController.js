const db = require("../config/db");

exports.search = (req, res) => {
  const { query, question } = req.body;

  const searchText = query || question;

  if (!searchText) {
    return res.status(400).json({ message: "Query required ❌" });
  }

  const sql = `
    SELECT * FROM data_chunks
    WHERE content LIKE ?
    LIMIT 5
  `;

  db.query(sql, [`%${searchText}%`], (err, results) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Results found ✅",
      results
    });
  });
};