/**
 * @module routes/bookingRoutes
 * @description Define the routes for bookings
 * @author Mohansundar
 */

import { Router } from 'express';
import { createEvent, getEvents, getEventById } from '../controllers/eventController';
import { createBooking, cancelBooking, getBookings, printTicket } from '../controllers/bookingController';

const router = Router();

/**
 * @route GET /api/bookings
 * @description Get all bookings
 * @access Public
 */
router.get('/', getBookings);

/**
 * @route POST /api/bookings
 * @description Create a new booking
 * @access Public
 */
router.post('/', createBooking);

/**
 * @route DELETE /api/bookings/:id
 * @description Delete a booking by ID
 * @access Public
 */
router.delete('/:id', cancelBooking);

/**
 * @route POST /api/bookings/print-ticket
 * @description Print a ticket for a booking
 * @access Public
 */
router.post('/print-ticket', printTicket);

export default router;

