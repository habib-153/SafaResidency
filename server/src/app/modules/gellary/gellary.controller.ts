import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { GalleryService } from './gellary.service';

const postAnImage = catchAsync(async (req, res) => {
  const result = await GalleryService.postAnImage(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Image Posted Successfully',
    data: result,
  });
});

const getFullGallery = catchAsync(async (req, res) => {
  const result = await GalleryService.getFullGallery();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Gallery Retrieved Successfully',
    data: result,
  });
});

const deleteImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GalleryService.deleteImage(id);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Image Not Found',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Image Deleted Successfully',
    data: null,
  });
});

export const GalleryController = {
  postAnImage,
  getFullGallery,
  deleteImage,
};