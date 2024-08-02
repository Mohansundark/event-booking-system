import { NextFunction, Request, Response } from 'express';
import { Event } from '../models/Event';
import ResponseModel from '../middlewares/ResponseModel'; 

// Controller to create a new event
export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  const { name, date, totalTickets } = req.body;

  // Validate required fields
  if (!name || !date || !totalTickets) {
    return res.status(400).json(ResponseModel.error('Missing required fields', 400));
  }

  try {
    // Create and save the new event
    const event = new Event({ name, date, totalTickets });
    await event.save();
    return res.status(201).json(ResponseModel.success(event, 'Event created successfully', 201));
  } catch (error: any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};

// Controller to get all events
export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await Event.find();
    return res.status(200).json(ResponseModel.success(events, 'Events retrieved successfully', 200));
  } catch (error: any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};

// Controller to get an event by ID
export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find the event by ID
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json(ResponseModel.error('Event not found', 404));
    }
    return res.status(200).json(ResponseModel.success(event, 'Event retrieved successfully', 200));
  } catch (error: any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};
