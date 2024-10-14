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
exports.BookingService = void 0;
const booking_model_1 = require("./booking.model");
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const room_model_1 = require("../room/room.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
const emailSend_1 = require("../../utils/emailSend");
dayjs_1.default.extend(customParseFormat_1.default);
const getDatesInRange = (startDate, endDate) => {
    let start = (0, dayjs_1.default)(startDate, 'DD-MM-YYYY');
    const end = (0, dayjs_1.default)(endDate, 'DD-MM-YYYY');
    const dates = [];
    while (start.isBefore(end) || start.isSame(end, 'day')) {
        dates.push(start.format('YYYY-MM-DD'));
        start = start.add(1, 'day');
    }
    return dates;
};
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const room = yield room_model_1.Room.findById(payload.room).session(session);
        if (!room) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room does not exist');
        }
        // Convert dates from DD-MM-YYYY to YYYY-MM-DD
        const startDate = (0, dayjs_1.default)(payload.startDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const endDate = (0, dayjs_1.default)(payload.endDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        // Check if the room is available for the given dates
        const isRoomAvailable = room.bookedDates.every((date) => date < startDate || date > endDate);
        if (!isRoomAvailable) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Room is not available for the selected dates');
        }
        // payment gateway integration
        const transactionId = `COD-${Date.now()}`;
        const booking = new booking_model_1.Booking(Object.assign(Object.assign({}, payload), { startDate,
            endDate,
            transactionId, paymentStatus: 'Pending' }));
        yield booking.save({ session });
        // Update the room's booked dates
        room.bookedDates.push(...getDatesInRange(startDate, endDate));
        room.status = 'in a queue';
        const emailData = {
            name: (_a = payload === null || payload === void 0 ? void 0 : payload.user) === null || _a === void 0 ? void 0 : _a.name,
            id: transactionId,
            startDate,
            endDate,
            room: (_b = room === null || room === void 0 ? void 0 : room.room_overview) === null || _b === void 0 ? void 0 : _b.room_number, // Assuming room has a name property
            amount: payload.amount,
            paymentStatus: booking.paymentStatus,
            transactionId: booking.transactionId
        };
        // const emailTemplate = await EmailHelper.createEmailContent(emailData, 'confirmation');
        yield emailSend_1.EmailHelper.sendEmail((_c = payload === null || payload === void 0 ? void 0 : payload.user) === null || _c === void 0 ? void 0 : _c.email, emailData, 'Booking Confirmation - Safa Residency');
        yield room.save({ session });
        yield session.commitTransaction();
        session.endSession();
        const result = yield booking_model_1.Booking.findById(booking._id).populate('room');
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllBookingsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = [
        'room.room_overview.room_number',
        'user.email',
        'user.name',
        'user.phone',
        'user.address',
        'room.room_overview.name',
        'startDate',
        'endDate',
        'transactionId',
    ];
    const bookings = new QueryBuilder_1.default(booking_model_1.Booking.find().populate('room'), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate();
    const result = yield bookings.modelQuery;
    const meta = yield bookings.countTotal();
    return { data: result, meta };
});
const getUserBookingsFromDB = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = [
        'user.email',
        'user.name',
        'user.phone',
        'user.address',
        'room.room_overview.name',
        'room.room_overview.room_number',
        'startDate',
        'endDate',
        'transactionId',
    ];
    const bookings = new QueryBuilder_1.default(booking_model_1.Booking.find({ 'user.email': user === null || user === void 0 ? void 0 : user.email }).populate('room'), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate();
    const result = yield bookings.modelQuery;
    const meta = yield bookings.countTotal();
    return { data: result, meta };
});
exports.BookingService = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getUserBookingsFromDB,
};
