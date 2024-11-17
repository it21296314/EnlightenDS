import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; // MongoDB library
import cors from 'cors'; // Cors will let us accept cross-origin requests from our frontend to backend.
import dotenv from 'dotenv'; // For keeping secret and non-shareable properties
import multer from 'multer'; // Multer is middleware that handles multipart/form data sent from our frontend form.
import morgan from 'morgan'; // Used to log information of each request that the server receives.

import test from './routes/test.js';

const app = express();
const forms = multer();



// API configuration
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(forms.array());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(morgan('common'));
app.use(cors());
dotenv.config();

// Use the Test routes
app.use('/api', test);

//middlewares
const server = http.createServer(app);



// MongoDB setup
const PORT = process.env.PORT;
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {

      console.log(`Server running on port ${PORT}`);

    });
  })
  .catch((err) => {

    console.error('Error connecting to MongoDB:', err);

  });
