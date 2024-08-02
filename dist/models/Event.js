"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
//Event Schema
const eventSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    totalTickets: { type: Number, required: true },
    bookedTickets: { type: Number, default: 0 },
    remainingTickets: { type: Number, default: 0 }
});
exports.Event = (0, mongoose_1.model)('Event', eventSchema);
