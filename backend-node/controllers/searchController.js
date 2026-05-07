const db = require("../config/db");


// ================= SEARCH =================
exports.search = (req, res) => {

  const { question} = req.body;

  if (!question) {

    return res.status(400).json({
      message: "Query required"
    });

  }

  db.query(

    `
    SELECT *
    FROM tb_data_chunks
    WHERE content LIKE ?
    `,

    [`%${question}%`],

    (err, results) => {

      if (err) {

        return res.status(500).json({
          error: err.message
        });

      }

      res.json({

        type: "SEARCH",

        results: results

      });

    }

  );

};


// ================= ASK =================
exports.ask = (req, res) => {

  const { question } = req.body;

  if (!question) {

    return res.status(400).json({
      message: "Question required"
    });

  }

  db.query(

    `
    SELECT *
    FROM tb_data_chunks
    WHERE content LIKE ?
    LIMIT 1
    `,

    [`%${question}%`],

    (err, results) => {

      if (err) {

        return res.status(500).json({
          error: err.message
        });

      }

      if (results.length === 0) {

        return res.json({
          answer: "No answer found"
        });

      }

      res.json({

        question: question,

        answer: results[0].content

      });

    }

  );

};