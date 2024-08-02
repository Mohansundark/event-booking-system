import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import event from './routes/eventRoutes';
import booking from './routes/bookingRoutes';
import ResponseModel from './middlewares/ResponseModel';

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes for event-related endpoints
app.use('/api/events', event);
// Routes for booking-related endpoints
app.use('/api/bookings', booking);

// Middleware for handling Unregistered Routes errors
app.use((req, res, next) => {
  res.status(404).json(ResponseModel.error('Route Not found', 404));
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventbooking')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
