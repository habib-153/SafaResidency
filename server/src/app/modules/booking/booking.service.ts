/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Room } from '../room/room.model';

const createBookingIntoDB = async (payload: TBooking) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const room = await Room.findById(payload.room);
    if (!room) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room does not exists');
    }
    if (room?.status !== 'available') {
      throw new AppError(httpStatus.BAD_REQUEST, 'Room is not available right now');
    }
    
    // payment gateway integration
    const transactionId = `COD-${Date.now()}`;
    
    const booking = new Booking({
      ...payload,
      transactionId,
      paymentStatus: 'Pending',
    });
    await booking.save({ session: session });

    const updatedRoom = await Room.findByIdAndUpdate(room._id, {
      status: 'in a queue',
    }, session)
    // const paymentInfo = {
    //   transactionId,
    //   customerName: user.name,
    //   customerEmail: user.email,
    //   customerPhone: payload.phone,
    //   amount: payload.amount,
    //   CustomerAddress: payload.address,
    // };

    // const payment = await initiatePayment(paymentInfo)

    await session.commitTransaction();
    session.endSession();

    const result = await Booking.findById(booking._id).populate('room')
 
    return result
  } catch (error){
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('room');
  return result;
};

const getUserBookingsFromDB = async (payload: JwtPayload) => {
  //const user = await User.findOne({ email: payload?.email });

  const result = await Booking.find({ 'user.email' : payload?.email }).populate('room');
  return result;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
};
