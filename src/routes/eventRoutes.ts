import { Router } from 'express';
import { createEvent, getEvents, getEventById } from '../controllers/eventController';
import { createBooking, cancelBooking, getBookings, printTicket } from '../controllers/bookingController';


const router = Router();



/**
 * @module routes/eventRoutes
 * @description Define the routes for events
 * @author Mohansundar
 */

/**
 * @route POST /api/events
 * @description Create a new event
 * @access Public
 */
router.post('/', createEvent);

/**
 * @route GET /api/events
 * @description Get all events
 * @access Public
 */
router.get('/', getEvents);

/**
 * @route GET /api/events/:id
 * @description Get event by ID
 * @access Public
 */
router.get('/:id', getEventById);


export default router;