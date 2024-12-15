const Blog = require('../models/blogModel');

// Get all blogs
const getAllBlogs = async (req, res) => {
  try{
  const blogs = await Blog.find().populate('author', '-password');
  res.status(200).json({'blogs': blogs});
  }catch(error){
    res.status(500).json({error:error})
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.create({ title, content, author: req.user._id });
    res.status(201).json({message:"blog created succesfully",blog:blog});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get blog by ID
const getBlogById = async (req, res) => {
  try{
  const blog = await Blog.findById(req.params.id).populate('author', 'name username email');
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.status(200).json(blog);}
  catch(error){
    res.status(500).json({'error':error})
  }
};

// Update blog 
const updateBlog = async (req, res) => {
  try {
    const loggedInUser = req.user; 

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (blog.author.toString() !== loggedInUser._id.toString() && loggedInUser.role !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to update this blog' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    res.status(200).json({message:"blog updated succesully!",updatedBlog:updatedBlog});
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog', details: error.message });
  }
};


const deleteBlog = async (req, res) => {
  try {
    const loggedInUser = req.user; 

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (blog.author.toString() !== loggedInUser._id.toString() && loggedInUser.role !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Blog deleted successfully',
      blogId: req.params.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog', details: error.message });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
