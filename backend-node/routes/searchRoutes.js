const express = require("express");

const router = express.Router();

const searchController = require("../controllers/searchController");


// SEARCH
router.post("/search", searchController.search);


// ASK
router.post("/ask", searchController.ask);


module.exports = router;