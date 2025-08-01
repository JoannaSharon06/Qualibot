import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import csv from "csv-parser";
import Solution from "./models/Solutions.js";
import solutionsRoute from "./routes/solutions.js";
import rcaRoute from "./routes/rcaroute.js";
import authRoutes from './routes/authRoutes.js';
import anomalyRoutes from './routes/anomaly.js';
import experienceRoutes from './routes/experience.js';
import profileRoutes from './routes/profileRoutes.js';
import profileRouter from './routes/profile.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const allowedOrigins = [
  'https://qualibot.vercel.app',
  'https://qualibot-2zh4.vercel.app' // preview URL (optional)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Not Allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Import CSV to MongoDB if collection is empty
async function importCSVIfNeeded() {
  const count = await Solution.countDocuments();
  if (count === 0) {
    const csvPath = path.join(__dirname, "data/experience_dataset.csv");
    if (!fs.existsSync(csvPath)) {
      console.error("CSV file not found at", csvPath);
      return;
    }
    const records = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        records.push(row);
      })
      .on("end", async () => {
        await Solution.insertMany(records);
        console.log("CSV imported to MongoDB.");
      });
  }
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");
    await importCSVIfNeeded();
  })
  .catch((err) => console.error(err));

app.use('/api/profiles', profileRoutes);
app.use('/api/past-experience', experienceRoutes);
app.use('/api', anomalyRoutes);
app.use('/api', authRoutes);
app.use("/api/solutions", solutionsRoute);
app.use("/api/rca", rcaRoute);
app.use('/api/profile',profileRouter);
app.get('/', (req, res) => {
  res.send('Backend is running successfully 🚀');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
