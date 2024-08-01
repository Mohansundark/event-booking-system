import { Request, Response, NextFunction } from 'express';
import ResponseModel from './ResponseModel'; // Adjust the import path as needed

// Define a custom error type if needed
interface CustomError extends Error {
  code?: number;
}

// Error handling middleware
const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    return next(error);
  }
  
  // Use the ResponseModel to format the error response
  const response = ResponseModel.error(error.message, error.code || 500);
  
  res
    .status(response.code)
    .json(response);
};

export default errorHandler;
