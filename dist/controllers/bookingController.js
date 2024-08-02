"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printTicket = exports.cancelBooking = exports.createBooking = exports.getBookings = void 0;
const Booking_1 = require("../models/Booking");
const Event_1 = require("../models/Event");
const ResponseModel_1 = __importDefault(require("../middlewares/ResponseModel"));
const pdfkit_1 = __importDefault(require("pdfkit"));
// Controller to get all bookings
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield Booking_1.Booking.find();
        return res.status(200).json(ResponseModel_1.default.success(bookings, 'Bookings retrieved successfully', 200));
    }
    catch (error) {
        return res.status(500).json(ResponseModel_1.default.error(error.message, 500));
    }
});
exports.getBookings = getBookings;
// Controller to create a new booking
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, eventId } = req.body;
    let { quantity } = req.body;
    // Validate required fields
    if (!userId || !eventId || !quantity) {
        return res.status(400).json(ResponseModel_1.default.error('Missing required fields', 400));
    }
    // Validate that eventId is a ObjectId
    if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json(ResponseModel_1.default.error('Invalid event ID', 400));
    }
    // Validate that quantity is a whole number
    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json(ResponseModel_1.default.error('Quantity must be a positive whole number', 400));
    }
    // Validate maximum quantity
    if (quantity > 15) {
        quantity = 15;
    }
    try {
        const event = yield Event_1.Event.findById(eventId);
        if (!event) {
            return res.status(404).json(ResponseModel_1.default.error('Event not found', 404));
        }
        // Check if there are enough tickets available
        if (event.totalTickets - event.bookedTickets < quantity) {
            return res.status(400).json(ResponseModel_1.default.error('Not enough tickets available', 400));
        }
        // Create and save the new booking
        const booking = new Booking_1.Booking({ userId, eventId, quantity });
        yield booking.save();
        // Update the event's booked and remaining tickets
        event.bookedTickets += quantity;
        event.remainingTickets = event.totalTickets - event.bookedTickets;
        yield event.save();
        return res.status(201).json(ResponseModel_1.default.success(booking, 'Booking created successfully', 201));
    }
    catch (error) {
        return res.status(500).json(ResponseModel_1.default.error(error.message, 500));
    }
});
exports.createBooking = createBooking;
// Controller to cancel a booking
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Validate required fields
        if (!id) {
            return res.status(400).json(ResponseModel_1.default.error('Booking ID is required', 400));
        }
        // Validate id to ObjectId type
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json(ResponseModel_1.default.error('Invalid booking ID format', 400));
        }
        // Find the booking by ID
        const booking = yield Booking_1.Booking.findById(id);
        if (!booking) {
            return res.status(404).json(ResponseModel_1.default.error('Booking not found', 404));
        }
        // Update the event's booked and remaining tickets if the event exists
        const event = yield Event_1.Event.findById(booking.eventId);
        if (event) {
            event.bookedTickets -= booking.quantity;
            event.remainingTickets += booking.quantity;
            yield event.save();
        }
        // Delete the booking
        yield booking.deleteOne();
        return res.status(200).json(ResponseModel_1.default.success(null, 'Booking canceled', 200));
    }
    catch (error) {
        return res.status(500).json(ResponseModel_1.default.error(error.message, 500));
    }
});
exports.cancelBooking = cancelBooking;
// Controller to print a ticket as a PDF
const printTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.bid;
        // Validate required fields
        if (!id) {
            return res.status(400).json(ResponseModel_1.default.error('Booking ID is required', 400));
        }
        // Validate id to ObjectId type
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json(ResponseModel_1.default.error('Invalid booking ID format', 400));
        }
        // Find the booking by ID and populate the event details
        const booking = yield Booking_1.Booking.findById(id).populate('eventId');
        if (!booking) {
            return res.status(404).json(ResponseModel_1.default.error('Booking not found', 404));
        }
        const event = booking.eventId;
        // Create a new PDF document
        const doc = new pdfkit_1.default();
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
    }
    catch (error) {
        return res.status(500).json(ResponseModel_1.default.error(error.message, 500));
    }
});
exports.printTicket = printTicket;
