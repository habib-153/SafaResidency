/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Room } from '../room/room.model';
import QueryBuilder from '../../builder/QueryBuilder';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { EmailHelper } from '../../utils/emailSend';
import { getDatesInRange } from '../../utils/getDateInRange';
import { User } from '../user/user.model';
import { Coupon } from '../coupon/coupon.model';

dayjs.extend(customParseFormat);

const createBookingIntoDB = async (payload: TBooking) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const room = await Room.findById(payload.room).session(session);
    if (!room) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room does not exist');
    }

    const user = await User.findOne({ email: payload?.user?.email})
    if (user) {
      await User.findOneAndUpdate({email: payload?.user?.email}, { points : user.points as number + (payload.amount * 1)})
      // user.points += (payload.amount * 1);
    }

    const couponCode = payload?.coupon
    if (couponCode) {
      const coupon = await Coupon.findById(couponCode)
      if(coupon){
        coupon.usedCount = (coupon.usedCount || 0) + 1;
      await coupon.save();
      }
    }
    // Convert dates from DD-MM-YYYY to YYYY-MM-DD
    const startDate = dayjs(payload.startDate, 'DD-MM-YYYY').format(
      'YYYY-MM-DD',
    );
    const endDate = dayjs(payload.endDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

    // Check if the room is available for the given dates
    const isRoomAvailable = room.bookedDates.every(
      (date) => date < startDate || date > endDate,
    );

    if (!isRoomAvailable) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Room is not available for the selected dates',
      );
    }

    // payment gateway integration
    const transactionId = `COD-${Date.now()}`;

    const booking = new Booking({
      ...payload,
      startDate,
      endDate,
      transactionId,
      paymentStatus: 'Pending',
    });
    await booking.save({ session });

    // Update the room's booked dates
    // room.bookedDates.push(...getDatesInRange(startDate, endDate));
    room.status = 'in a queue';

    const emailData = {
      name: payload?.user?.name,
      id: transactionId,
      startDate,
      endDate,
      room: room?.room_overview?.room_number, // Assuming room has a name property
      amount: payload.amount,
      paymentStatus: booking.paymentStatus,
      transactionId: booking.transactionId,
    };

    // const emailTemplate = await EmailHelper.createEmailContent(emailData, 'confirmation');
    await EmailHelper.sendEmail(
      payload?.user?.email as string,
      emailData,
      'Booking Confirmation - Safa Residency',
    );

    await EmailHelper.sendEmailToAdmin(
      'info@safaresidency.com',
      emailData,
      'Confirm New Booking - Safa Residency',
    );

    await room.save({ session });

    await session.commitTransaction();
    session.endSession();

    const result = await Booking.findById(booking._id).populate('room');

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = [
    'room.room_overview.room_number',
    'user.email',
    'user.name',
    'user.phone',
    'user.address',
    'room.room_overview.name',
    'startDate',
    'endDate',
    'transactionId',
  ];

  const bookings = new QueryBuilder(Booking.find().populate('room'), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();

  const result = await bookings.modelQuery;
  const meta = await bookings.countTotal();

  return { data: result, meta };
};

const getUserBookingsFromDB = async (
  user: JwtPayload,
  query: Record<string, unknown>,
) => {
  const searchableFields = [
    'user.email',
    'user.name',
    'user.phone',
    'user.address',
    'room.room_overview.name',
    'room.room_overview.room_number',
    'startDate',
    'endDate',
    'transactionId',
  ];

  const bookings = new QueryBuilder(
    Booking.find({ 'user.email': user?.email }).populate('room'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();

  const result = await bookings.modelQuery;
  const meta = await bookings.countTotal();

  return { data: result, meta };
};

const updateBookingStatusInDB = async (id: string, payload: Partial<TBooking>) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    const room = await Room.findById(booking.room);
    if (!room) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room does not exist');
    }

    await Booking.findByIdAndUpdate(id, payload);
    const startDate = booking.startDate;
    const endDate = booking.endDate;

    const dates = getDatesInRange(startDate, endDate);

    const newDates = dates.filter(date => !room.bookedDates.includes(date));

    // Push only the new dates to the bookedDates array
    if (newDates.length > 0) {
      room.bookedDates.push(...newDates);
      room.status = 'available'

    }

    const emailData = {
      name: booking?.user?.name,
      id: booking.transactionId,
      startDate,
      endDate,
      room: room?.room_overview?.room_number, // Assuming room has a name property
      amount: booking.amount,
      paymentStatus: payload?.paymentStatus === 'Paid' ?  'Paid' : booking.paymentStatus,
      transactionId: booking.transactionId,
      confirmation: 'Confirmed',
    };

    // const emailTemplate = await EmailHelper.createEmailContent(emailData, 'confirmation');
    await EmailHelper.sendEmail(
      booking?.user?.email as string,
      emailData,
      'Booking Confirmation - Safa Residency',
    );

    await room.save({ session });

    await session.commitTransaction();
    session.endSession();

    const result = await Booking.findById(booking._id).populate('room');

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const deleteBookingFromDB = async (id: string) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new Error('Booking not found');
  }

  const dates = getDatesInRange(booking.startDate as string, booking.endDate as string);

  const room = await Room.findById(booking.room);
  if (!room) {
    throw new Error('Room not found');
  }

  room.bookedDates = room.bookedDates.filter(date => !dates.includes(date));

  await room.save();

  // Delete the booking
  const result = await Booking.findByIdAndDelete(id);
  return result;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  updateBookingStatusInDB,
  deleteBookingFromDB,
};
