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
const getDateInRange_1 = require("../../utils/getDateInRange");
const user_model_1 = require("../user/user.model");
const coupon_model_1 = require("../coupon/coupon.model");
dayjs_1.default.extend(customParseFormat_1.default);
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const room = yield room_model_1.Room.findById(payload.room).session(session);
        if (!room) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room does not exist');
        }
        const user = yield user_model_1.User.findOne({ email: (_a = payload === null || payload === void 0 ? void 0 : payload.user) === null || _a === void 0 ? void 0 : _a.email });
        if (user) {
            yield user_model_1.User.findOneAndUpdate({ email: (_b = payload === null || payload === void 0 ? void 0 : payload.user) === null || _b === void 0 ? void 0 : _b.email }, { points: user.points + (payload.amount * 1) });
            // user.points += (payload.amount * 1);
        }
        const couponCode = payload === null || payload === void 0 ? void 0 : payload.coupon;
        if (couponCode) {
            const coupon = yield coupon_model_1.Coupon.findById(couponCode);
            if (coupon) {
                coupon.usedCount = (coupon.usedCount || 0) + 1;
                yield coupon.save();
            }
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
        // room.bookedDates.push(...getDatesInRange(startDate, endDate));
        room.status = 'in a queue';
        const emailData = {
            name: (_c = payload === null || payload === void 0 ? void 0 : payload.user) === null || _c === void 0 ? void 0 : _c.name,
            email: (_d = payload === null || payload === void 0 ? void 0 : payload.user) === null || _d === void 0 ? void 0 : _d.email,
            phone: (_e = payload === null || payload === void 0 ? void 0 : payload.user) === null || _e === void 0 ? void 0 : _e.phone,
            address: (_f = payload === null || payload === void 0 ? void 0 : payload.user) === null || _f === void 0 ? void 0 : _f.address,
            id: transactionId,
            startDate: (0, dayjs_1.default)(startDate).format('DD-MM-YYYY'),
            endDate: (0, dayjs_1.default)(endDate).format('DD-MM-YYYY'),
            room: (_g = room === null || room === void 0 ? void 0 : room.room_overview) === null || _g === void 0 ? void 0 : _g.room_number,
            amount: payload.amount,
            orderDate: (0, dayjs_1.default)().format('DD-MM-YYYY')
        };
        // const emailTemplate = await EmailHelper.createEmailContent(emailData, 'confirmation');
        yield emailSend_1.EmailHelper.sendEmail((_h = payload === null || payload === void 0 ? void 0 : payload.user) === null || _h === void 0 ? void 0 : _h.email, emailData, 'Booking Confirmation - Safa Residency');
        // await EmailHelper.sendEmailToAdmin(
        //   'info@safaresidency.com',
        //   emailData,
        //   'Confirm New Booking - Safa Residency',
        // );
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
const updateBookingStatusInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const booking = yield booking_model_1.Booking.findById(id);
        if (!booking) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
        }
        const room = yield room_model_1.Room.findById(booking.room);
        if (!room) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room does not exist');
        }
        yield booking_model_1.Booking.findByIdAndUpdate(id, payload);
        const startDate = booking.startDate;
        const endDate = booking.endDate;
        const dates = (0, getDateInRange_1.getDatesInRange)(startDate, endDate);
        const newDates = dates.filter(date => !room.bookedDates.includes(date));
        // Push only the new dates to the bookedDates array
        if (newDates.length > 0) {
            room.bookedDates.push(...newDates);
            room.status = 'available';
        }
        const emailData = {
            name: (_j = booking === null || booking === void 0 ? void 0 : booking.user) === null || _j === void 0 ? void 0 : _j.name,
            id: booking.transactionId,
            startDate,
            endDate,
            room: (_k = room === null || room === void 0 ? void 0 : room.room_overview) === null || _k === void 0 ? void 0 : _k.room_number, // Assuming room has a name property
            amount: booking.amount,
            paymentStatus: (payload === null || payload === void 0 ? void 0 : payload.paymentStatus) === 'Paid' ? 'Paid' : booking.paymentStatus,
            transactionId: booking.transactionId,
            confirmation: 'Confirmed',
        };
        // const emailTemplate = await EmailHelper.createEmailContent(emailData, 'confirmation');
        yield emailSend_1.EmailHelper.sendEmail((_l = booking === null || booking === void 0 ? void 0 : booking.user) === null || _l === void 0 ? void 0 : _l.email, emailData, 'Booking Confirmation - Safa Residency');
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
const deleteBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findById(id);
    if (!booking) {
        throw new Error('Booking not found');
    }
    const dates = (0, getDateInRange_1.getDatesInRange)(booking.startDate, booking.endDate);
    const room = yield room_model_1.Room.findById(booking.room);
    if (!room) {
        throw new Error('Room not found');
    }
    room.bookedDates = room.bookedDates.filter(date => !dates.includes(date));
    yield room.save();
    // Delete the booking
    const result = yield booking_model_1.Booking.findByIdAndDelete(id);
    return result;
});
exports.BookingService = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getUserBookingsFromDB,
    updateBookingStatusInDB,
    deleteBookingFromDB,
};
