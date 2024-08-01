import { Request, Response } from 'express';
import { Booking } from '../models/Booking';
import { Event } from '../models/Event';
import ResponseModel from '../middlewares/ResponseModel'; // Adjust the import path as needed

export const createBooking = async (req: Request, res: Response) => {
  const { userId, eventId, quantity } = req.body;

  if (!userId || !eventId || !quantity) {
    return res.status(400).json(ResponseModel.error('Missing required fields', 400));
  }

  if (quantity > 15) {
    return res.status(400).json(ResponseModel.error('Cannot book more than 15 tickets', 400));
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json(ResponseModel.error('Event not found', 404));
    }

    if (event.totalTickets - event.bookedTickets < quantity) {
      return res.status(400).json(ResponseModel.error('Not enough tickets available', 400));
    }

    const booking = new Booking({ userId, eventId, quantity });
    await booking.save();

    event.bookedTickets += quantity;
    await event.save();

    return res.status(201).json(ResponseModel.success(booking, 'Booking created successfully', 201));
  } catch (error:any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json(ResponseModel.error('Booking not found', 404));
    }

    const event = await Event.findById(booking.eventId);
    if (event) {
      event.bookedTickets -= booking.quantity;
      await event.save();
    }

    await booking.deleteOne();
    return res.status(200).json(ResponseModel.success(null, 'Booking canceled', 200));
  } catch (error:any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};

export const printTicket = async (req: Request, res: Response) => {
  try {
    const id = req.params.bookingId;
    const booking = await Booking.findById(id).populate('eventId');
    if (!booking) {
      return res.status(404).json(ResponseModel.error('Booking not found', 404));
    }

    const ticketDetails = {
      event: booking.eventId,
      userId: booking.userId,
      quantity: booking.quantity,
      timestamp: booking.timestamp
    };

    return res.status(200).json(ResponseModel.success(ticketDetails, 'Ticket printed successfully', 200));
  } catch (error:any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};
