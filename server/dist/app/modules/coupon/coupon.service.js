"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const coupon_model_1 = require("./coupon.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createCoupon = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newCoupon = yield coupon_model_1.Coupon.create(payload);
    return newCoupon;
});
const getAllCoupons = () => __awaiter(void 0, void 0, void 0, function* () {
    const coupons = yield coupon_model_1.Coupon.find();
    return coupons;
});
const getCouponByCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const coupon = yield coupon_model_1.Coupon.findOne({ code, isActive: true });
    if (!coupon) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Coupon not found or expired');
    }
    if ((coupon === null || coupon === void 0 ? void 0 : coupon.expirationDate) && coupon.expirationDate < new Date()) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Coupon expired');
    }
    if (coupon.usageLimit && ((_a = coupon.usedCount) !== null && _a !== void 0 ? _a : 0) >= coupon.usageLimit) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Coupon usage limit exceeded');
    }
    return coupon;
});
const deleteCoupon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_model_1.Coupon.findByIdAndDelete(id);
    return result;
});
exports.CouponService = {
    createCoupon,
    getAllCoupons,
    getCouponByCode,
    deleteCoupon,
};
