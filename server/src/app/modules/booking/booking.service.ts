import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../user/user.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Room } from '../room/room.model';
import { generateTransactionId } from '../../utils/generateTransaction';
import { initiatePayment } from '../../utils/payment';

const createBookingIntoDB = async (payload: TBooking) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findById(payload.user);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
    }

    // const room = await Room.findById(payload.room);
    // if (!room) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'Room does not exists');
    // }
    // if (room?.status === 'booked') {
    //   throw new AppError(httpStatus.BAD_REQUEST, 'Room is already booked');
    // }
    // if (room?.status === 'maintenance') {
    //   throw new AppError(httpStatus.BAD_REQUEST, 'Room is under maintenance');
    // }

    // payment gateway integration
    const transactionId = `TXN-${generateTransactionId(8)}`;
    const paymentInfo = {
      transactionId,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: payload.phone,
      amount: payload.amount,
      CustomerAddress: payload.address,
    };

    const payment = await initiatePayment(paymentInfo);
    if (payment) {

      await session.commitTransaction();
      session.endSession();
      return payment;
    }
  } catch {
    console.log('error');
  }
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('room user');
  return result;
};

const getUserBookingsFromDB = async (payload: JwtPayload) => {
  const user = await User.findOne({ email: payload?.email });

  const result = await Booking.find({ user: user?._id }).populate('room user');
  return result;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
};
