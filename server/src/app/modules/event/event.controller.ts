/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { EventServices } from './event.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createEvent = catchAsync(async (req, res) => {
  const result = await EventServices.createEventIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event Booking Created Successfully',
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res) => {
  const result = await EventServices.getAllEventsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Events Retrieved Successfully',
    data: result,
  });
});

const getSingleEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EventServices.getSingleEventFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event Retrieved Successfully',
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EventServices.updateEventInDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event Updated Successfully',
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EventServices.deleteEventFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Event Deleted Successfully',
    data: null,
  });
});

export const EventControllers = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};