import { Schema, model, Document } from 'mongoose';

// Event Interface
export interface IEvent extends Document {
  name: string;
  date: Date;
  totalTickets: number;
  bookedTickets: number;
  remainingTickets: number;
}

//Event Schema
const eventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  totalTickets: { type: Number, required: true },
  bookedTickets: { type: Number, default: 0 },
  remainingTickets: { type: Number, default: 0 }
});

export const Event = model<IEvent>('Event', eventSchema);
