import express, { Application } from 'express';
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler';  // Adjust the import path as needed

import index from './routes/index'
const app: Application = express();

// Middleware and routes setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes here

// Use the error handling middleware
app.use(errorHandler);
app.use('/api',index)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventbooking')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
