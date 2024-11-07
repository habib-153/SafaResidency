import { Coupon } from './coupon.model';
import { ICoupon } from './coupon.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCoupon = async (payload: ICoupon) => {
  const newCoupon = await Coupon.create(payload);
  return newCoupon;
};

const getAllCoupons = async () => {
  const coupons = await Coupon.find();
  return coupons;
};

const getCouponByCode = async (code: string) => {
  const coupon = await Coupon.findOne({ code, isActive: true});

  if (!coupon) {
    throw new AppError(httpStatus.NOT_FOUND, 'Coupon not found or expired');
  }

  if(coupon?.expirationDate && coupon.expirationDate < new Date()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Coupon expired');
  }

  if (coupon.usageLimit && (coupon.usedCount ?? 0) >= coupon.usageLimit) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Coupon usage limit exceeded');
  }

  return coupon;
};

const deleteCoupon = async (id: string) => {
  const result = await Coupon.findByIdAndDelete(id);
  return result;
};

export const CouponService = {
  createCoupon,
  getAllCoupons,
  getCouponByCode,
  deleteCoupon,
};