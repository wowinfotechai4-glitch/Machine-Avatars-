const db = require("../config/db");


// ================= ASK QUESTION =================
exports.askQuestion = (req, res) => {

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({
      message: "Question required ❌"
    });
  }

  const sql = `
    SELECT content
    FROM tb_data_chunks
    WHERE content LIKE ?
    LIMIT 5
  `;

  db.query(sql, [`%${question}%`], (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (results.length === 0) {

      return res.json({
        answer: "No relevant answer found ❌"
      });

    }

    const answer = results
      .map(r => r.content)
      .join(" ");

    // SAVE CHAT HISTORY
    const saveSql = `
      INSERT INTO tb_chat_history
      (question, answer)
      VALUES (?, ?)
    `;

    db.query(
      saveSql,
      [question, answer],
      (saveErr, saveResult) => {

        if (saveErr) {

          return res.status(500).json({
            error: saveErr.message
          });

        }

        res.json({
          question,
          answer
        });

      }
    );

  });

};


// ================= GET CHAT HISTORY =================
exports.getChatHistory = (req, res) => {

  const sql = `
    SELECT *
    FROM tb_chat_history
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);

  });

};