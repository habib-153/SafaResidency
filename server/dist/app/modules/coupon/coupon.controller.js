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
exports.CouponController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const coupon_service_1 = require("./coupon.service");
const createCoupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_service_1.CouponService.createCoupon(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Coupon Created Successfully',
        data: result,
    });
}));
const getAllCoupons = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_service_1.CouponService.getAllCoupons();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Coupons Retrieved Successfully',
        data: result,
    });
}));
const getCouponByCode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const result = yield coupon_service_1.CouponService.getCouponByCode(code);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'Coupon Not Found or Expired',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Coupon Retrieved Successfully',
        data: result,
    });
}));
const deleteCoupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield coupon_service_1.CouponService.deleteCoupon(id);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'Coupon Not Found',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Coupon Deleted Successfully',
        data: null,
    });
}));
exports.CouponController = {
    createCoupon,
    getAllCoupons,
    getCouponByCode,
    deleteCoupon,
};
