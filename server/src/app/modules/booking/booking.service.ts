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

dayjs.extend(customParseFormat);

const getDatesInRange = (startDate: string, endDate: string): string[] => {
  let start = dayjs(startDate, 'DD-MM-YYYY');
  const end = dayjs(endDate, 'DD-MM-YYYY');
  const dates = [];
  
  while (start.isBefore(end) || start.isSame(end, 'day')) {
    dates.push(start.format('YYYY-MM-DD'));
    start = start.add(1, 'day');
  }
  
  return dates;
};

const createBookingIntoDB = async (payload: TBooking) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const room = await Room.findById(payload.room).session(session);
    if (!room) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room does not exist');
    }

    // Convert dates from DD-MM-YYYY to YYYY-MM-DD
    const startDate = dayjs(payload.startDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const endDate = dayjs(payload.endDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

    // Check if the room is available for the given dates
    const isRoomAvailable = room.bookedDates.every(
      (date) => date < startDate || date > endDate
    );

    if (!isRoomAvailable) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Room is not available for the selected dates');
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
    room.bookedDates.push(...getDatesInRange(startDate, endDate));
    room.status = 'in a queue';

    const emailData = {
      name: payload?.user?.name,
      id: transactionId,
      startDate,
      endDate,
      room: room?.room_overview?.room_number, // Assuming room has a name property
      amount: payload.amount,
      paymentStatus: booking.paymentStatus,
      transactionId: booking.transactionId
    };

    const emailTemplate = await EmailHelper.createEmailContent(emailData, 'confirmation');
    await EmailHelper.sendEmail(
      payload?.user?.email as string,
      emailTemplate,
      'Booking Confirmation - Safa Residency'
    );
    
    await room.save({ session });

    await session.commitTransaction();
    session.endSession();

    const result = await Booking.findById(booking._id).populate('room')

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  console.log('query', query);
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

export const BookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
};
