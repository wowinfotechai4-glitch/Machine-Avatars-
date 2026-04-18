const db = require("../config/db");

exports.askQuestion = (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question required ❌" });
  }

  const sql = `
    SELECT content FROM data_chunks
    WHERE content LIKE ?
    LIMIT 5
  `;

  db.query(sql, [`%${question}%`], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.json({
        answer: "No relevant answer found ❌"
      });
    }

    // 🔥 Combine results into one answer
    const answer = results.map(r => r.content).join(" ");

    res.json({
      question,
      answer
    });
  });
};