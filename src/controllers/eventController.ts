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
  
  // Validate date is a valid date
  if (!Date.parse(date)) {
    return res.status(400).json(ResponseModel.error('Invalid date', 400));
  }

  // Validate date is in the future
  if (new Date(date) < new Date()) {
    return res.status(400).json(ResponseModel.error('Date must be in the future', 400));
  }

  // Validate totalTickets is a whole number
  if (!Number.isInteger(totalTickets) || totalTickets <= 0) {
    return res.status(400).json(ResponseModel.error('Total tickets must be a positive whole number', 400));
  }

  // Validate maximum tickets
  if (totalTickets > 150) {
    return res.status(400).json(ResponseModel.error('Cannot have more than 150 tickets', 400));
  }

  try {
    const existingEvent = await Event.findOne({ name });
    if (existingEvent) {
      return res.status(400).json(ResponseModel.error('Event already exists', 400));
    }

    // Create and save the new event
    const newEvent = new Event({ name, date, totalTickets });
    await newEvent.save();
    return res.status(201).json(ResponseModel.success(newEvent, 'Event created successfully', 201));
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
    // Validate ID parameter
    const id = req.params.id;
    if (!id) {
      return res.status(400).json(ResponseModel.error('Event ID is required', 400));
    }
    
    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json(ResponseModel.error('Invalid event ID format', 400));
    }

    // Find the event by ID
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json(ResponseModel.error('Event not found', 404));
    }
    return res.status(200).json(ResponseModel.success(event, 'Event retrieved successfully', 200));
  } catch (error: any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};
