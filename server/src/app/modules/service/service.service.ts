import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import { TService } from './service.interface';
import { Service } from './service.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Booking } from '../booking/booking.model';

const createServiceIntoDB = async (
  payload: Partial<TService>,
  userData: JwtPayload,
) => {
  const user = await User.findOne({ email: userData?.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const booking = await Booking.findOne({
    'user.email': user.email,
    isDeleted: false,
  }).sort({ endDate: -1 });

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'You did not book any room');
  }

  const currentDate = new Date();
  const endDate = new Date(booking.endDate);

  if (currentDate > endDate) {
    throw new AppError(
      httpStatus.BAD_REQUEST, 
      'Your booking period has expired'
    );
  }
  
  const service = {
    user: user._id,
    room: booking.room,
    service: payload.service,
    description: payload.description,
    isCompleted: false,
  };

  const result = (await Service.create(service)).populate('user room');
  return result;
};

const getAllService = async (query: Record<string, unknown>) => {
  const services = new QueryBuilder(
    Service.find().populate([{ path: 'user' }, {path: 'room'}]),
    query,
  )
    .paginate()
    .sort()
    .filter();

  const result = await services.modelQuery;
  const meta = await services.countTotal();

  return { result, meta };
};

const updateServiceIntoDB = async (payload: Partial<TService>, id: string) => {
  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await Service.findByIdAndDelete(id);
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllService,
  updateServiceIntoDB,
  deleteServiceFromDB,
};
