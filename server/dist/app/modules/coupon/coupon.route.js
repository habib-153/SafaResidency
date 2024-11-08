"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const coupon_controller_1 = require("./coupon.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('admin', 'staff'), coupon_controller_1.CouponController.createCoupon);
router.get('/', coupon_controller_1.CouponController.getAllCoupons);
router.get('/:code', coupon_controller_1.CouponController.getCouponByCode);
router.delete('/:id', (0, auth_1.default)('admin', 'staff'), coupon_controller_1.CouponController.deleteCoupon);
exports.CouponRoutes = router;
