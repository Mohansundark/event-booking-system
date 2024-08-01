import express, { Application } from 'express';
import mongoose from 'mongoose';  // Adjust the import path as needed
import dotenv from 'dotenv';
dotenv.config();
import index from './routes/index'
import { configDotenv } from 'dotenv';
import ResponseModel from './middlewares/ResponseModel';
const app: Application = express();

// Middleware and routes setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes here

// Use the error handling middleware

app.use('/api', index)
app.use((req, res, next) => {
  res.status(404).json(ResponseModel.error('Route Not found', 404));
  next();
});


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventbooking')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
