import { Request, Response } from 'express';
import { Event } from '../models/Event';

export const createEvent = async (req: Request, res: Response) => {
  const { name, date, totalTickets } = req.body;

  try {
    const event = new Event({ name, date, totalTickets });
    await event.save();
    res.status(201).json(event);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
