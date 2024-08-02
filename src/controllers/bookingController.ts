import { Request, Response } from 'express';
import { Booking, IBooking } from '../models/Booking';
import { Event, IEvent } from '../models/Event';
import ResponseModel from '../middlewares/ResponseModel'; 
import PDFDocument from 'pdfkit';

// Controller to get all bookings
export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find();
    return res.status(200).json(ResponseModel.success(bookings, 'Bookings retrieved successfully', 200));
  } catch (error: any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};

// Controller to create a new booking
export const createBooking = async (req: Request, res: Response) => {
  const { userId, eventId } = req.body;
  let { quantity } = req.body;
  // Validate required fields
  if (!userId || !eventId || !quantity) {
    return res.status(400).json(ResponseModel.error('Missing required fields', 400));
  }

  // Validate that eventId is a ObjectId
  if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json(ResponseModel.error('Invalid event ID', 400));
  }

  // Validate that quantity is a whole number
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json(ResponseModel.error('Quantity must be a positive whole number', 400));
  }

  // Validate maximum quantity
  if (quantity > 15) {
    quantity = 15;
    
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json(ResponseModel.error('Event not found', 404));
    }

    // Check if there are enough tickets available
    if (event.totalTickets - event.bookedTickets < quantity) {
      return res.status(400).json(ResponseModel.error('Not enough tickets available', 400));
    }

    // Create and save the new booking
    const booking = new Booking({ userId, eventId, quantity });
    await booking.save();

    // Update the event's booked and remaining tickets
    event.bookedTickets += quantity;
    event.remainingTickets = event.totalTickets - event.bookedTickets;
    await event.save();

    return res.status(201).json(ResponseModel.success(booking, 'Booking created successfully', 201));
  } catch (error: any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};

// Controller to cancel a booking
export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Validate required fields
    if (!id) {
      return res.status(400).json(ResponseModel.error('Booking ID is required', 400));
    }

    // Validate id to ObjectId type
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json(ResponseModel.error('Invalid booking ID format', 400));
    }

    // Find the booking by ID
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json(ResponseModel.error('Booking not found', 404));
    }

    // Update the event's booked and remaining tickets if the event exists
    const event = await Event.findById(booking.eventId);
    if (event) {
      event.bookedTickets -= booking.quantity;
      event.remainingTickets += booking.quantity;
      await event.save();
    }

    // Delete the booking
    await booking.deleteOne();
    return res.status(200).json(ResponseModel.success(null, 'Booking canceled', 200));
  } catch (error: any) {
    return res.status(500).json(ResponseModel.error(error.message, 500));
  }
};

// Controller to print a ticket as a PDF
export const printTicket = async (req: Request, res: Response) => {
  try {
    const id = req.body.bid;

    // Validate required fields
    if (!id) {
      return res.status(400).json(ResponseModel.error('Booking ID is required', 400));
    }

    // Validate id to ObjectId type
    if (!id.match(/^[0-9a-fA-F]{24}$/)) { 
      return res.status(400).json(ResponseModel.error('Invalid booking ID format', 400));
    }

    // Find the booking by ID and populate the event details
    const booking: IBooking | null = await Booking.findById(id).populate<{ eventId: IEvent }>('eventId');
    if (!booking) {
      return res.status(404).json(ResponseModel.error('Booking not found', 404));
    }

    const event = booking.eventId;

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers for PDF file
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
