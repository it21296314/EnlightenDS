// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const XLSX = require('xlsx');
// const { spawn } = require('child_process');
// const path = require('path');


import express from 'express';
import XLSX from 'xlsx';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { spawn } from 'child_process';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to serve the dataset as JSON
app.get('/dataset', (req, res) => {
  try {
    // Read the Excel file
    const workbook = XLSX.readFile('synthetic_dataset3.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    res.json(data);
  } catch (error) {
    console.error("Error reading Excel file:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get predictions using the Python model
app.post('/predict', (req, res) => {
  const {
    quiz_time,
    quiz_score,
    piano_time,
    piano_key_count,
    drawing_time,
    drawing_similarity
  } = req.body;

  // Validate input
  if (
    quiz_time === undefined ||
    quiz_score === undefined ||
    piano_time === undefined ||
    piano_key_count === undefined ||
    drawing_time === undefined ||
    drawing_similarity === undefined
  ) {
    return res.status(400).json({ error: 'Missing required fields in the request body.' });
  }

  // Spawn the Python process and pass parameters as command-line arguments
  const pythonProcess = spawn('python', [
    'predict.py',
    quiz_time,
    quiz_score,
    piano_time,
    piano_key_count,
    drawing_time,
    drawing_similarity
  ]);

  let output = '';
  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    try {
      const result = JSON.parse(output);
      res.json(result);
    } catch (err) {
      console.error("Error parsing Python output:", err, output);
      res.status(500).json({ error: 'Error parsing prediction result.' });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
