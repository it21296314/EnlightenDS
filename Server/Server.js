import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'; // MongoDB library
import cors from 'cors'; // Cors will let us accept cross-origin requests from our frontend to backend.
import dotenv from 'dotenv'; // For keeping secret and non-shareable properties
import multer from 'multer'; // Multer is middleware that handles multipart/form data sent from our frontend form.
import morgan from 'morgan'; // Used to log information of each request that the server receives.
// import { PythonShell } from "python-shell";
import session from 'express-session';

import test from './routes/test.js';
import questionRoutes from './routes/maths/questions.js';
import quiz from './routes/maths/quizController.js'
import child from './routes/childRoutes.js';
import dataPipeline from './controllers/maths/dataPipeLineController.js'
import overall from'./controllers/maths/getChildPerformance.js'

const app = express();
const forms = multer();



// API configuration
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(forms.array());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(morgan('common'));
dotenv.config();

app.use(  cors({
  origin: 'http://localhost:3000', // Allow only your frontend's origin
 credentials: true, // Allow credentials (cookies, session)
})
);

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Use the Test routes
app.use('/api', test);
app.use('/api/questions', questionRoutes);
app.use('/api/quizs', quiz)
app.use('/api/child', child)
app.use('/api/datapipeline', dataPipeline)
app.use('/api/overall', overall)

//middlewares
const server = http.createServer(app);



// app.post('/predict', (req, res) => {
//   const inputData = req.body;

//   console.log("Received request:", inputData);

//   const options = {
//     scriptPath: './ml/', // Adjust if necessary
//     args: [JSON.stringify(inputData)]
//   };

//   PythonShell.run('predict_readiness.py', options, (err, results) => {
//     if (err) {
//       console.error("Python script error:", err);
//       return res.status(500).send(err);
//     }

//     console.log("Python script output:", results);

//     try {
//       const output = JSON.parse(results[0]);
//       return res.json(output);
//     } catch (parseError) {
//       console.error("Error parsing Python output:", parseError);
//       return res.status(500).send({ error: "Invalid Python output" });
//     }
//   });
// });


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
