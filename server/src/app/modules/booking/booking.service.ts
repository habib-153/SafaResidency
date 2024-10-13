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

dayjs.extend(customParseFormat);

// const getDatesInRange = (startDate: string, endDate: string): string[] => {
//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   const dates = [];

//   while (start <= end) {
//     dates.push(start.toISOString().split('T')[0]);
//     start.setDate(start.getDate() + 1);
//   }

//   return dates;
// };


// const createBookingIntoDB = async (payload: TBooking) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const room = await Room.findById(payload.room);
//     if (!room) {
//       throw new AppError(httpStatus.NOT_FOUND, 'Room does not exist');
//     }

//     // if (room?.status !== 'in a queue' && room?.status !== 'available') {
//     //   throw new AppError(
//     //     httpStatus.BAD_REQUEST,
//     //     'Room is not available right now',
//     //   );
//     // }

//     // Convert dates from DD-MM-YYYY to YYYY-MM-DD
//     console.log(payload.startDate, payload.endDate);
//     const startDate = dayjs(payload.startDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
//     const endDate = dayjs(payload.endDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
//     console.log(startDate, endDate);

//     // Check if the room is available for the given dates
//     const isRoomAvailable = room.bookedDates.every(
//       (date) => date < startDate || date > endDate
//     );

//     // Check if the room is available for the given dates
//     // const isRoomAvailable = room.bookedDates.every(
//     //   (date) => date < startDate || date > endDate
//     // );

//     // if (!isRoomAvailable) {
//     //   throw new AppError(httpStatus.BAD_REQUEST, 'Room is not available for the selected dates');
//     // }

//     // // payment gateway integration
//     // const transactionId = `COD-${Date.now()}`;

//     // const booking = new Booking({
//     //   ...payload,
//     //   startDate,
//     //   endDate,
//     //   transactionId,
//     //   paymentStatus: 'Pending',
//     // });
//     // await booking.save({ session });

//     // // Update the room's booked dates
//     // room.bookedDates.push(...getDatesInRange(startDate, endDate));
//     // room.status = 'in a queue';
//     // await room.save({ session });

//     // await session.commitTransaction();
//     // session.endSession();

//     // const result = await Booking.findById(booking._id).populate('room');
//     const result = '';
//     return result;
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     throw error;
//   }
// };


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
    const room = await Room.findById(payload.room);
    if (!room) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room does not exist');
    }

    const startDate = dayjs(payload.startDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

    const endDate = dayjs(payload.endDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

    // Check if the room is available for the given dates
    const bookedDates = getDatesInRange(payload.startDate, payload.endDate);
    const isRoomAvailable = room.bookedDates.every(
      (date) => !bookedDates.includes(dayjs(date).format('YYYY-MM-DD'))
    );

    if (!isRoomAvailable) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Room is not available for the selected dates');
    }

    // // payment gateway integration
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
    room.bookedDates.push(...bookedDates);
    room.status = 'in a queue';
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
