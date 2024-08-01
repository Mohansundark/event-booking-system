import { Request, Response } from 'express';
import { Booking } from '../models/Booking';
import { Event } from '../models/Event';

export const createBooking = async (req: Request, res: Response) => {
  const { userId, eventId, quantity } = req.body;

  if (quantity > 15) {
    return res.status(400).json({ message: 'Cannot book more than 15 tickets' });
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.totalTickets - event.bookedTickets < quantity) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    const booking = new Booking({ userId, eventId, quantity });
    await booking.save();

    event.bookedTickets += quantity;
    await event.save();

    res.status(201).json(booking);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const event = await Event.findById(booking.eventId);
    if (event) {
      event.bookedTickets -= booking.quantity;
      await event.save();
    }

    await booking.deleteOne();
    res.status(200).json({ message: 'Booking canceled' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const printTicket = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.body.bookingId).populate('eventId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      event: booking.eventId,
      userId: booking.userId,
      quantity: booking.quantity,
      timestamp: booking.timestamp
    });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
