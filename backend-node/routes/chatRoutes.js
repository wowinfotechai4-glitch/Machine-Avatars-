const express = require("express");

const router = express.Router();

const chatController = require("../controllers/chatController");


// ASK QUESTION
router.post("/ask", chatController.askQuestion);


// GET CHAT HISTORY
router.get("/history", chatController.getChatHistory);


module.exports = router;