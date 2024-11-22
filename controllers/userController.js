const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//register new user
const registerUser = async (req, res) => {
  const { name, username, email, password ,role} = req.body;

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email already in use, please try another one' });
    }

    // Check if username already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username already taken, please try another one' });
    }

    const user = await User.create({ name, username, email, password,role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login to users account
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' }); 
    }

    // Check password validity
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });  
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id,name:user.name,usernmae:user.username,email:user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    // Ensure the user is an admin before proceeding
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        error: 'Access denied: Admins only',
      });
    }

    const users = await User.find();

    res.status(200).json({
      message: 'Users retrieved successfully',
      users
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch users',
      details: error.message
    });
  }
};

// Get single user
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        userId: req.params.id
      });
    }

    res.status(200).json({
      message: 'User retrieved successfully',
      user
    });
  } catch (error) {
    // Return a 500 error in case of any server issues
    res.status(500).json({
      error: 'Failed to retrieve user',
      details: error.message
    });
  }
};

//Update user
const updateUser = async (req, res) => {
  try {
    const loggedInUser = req.user; 

    if (loggedInUser._id.toString() !== req.params.id && loggedInUser.role !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to Update this account' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const loggedInUser = req.user; 

    if (loggedInUser._id.toString() !== req.params.id && loggedInUser.role !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to delete this account' });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    res.status(200).json({
      message: 'User deleted successfully',
      userId: req.params.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
};





module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
