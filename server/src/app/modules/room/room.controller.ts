import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RoomService } from './room.service';

const createRoom = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await RoomService.createRoomIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Room is created successfully',
    data: result,
  });
});

const getSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await RoomService.getSingleRoomFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is retrieved successfully',
    data: result,
  });
});

const updateRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await RoomService.updateRoomIntoDB(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is updated successfully',
    data: result,
  });
});

const getAllRooms = catchAsync(async (req, res) => {
  const result = await RoomService.getAllRoomFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms are retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const deleteRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomService.deleteRoomFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is deleted successfully',
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
