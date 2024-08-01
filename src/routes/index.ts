import { Router } from 'express';
import { createEvent, getEvents, getEventById } from '../controllers/eventController';
import { createBooking, cancelBooking, getBookings } from '../controllers/bookingController';

const router = Router();

router.post('/events', createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEventById);

router.get('/bookings',getBookings );
router.post('/bookings', createBooking);
router.delete('/bookings/:id', cancelBooking);
// router.post('/print-ticket', printTicket);

export default router;
