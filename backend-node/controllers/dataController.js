const db = require("../config/db");
const axios = require("axios");
const cheerio = require("cheerio");

const cleanText = require("../utils/textCleaner");
const chunkText = require("../utils/chunker");


// ================= SCRAPE URL =================
exports.scrapeUrl = async (req, res) => {

  try {

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        message: "URL required ❌"
      });
    }

    // FETCH WEBSITE
    const response = await axios.get(url);

    // LOAD HTML
    const $ = cheerio.load(response.data);

    let text = "";

    $("p").each((i, el) => {
      text += $(el).text() + " ";
    });

    // CLEAN TEXT
    const cleaned = cleanText(text);

    // CREATE CHUNKS
    const chunks = chunkText(cleaned);

    // SAVE CHUNKS
    chunks.forEach((chunk) => {

      db.query(
        "INSERT INTO tb_data_chunks (content) VALUES (?)",
        [chunk],
        (err) => {
          if (err) console.log(err);
        }
      );

    });

    res.json({
      message: "Scraped + cleaned + chunked + saved ✅",
      total_chunks: chunks.length
    });

  } catch (err) {

    res.status(500).json({
      message: "Scrape error ❌",
      error: err.message
    });

  }

};


// ================= SAVE DATA =================
exports.saveData = (req, res) => {

  const { content } = req.body;

  if (!content) {

    return res.status(400).json({
      message: "Content required ❌"
    });

  }

  // CLEAN TEXT
  const cleaned = cleanText(content);

  // CREATE CHUNKS
  const chunks = chunkText(cleaned);

  // SAVE CHUNKS
  chunks.forEach((chunk) => {

    db.query(
      "INSERT INTO tb_data_chunks (content) VALUES (?)",
      [chunk],
      (err) => {
        if (err) console.log(err);
      }
    );

  });

  res.json({
    message: "Data cleaned + chunked + saved ✅",
    total_chunks: chunks.length
  });

};


// ================= GET ALL DATA =================
exports.getAllData = (req, res) => {

  db.query(
    "SELECT * FROM tb_data_chunks ORDER BY id DESC",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

};


// ================= PROCESS DATA =================
exports.processData = (req, res) => {

  const { sourceId } = req.body;

  if (!sourceId) {

    return res.status(400).json({
      message: "sourceId required ❌"
    });

  }

  db.query(
    "SELECT content FROM tb_data_sources WHERE id = ?",
    [sourceId],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {

        return res.status(404).json({
          message: "No data found ❌"
        });

      }

      const content = result[0].content;

      // CREATE CHUNKS
      const chunks = content.match(/.{1,200}/g);

      if (!chunks) {

        return res.json({
          message: "No chunks created"
        });

      }

      let inserted = 0;

      chunks.forEach((chunk) => {

        db.query(
          "INSERT INTO tb_data_chunks (content, source_id) VALUES (?, ?)",
          [chunk, sourceId],
          (err) => {

            if (!err) {
              inserted++;
            }

          }
        );

      });

      res.json({
        message: "Data processed & chunked ✅",
        totalChunks: chunks.length
      });

    }
  );

};