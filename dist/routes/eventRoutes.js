"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const router = (0, express_1.Router)();
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
router.post('/', eventController_1.createEvent);
/**
 * @route GET /api/events
 * @description Get all events
 * @access Public
 */
router.get('/', eventController_1.getEvents);
/**
 * @route GET /api/events/:id
 * @description Get event by ID
 * @access Public
 */
router.get('/:id', eventController_1.getEventById);
exports.default = router;
