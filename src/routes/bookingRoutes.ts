import { Router } from 'express';
import { createEvent, getEvents, getEventById } from '../controllers/eventController';
import { createBooking, cancelBooking, getBookings, printTicket } from '../controllers/bookingController';

const router = Router();

//Bookings Routes
router.get('/',getBookings );
router.post('/', createBooking);
router.delete('/:id', cancelBooking);
router.post('/print-ticket', printTicket);

export default router;
