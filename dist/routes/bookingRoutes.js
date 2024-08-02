"use strict";
/**
 * @module routes/bookingRoutes
 * @description Define the routes for bookings
 * @author Mohansundar
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController");
const router = (0, express_1.Router)();
/**
 * @route GET /api/bookings
 * @description Get all bookings
 * @access Public
 */
router.get('/', bookingController_1.getBookings);
/**
 * @route POST /api/bookings
 * @description Create a new booking
 * @access Public
 */
router.post('/', bookingController_1.createBooking);
/**
 * @route DELETE /api/bookings/:id
 * @description Delete a booking by ID
 * @access Public
 */
router.delete('/:id', bookingController_1.cancelBooking);
/**
 * @route POST /api/bookings/print-ticket
 * @description Print a ticket for a booking
 * @access Public
 */
router.post('/print-ticket', bookingController_1.printTicket);
exports.default = router;
