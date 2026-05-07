const db = require("../config/db");


// ================= CREATE BLOG =================
exports.createBlog = async (
  title,
  slug,
  short_description,
  content,
  thumbnail,
  category,
  author,
  status
) => {

  const [result] = await db.promise().query(
    `
    INSERT INTO tb_blogs
    (
      title,
      slug,
      short_description,
      content,
      thumbnail,
      category,
      author,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      title,
      slug,
      short_description,
      content,
      thumbnail,
      category,
      author,
      status
    ]
  );

  return result;
};


// ================= GET ALL BLOGS =================
exports.getAllBlogs = async () => {

  const [rows] = await db.promise().query(
    "SELECT * FROM tb_blogs ORDER BY id DESC"
  );

  return rows;
};


// ================= GET SINGLE BLOG =================
exports.getBlogById = async (id) => {

  const [rows] = await db.promise().query(
    "SELECT * FROM tb_blogs WHERE id = ?",
    [id]
  );

  return rows[0];
};


// ================= UPDATE BLOG =================
exports.updateBlog = async (
  id,
  title,
  slug,
  short_description,
  content,
  thumbnail,
  category,
 author,
  status
) => {

  const [result] = await db.promise().query(
    `
    UPDATE tb_blogs
    SET
      title = ?,
      slug = ?,
      short_description = ?,
      content = ?,
      thumbnail = ?,
      category = ?,
      author = ?,
      status = ?
    WHERE id = ?
    `,
    [
      title,
      slug,
      short_description,
      content,
      thumbnail,
      category,
      author,
      status,
      id
    ]
  );

  return result;
};


// ================= DELETE BLOG =================
exports.deleteBlog = async (id) => {

  const [result] = await db.promise().query(
    "DELETE FROM tb_blogs WHERE id = ?",
    [id]
  );

  return result;
};