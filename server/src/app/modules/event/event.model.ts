import { model, Schema } from 'mongoose';
import { TEvent } from './event.interface';

const eventSchema = new Schema<TEvent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    layout: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    guestCount: { type: Number, required: true },
    eventType: { type: String, required: true },
    foodPreference: { type: String, required: true },
    additionalRequirements: { type: String },
    preferenceImage: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    }
  },
  {
    timestamps: true,
  }
);

export const Event = model<TEvent>('Event', eventSchema);