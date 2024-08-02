"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
//Booking Schena
const bookingSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    eventId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Event', required: true },
    quantity: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
