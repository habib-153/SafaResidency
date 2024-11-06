import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { CouponService } from './coupon.service';

const createCoupon = catchAsync(async (req, res) => {
  const result = await CouponService.createCoupon(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Coupon Created Successfully',
    data: result,
  });
});

const getAllCoupons = catchAsync(async (req, res) => {
  const result = await CouponService.getAllCoupons();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupons Retrieved Successfully',
    data: result,
  });
});

const getCouponByCode = catchAsync(async (req, res) => {
  const { code } = req.params;
  const result = await CouponService.getCouponByCode(code);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Coupon Not Found or Expired',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon Retrieved Successfully',
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CouponService.deleteCoupon(id);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Coupon Not Found',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon Deleted Successfully',
    data: null,
  });
});

export const CouponController = {
  createCoupon,
  getAllCoupons,
  getCouponByCode,
  deleteCoupon,
};