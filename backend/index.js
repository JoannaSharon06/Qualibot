import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import rcaRoute from './routes/rcaroute.js';
import anomalyRoutes from './routes/anomaly.js';
import experienceRoutes from './routes/experience.js';
import mongoose from 'mongoose';
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/past-experience', experienceRoutes);


app.use('/api/profiles', profileRoutes);
app.use("/api/rca", rcaRoute);
app.use('/api', anomalyRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI);

