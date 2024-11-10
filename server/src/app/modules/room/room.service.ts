/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TRoom } from './room.interface';
import { Room } from './room.model';

const createRoomIntoDB = async (payload: TRoom) => {
  const existingRoom = await Room.findOne({ 'room_overview.room_number': payload.room_overview.room_number });
  if (existingRoom) {
    throw new AppError(httpStatus.BAD_REQUEST ,`Room with number ${payload?.room_overview?.room_number} already exists.`);
  }

  const result = await Room.create(payload);
  return result;
};

const getAllRoomFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['room_overview.room_number', 'category', 'room_overview.name'];
  
  let filterConditions: Record<string, unknown> = {};
  
  // Add guest capacity filtering
  //console.log(query)
  if (query.guests) {
    const guests = JSON.parse(query.guests as string);
      filterConditions = {
        ...filterConditions,
        'beds_and_bedding.maximum_adults': { $gte: Number(guests.adults) || 1 },
        'beds_and_bedding.maximum_children': { $gte: Number(guests.children) || 0 },
      };
  }
  const roomQuery = new QueryBuilder(Room.find(filterConditions), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();

  const result = await roomQuery.modelQuery;
  const meta = await roomQuery.countTotal();
  return { data: result, meta };
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);

  return result;
};

const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  const {
    room_overview,
    beds_and_bedding,
    room_features,
    bath_and_bathroom_features,
    furniture_and_furnishings,
    food_and_beverages,
    internet_and_phones,
    entertainment,
    accessible_room_features,
    special_benefits,
    images,
    ...remainingRoomData
  } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingRoomData,
  };

  const nestedFields = [
    'room_overview',
    'beds_and_bedding',
    'room_features',
    'bath_and_bathroom_features',
    'furniture_and_furnishings',
    'food_and_beverages',
    'internet_and_phones',
    'entertainment',
    'accessible_room_features',
  ];

  nestedFields.forEach((field) => {
    const data = payload[field as keyof TRoom];
    if (data && typeof data === 'object' && Object.keys(data).length) {
      for (const [key, value] of Object.entries(data)) {
        modifiedUpdateData[`${field}.${key}`] = value;
      }
    }
  });

  // Handle special_benefits array
  if (special_benefits !== undefined) {
    modifiedUpdateData['special_benefits'] = special_benefits;
  }

  // Handle images array
  if (images !== undefined) {
    modifiedUpdateData['images'] = images;
  }
  const result = await Room.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndDelete(
    id,
    { isDeleted: true },
  );
  return result;
};

export const RoomService = {
  createRoomIntoDB,
  getAllRoomFromDB,
  getSingleRoomFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
