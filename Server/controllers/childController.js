import Child from '../models/child.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import session from 'express-session';
import bcrypt from 'bcryptjs';

// Sign-Up Controller
export const signUp = async (req, res) => {
  try {
    const { name, age, gender, password, parentEmail } = req.body;

    if (!name || !age || !gender || !password || !parentEmail) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingChild = await Child.findOne({ name, age });
    if (existingChild) {
      return res.status(400).json({ message: 'Child already exists.' });
    }

    const child = new Child({ name, age, gender, password, parentEmail });
    await child.save();

    res.status(201).json({ message: 'Sign-up successful!' });
  } catch (error) {
    console.error('Sign-up error:', error);
    res.status(500).json({ message: 'Error signing up.', error });
  }
};

// Sign-In Controller

export const signIn = async (req, res) => {
  const { name, password } = req.body;

  // Validate input fields
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required.' });
  }

  try {
    // Find the child by name
    const child = await Child.findOne({ name });
    
    // If the child is not found
    if (!child) {
      return res.status(404).json({ message: 'Child not found.' });
    }

    // Compare the password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, child.password);
    
    // If the password is not valid
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Store the childId in the session
    req.session.childId = child._id;

    // Send the response back to the client
    res.status(200).json({
      message: 'Login successful',
      child: {
        id: child._id,
        name: child.name,
        age: child.age,
        gender: child.gender,
      },
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Sign-in error:', error);

    // Return a server error response
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
};


// Sign-Out Controller
export const signOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ message: 'Unable to log out.' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully.' });
  });
};

export const getChildProfile = async (req, res) => {
  try {
    console.log("Session Data: ", req.session); // Log session data to verify session exists
    const childId = req.session.childId;
    if (!childId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    const child = await Child.findById(childId); // Replace with your DB logic
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }
    res.json(child);
  } catch (error) {
    console.error("Error fetching child profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};