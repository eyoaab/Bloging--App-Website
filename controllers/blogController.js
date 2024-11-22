const Blog = require('../models/blogModel');

// Get all blogs
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().populate('author', 'name username email');
  res.json(blogs);
};

// Create a new blog
const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.create({ title, content, author: req.user._id });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get blog by ID
const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'name username email');
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
};

// Update blog
const updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
};

// Delete blog
const deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json({ message: 'Blog deleted' });
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
