import QueryBuilder from '../../builder/QueryBuilder';
import { TService } from './service.interface';
import { Service } from './service.model';

const createServiceIntoDB = async (comment: Partial<TService>) => {
  const result = (await Service.create(comment)).populate('user room');

  return result;
};

const getAllService = async (
  query: Record<string, unknown>,
) => {
  const services = new QueryBuilder(
    Service.find().populate([
      { path: 'user' },
      { path: 'room' },
    ]),
    query,
  )
    .paginate()
    .sort()
    .filter();

  const result = await services.modelQuery;
  const meta = services.countTotal();

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
