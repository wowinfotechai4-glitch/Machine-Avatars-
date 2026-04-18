const db = require("../config/db");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const cleanText = require("../utils/textCleaner");
const chunkText = require("../utils/chunker"); // 🔥 NEW



//  UPLOAD FILE 
exports.uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    let content = fs.readFileSync(filePath, "utf-8");

    // 🔹 CLEAN TEXT
    const cleaned = cleanText(content);

    // 🔹 CHUNK TEXT
    const chunks = chunkText(cleaned);

    // 🔹 SAVE EACH CHUNK
    chunks.forEach((chunk) => {
      db.query(
        "CALL AdminLogin(?)",
        [chunk],
        (err) => {
          if (err) console.log("Chunk insert error:", err);
        }
      );
    });

    res.json({
      message: "File uploaded + cleaned + chunked + saved",
      total_chunks: chunks.length
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload error" });
  }
};



// SCRAPE URL 
exports.scrapeUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL required " });
    }

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let text = "";

    $("p").each((i, el) => {
      text += $(el).text() + " ";
    });

    // 🔹 CLEAN
    const cleaned = cleanText(text);

    // 🔹 CHUNK
    const chunks = chunkText(cleaned);

    // 🔹 SAVE
    chunks.forEach((chunk) => {
      db.query(
        "INSERT INTO data_chunks (content) VALUES (?)",
        [chunk],
        (err) => {
          if (err) console.log(err);
        }
      );
    });

    res.json({
      message: "Scraped + cleaned + chunked + saved ",
      total_chunks: chunks.length
    });

  } catch (err) {
    res.status(500).json({
      message: "Scrape error ",
      error: err.message
    });
  }
};



// SAVE DATA
exports.saveData = (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content required " });
  }

  //CLEAN + CHUNK
  const cleaned = cleanText(content);
  const chunks = chunkText(cleaned);

  chunks.forEach((chunk) => {
    db.query(
      "INSERT INTO data_chunks (content) VALUES (?)",
      [chunk],
      (err) => {
        if (err) console.log(err);
      }
    );
  });

  res.json({
    message: "Data cleaned + chunked + saved",
    total_chunks: chunks.length
  });
};



//GET ALL DATA 
exports.getAllData = (req, res) => {
  db.query("SELECT * FROM data_chunks ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// 🔥 PROCESS DATA → CREATE CHUNKS
exports.processData = (req, res) => {
  const { sourceId } = req.body;

  if (!sourceId) {
    return res.status(400).json({ message: "sourceId required ❌" });
  }

  db.query(
    "SELECT content FROM data_sources WHERE id = ?",
    [sourceId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "No data found ❌" });
      }

      const content = result[0].content;

      // 🔹 CHUNK TEXT
      const chunks = content.match(/.{1,200}/g);

      if (!chunks) {
        return res.json({ message: "No chunks created" });
      }

      let count = 0;

      chunks.forEach(chunk => {
        db.query(
          "INSERT INTO data_chunks (content, source_id) VALUES (?, ?)",
          [chunk, sourceId],
          (err) => {
            if (!err) count++;
          }
        );
      });

      // 🔥 IMPORTANT RESPONSE
      res.json({
        message: "Data processed & chunked",
        totalChunks: chunks.length
      });
    }
  );
};