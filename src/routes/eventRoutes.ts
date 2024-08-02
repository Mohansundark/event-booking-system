import { Router } from 'express';
import { createEvent, getEvents, getEventById } from '../controllers/eventController';
import { createBooking, cancelBooking, getBookings, printTicket } from '../controllers/bookingController';

const router = Router();

//Event Routes
router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);

export default router;