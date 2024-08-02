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
exports.getEventById = exports.getEvents = exports.createEvent = void 0;
const Event_1 = require("../models/Event");
const ResponseModel_1 = __importDefault(require("../middlewares/ResponseModel"));
// Controller to create a new event
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date, totalTickets } = req.body;
    // Validate required fields
    if (!name || !date || !totalTickets) {
        return res.status(400).json(ResponseModel_1.default.error('Missing required fields', 400));
    }
    try {
        // Create and save the new event
        const event = new Event_1.Event({ name, date, totalTickets });
        yield event.save();
        return res.status(201).json(ResponseModel_1.default.success(event, 'Event created successfully', 201));
    }
    catch (error) {
        return res.status(500).json(ResponseModel_1.default.error(error.message, 500));
    }
});
exports.createEvent = createEvent;
// Controller to get all events
const getEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield Event_1.Event.find();
        return res.status(200).json(ResponseModel_1.default.success(events, 'Events retrieved successfully', 200));
    }
    catch (error) {
        return res.status(500).json(ResponseModel_1.default.error(error.message, 500));
    }
});
exports.getEvents = getEvents;
// Controller to get an event by ID
const getEventById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the event by ID
        const event = yield Event_1.Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json(ResponseModel_1.default.error('Event not found', 404));
        }
        return res.status(200).json(ResponseModel_1.default.success(event, 'Event retrieved successfully', 200));
    }
    catch (error) {
        return res.status(500).json(ResponseModel_1.default.error(error.message, 500));
    }
});
exports.getEventById = getEventById;
