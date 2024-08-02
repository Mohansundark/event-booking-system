import express, { Application } from 'express';
import mongoose from 'mongoose';  
import dotenv from 'dotenv';
dotenv.config();
import event from './routes/eventRoutes'
import booking from './routes/bookingRoutes'
import ResponseModel from './middlewares/ResponseModel';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/events', event)
app.use('/api/bookings',booking)
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
