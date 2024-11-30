import { TEvent } from './event.interface';
import { Event } from './event.model';

const createEventIntoDB = async (payload: TEvent) => {
  const result = await Event.create(payload);
  return result;
};

const getAllEventsFromDB = async () => {
  const result = await Event.find().sort({ date: 1 });
  return result;
};

const getSingleEventFromDB = async (id: string) => {
  const result = await Event.findById(id);
  return result;
};

const updateEventInDB = async (id: string, payload: Partial<TEvent>) => {
  const result = await Event.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteEventFromDB = async (id: string) => {
  const result = await Event.findByIdAndDelete(id);
  return result;
};

export const EventServices = {
  createEventIntoDB,
  getAllEventsFromDB,
  getSingleEventFromDB,
  updateEventInDB,
  deleteEventFromDB,
};