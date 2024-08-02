import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import eventRoutes from './routes/eventRoutes';
import bookingRoutes from './routes/bookingRoutes';
import ResponseModel from './middlewares/ResponseModel';


const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//log the requests
app.use((req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    console.log(`${req.method} ${req.url} - ${req.ip} - ${req.headers['user-agent']} - ${res.statusCode} ${res.statusMessage}`);
  });
  next();
});


//routes for events related api
app.use('/api/events', eventRoutes);

//routes for booking related api
app.use('/api/bookings', bookingRoutes);

// Middleware for handling 404 errors
app.use((req:Request, res:Response, next:NextFunction) => {
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
