import express from 'express';
import auth from '../../middlewares/auth';
import { CouponController } from './coupon.controller';

const router = express.Router();

router.post('/', auth('admin', 'staff'), CouponController.createCoupon);
router.get('/', CouponController.getAllCoupons);
router.get('/:code', CouponController.getCouponByCode);
router.delete('/:id', auth('admin', 'staff'), CouponController.deleteCoupon);

export const CouponRoutes = router;