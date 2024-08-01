import { Schema, model, Document } from 'mongoose';
import { IEvent } from './Event';

// Booking Interface
export interface IBooking extends Document {
  userId: string;
  eventId: IEvent;
  quantity: number;
  timestamp: Date;
}

const bookingSchema = new Schema<IBooking>({
  userId: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Booking = model<IBooking>('Booking', bookingSchema);
