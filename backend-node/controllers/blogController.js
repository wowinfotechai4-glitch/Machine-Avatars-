const Blog = require("../Model/blogModel");


// ================= CREATE BLOG =================
exports.createBlog = async (req, res) => {

  try {

    const {
      title,
      slug,
      short_description,
      content,
      thumbnail,
      category,
      author,
      status
    } = req.body;

    if (!title || !content) {

      return res.status(400).json({
        message: "Title and content required"
      });

    }

    const result = await Blog.createBlog(
      title,
      slug,
      short_description,
      content,
      thumbnail,
      category,
      author,
      status
    );

    res.json({
      message: "Blog created successfully ✅",
      result
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// ================= GET ALL BLOGS =================
exports.getAllBlogs = async (req, res) => {

  try {

    const blogs = await Blog.getAllBlogs();

    res.json(blogs);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// ================= GET SINGLE BLOG =================
exports.getBlogById = async (req, res) => {

  try {

    const blog = await Blog.getBlogById(req.params.id);

    res.json(blog);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// ================= UPDATE BLOG =================
exports.updateBlog = async (req, res) => {

  try {

    const {
      title,
      slug,
      short_description,
      content,
      thumbnail,
      category,
      author,
      status
    } = req.body;

    const result = await Blog.updateBlog(
      req.params.id,
      title,
      slug,
      short_description,
      content,
      thumbnail,
      category,
      author,
      status
    );

    res.json({
      message: "Blog updated successfully ✅",
      result
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// ================= DELETE BLOG =================
exports.deleteBlog = async (req, res) => {

  try {

    const result = await Blog.deleteBlog(req.params.id);

    res.json({
      message: "Blog deleted successfully ✅",
      result
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};