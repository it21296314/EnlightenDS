import test from "../models/test.js";

// Create a new test entry
export const createTest = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newTest = new test({ name, email });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all test entries
export const getTests = async (req, res) => {
  try {
    const tests = await test.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
