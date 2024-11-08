import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';
import { userSchema } from '../user/user.model';

const bookingSchema = new Schema<TBooking>(
  {
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    user: { type: userSchema },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    transactionId: { type: String},
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: String },
    phone: { type: String, required: true },
    coupon: { type: Schema.Types.ObjectId, ref: 'Coupon' },
    isConfirmed: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
