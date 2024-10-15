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
exports.ServiceServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const service_model_1 = require("./service.model");
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const room_model_1 = require("../room/room.model");
const booking_model_1 = require("../booking/booking.model");
const createServiceIntoDB = (payload, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userData === null || userData === void 0 ? void 0 : userData.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const room = yield room_model_1.Room.findOne({
        'room_overview.room_number': payload.room,
    });
    if (!room) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
    }
    const booking = yield booking_model_1.Booking.findOne({
        room: room._id,
        'user.email': user.email,
    });
    if (!booking) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'You did not book this room');
    }
    const service = {
        user: user._id,
        room: room._id,
        service: payload.service,
        description: payload.description,
        isCompleted: false,
    };
    const result = (yield service_model_1.Service.create(service)).populate('user room');
    return result;
});
const getAllService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const services = new QueryBuilder_1.default(service_model_1.Service.find().populate([{ path: 'user' }, { path: 'room' }]), query)
        .paginate()
        .sort()
        .filter();
    const result = yield services.modelQuery;
    const meta = yield services.countTotal();
    return { result, meta };
});
const updateServiceIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findByIdAndDelete(id);
    return result;
});
exports.ServiceServices = {
    createServiceIntoDB,
    getAllService,
    updateServiceIntoDB,
    deleteServiceFromDB,
};
