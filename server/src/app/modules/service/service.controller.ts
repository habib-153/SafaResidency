import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { ServiceServices } from './service.service';
import { JwtPayload } from 'jsonwebtoken';

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createServiceIntoDB(req.body, req.user as JwtPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service Posted successfully',
    data: result,
  });
});

const getAllService = catchAsync(async (req, res) => {
  //const userId = req.params.id;
  const result = await ServiceServices.getAllService(req.query);

  if (result === null) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ServiceServices.updateServiceIntoDB(req.body, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ServiceServices.deleteServiceFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service Deleted Successfully',
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getAllService,
  updateService,
  deleteService,
};
