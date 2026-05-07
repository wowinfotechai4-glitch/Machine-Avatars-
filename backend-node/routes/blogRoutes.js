const express = require("express");

const router = express.Router();

const blogController = require("../controllers/blogController");


// CREATE BLOG
router.post("/create", blogController.createBlog);

// GET ALL BLOGS
router.get("/", blogController.getAllBlogs);

// GET SINGLE BLOG
router.get("/:id", blogController.getBlogById);

// UPDATE BLOG
router.put("/:id", blogController.updateBlog);

// DELETE BLOG
router.delete("/:id", blogController.deleteBlog);

module.exports = router;