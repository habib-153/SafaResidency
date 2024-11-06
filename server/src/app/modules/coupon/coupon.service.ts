import { Coupon } from './coupon.model';
import { ICoupon } from './coupon.interface';

const createCoupon = async (payload: ICoupon) => {
  const newCoupon = await Coupon.create(payload);
  return newCoupon;
};

const getAllCoupons = async () => {
  const coupons = await Coupon.find();
  return coupons;
};

const getCouponByCode = async (code: string) => {
  const coupon = await Coupon.findOne({ code, isActive: true, expirationDate: { $gte: new Date() } });
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