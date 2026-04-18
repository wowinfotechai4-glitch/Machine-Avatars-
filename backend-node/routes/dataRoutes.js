const express = require("express");
const router = express.Router();
const multer = require("multer");

const dataController = require("../controllers/dataController");

// DEBUG (ADD THIS)
console.log("DataController:", dataController);

// MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ROUTES
router.post("/upload", upload.single("file"), dataController.uploadFile);
router.post("/scrape", dataController.scrapeUrl);
router.post("/save", dataController.saveData);
router.get("/all", dataController.getAllData);
router.post("/process", dataController.processData);

module.exports = router;