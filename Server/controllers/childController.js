import Child from '../models/child.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import session from 'express-session';
import bcrypt from 'bcryptjs';

// // Sign-Up Controller
// export const signUp = async (req, res) => {
//   try {
//     const { name, age, gender, password, parentEmail } = req.body;

//     if (!name || !age || !gender || !password || !parentEmail) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const existingChild = await Child.findOne({ name, age });
//     if (existingChild) {
//       return res.status(400).json({ message: 'Child already exists.' });
//     }

//     const child = new Child({ name, age, gender, password, parentEmail });
//     await child.save();

//     res.status(201).json({ message: 'Sign-up successful!' });
//   } catch (error) {
//     console.error('Sign-up error:', error);
//     res.status(500).json({ message: 'Error signing up.', error });
//   }
// };

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

    // Initialize progress for all categories
    const progress = {
      addition: { beginner: true, intermediate: false, advanced: false },
      subtraction: { beginner: true, intermediate: false, advanced: false },
      multiplication: { beginner: true, intermediate: false, advanced: false },
      division: { beginner: true, intermediate: false, advanced: false }
    };

    // Create new child with progress
    const child = new Child({ name, age, gender, password, parentEmail, progress });
    await child.save();

    res.status(201).json({ message: 'Sign-up successful!', child });
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

// export const updateChildProgress = async (req, res) => {
//   try {
//     console.log("Session Data: ", req.session); // Log session data to verify session exists
//     const childId = req.session.childId; // Ensure the session contains the child's ID
//     if (!childId) {
//       return res.status(401).json({ message: "Unauthorized. Please log in." });
//     }

//     const { category, difficulty, readiness } = req.body;
//     if (!category || !difficulty) {
//       return res.status(400).json({ message: "Category and difficulty are required." });
//     }

//     const child = await Child.findById(childId);
//     if (!child) {
//       return res.status(404).json({ message: "Child not found" });
//     }

//     const categoryProgress = child.progress.get(category) || {
//       beginner: true,
//       intermediate: false,
//       advanced: false,
//     };

//     // Unlock next level only if readiness is 1
//     if (readiness === 1) {
//       if (difficulty === "beginner") {
//         categoryProgress.intermediate = true;
//       } else if (difficulty === "intermediate") {
//         categoryProgress.advanced = true;
//       }
//       child.progress.set(category, categoryProgress);
//       await child.save();
//       return res.json({ message: "Progress updated successfully", progress: child.progress });
//     }

//     return res.json({ message: "Level not unlocked yet", progress: child.progress });
//   } catch (error) {
//     console.error("Error updating progress:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const updateChildProgress = async (req, res) => {
  try {
    console.log("Received request body:", JSON.stringify(req.body, null, 2));
    console.log("Session Data:", req.session);
    

    // Session validation
    if (!req.session) {
      return res.status(500).json({ message: "Session not initialized" });
    }
    
    const childId = req.session.childId;
    if (!childId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // Request body validation
    const { category, difficulty, readiness } = req.body;
    if (!category) {
      return res.status(400).json({ message: "Category is required." });
    }
    if (!difficulty) {
      return res.status(400).json({ message: "Difficulty is required." });
    }
    if (readiness === undefined) {
      return res.status(400).json({ message: "Readiness status is required." });
    }
    
    // Validate difficulty value
    const validDifficulties = ["beginner", "intermediate", "advanced"];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ 
        message: "Invalid difficulty level", 
        validOptions: validDifficulties 
      });
    }

    // Database operation with error handling
    let child;
    try {
      child = await Child.findById(childId);
    } catch (dbError) {
      console.error("Database query error:", dbError);
      return res.status(500).json({ 
        message: "Database error while finding child", 
        error: dbError.message 
      });
    }

    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Process progress update
    const categoryProgress = child.progress.get(category) || {
      beginner: true,
      intermediate: false,
      advanced: false,
    };

    // Unlock next level only if readiness is 1
    if (readiness === 1) {
      if (difficulty === "beginner") {
        categoryProgress.intermediate = true;
      } else if (difficulty === "intermediate") {
        categoryProgress.advanced = true;
      }
      
      child.progress.set(category, categoryProgress);
      
      try {
        await child.save();
        console.log(`Progress updated successfully for child ${childId} in category ${category}`);
        return res.json({ 
          success: true,
          message: "Progress updated successfully", 
          progress: child.progress 
        });
      } catch (saveError) {
        console.error("Error saving child progress:", saveError);
        return res.status(500).json({ 
          message: "Error saving progress update", 
          error: saveError.message 
        });
      }
    }

    return res.json({ 
      success: true,
      message: "Level not unlocked yet", 
      progress: child.progress 
    });
    
  } catch (error) {
    console.error("Unhandled error in updateChildProgress:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

