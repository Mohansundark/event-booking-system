import { Request, Response } from 'express';
import { Booking, IBooking } from '../models/Booking';
import { Event, IEvent } from '../models/Event';
import ResponseModel from '../middlewares/ResponseModel'; // Adjust the import path as needed
import PDFDocument from 'pdfkit';

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find();
    return res.status(200).json(ResponseModel.success(bookings, 'Bookings retrieved successfully', 200));
  } catch (error: any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};

export const createBooking = async (req: Request, res: Response) => {
  const { userId, eventId, quantity } = req.body;
  
  if (!userId || !eventId || !quantity) {
    return res.status(400).json(ResponseModel.error('Missing required fields', 400));
  }


  const Quantity = Number(quantity);
  if (!Number.isInteger(Quantity)) {
    return res.status(400).json(ResponseModel.error('Quantity must be a whole number', 400));
  }
  if (Quantity > 15) {
    return res.status(400).json(ResponseModel.error('Cannot book more than 15 tickets', 400));
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json(ResponseModel.error('Event not found', 404));
    }

    if (event.totalTickets - event.bookedTickets  < Quantity) {
      return res.status(400).json(ResponseModel.error('Not enough tickets available', 400));
    }

    const booking = new Booking({ userId, eventId, quantity:Quantity });
    await booking.save();

    event.bookedTickets += Quantity;
    event.remainingTickets = event.totalTickets - event.bookedTickets;
    await event.save();

    return res.status(201).json(ResponseModel.success(booking, 'Booking created successfully', 201));
  } catch (error: any) {
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
      event.remainingTickets += booking.quantity;
      await event.save();
    }

    await booking.deleteOne();
    return res.status(200).json(ResponseModel.success(null, 'Booking canceled', 200));
  } catch (error: any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};

export const printTicket = async (req: Request, res: Response) => {
  try {
    const id = req.body.bid;
    const booking: IBooking | null = await Booking.findById(id).populate<{ eventId: IEvent }>('eventId');
    if (!booking) {
      return res.status(404).json(ResponseModel.error('Booking not found', 404));
    }

    const event = booking.eventId;

    // Create a PDF document
    const doc = new PDFDocument();
    
    // Stream the PDF to the response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ticket_${id}.pdf`);

    // Add content to the PDF
    doc.fontSize(20).text('Event Ticket', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Event: ${event.name}`);
    doc.text(`Date: ${event.date}`);
    doc.text(`User ID: ${booking.userId}`);
    doc.text(`Quantity: ${booking.quantity}`);
    doc.text(`Ticket Issued Time: ${booking.timestamp}`);
    doc.end();

    // Pipe the document to the response
    doc.pipe(res);
  } catch (error: any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};
