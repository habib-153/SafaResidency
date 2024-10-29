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
exports.AuthService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const config_1 = __importDefault(require("../../config"));
const booking_model_1 = require("../booking/booking.model");
const room_model_1 = require("../room/room.model");
const service_model_1 = require("../service/service.model");
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        const lastUser = yield user_model_1.User.findOne().sort({ membershipNumber: -1 });
        // Generate the next membership number
        let nextMembershipNumber = 'SAFA000001';
        if (lastUser && lastUser.membershipNumber) {
            const lastNumber = parseInt(lastUser.membershipNumber.replace('SAFA', ''), 10);
            nextMembershipNumber = `SAFA${String(lastNumber + 1).padStart(6, '0')}`;
        }
        // Create the new user with the generated membership number
        const newUser = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { membershipNumber: nextMembershipNumber }));
        const jwtPayload = {
            email: newUser.email,
            role: newUser.role,
        };
        const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, {
            expiresIn: config_1.default.jwt_expires_in,
        });
        return { token, user: newUser };
    }
    else {
        const jwtPayload = {
            email: user.email,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, {
            expiresIn: config_1.default.jwt_expires_in,
        });
        return { token, user };
    }
});
const getAllUserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['name', 'email', 'role'];
    const users = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate();
    const result = yield users.modelQuery;
    const meta = yield users.countTotal();
    return { result, meta };
});
const getUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email: email });
    return result;
});
const updateUserIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
const adminStats = () => __awaiter(void 0, void 0, void 0, function* () {
    // Total income from bookings
    const totalIncomeResult = yield booking_model_1.Booking.aggregate([
        {
            $group: {
                _id: null,
                totalIncome: { $sum: "$amount" }
            }
        }
    ]);
    const totalIncome = totalIncomeResult.length > 0 ? totalIncomeResult[0].totalIncome : 0;
    // Total number of users
    const totalUsers = yield user_model_1.User.countDocuments({ role: 'user' });
    // Total number of staff
    const totalStaffs = yield user_model_1.User.countDocuments({ role: 'staff' });
    // Total number of rooms
    const roomData = yield room_model_1.Room.aggregate([
        {
            $group: {
                _id: "$category",
                value: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                name: "$_id",
                value: 1
            }
        }
    ]);
    // Last booking details
    const lastBooking = yield booking_model_1.Booking.findOne().sort({ createdAt: -1 }).populate('room').populate('user');
    // Total number of services requested
    const totalServiceRequest = yield service_model_1.Service.countDocuments();
    // Total number of completed services
    const totalCompletedServiceRequest = yield service_model_1.Service.countDocuments({ isCompleted: true });
    // Total number of pending services
    const totalPendingServices = yield service_model_1.Service.countDocuments({ isCompleted: false });
    // Total number of bookings
    const totalBookings = yield booking_model_1.Booking.countDocuments();
    const monthlyData = yield booking_model_1.Booking.aggregate([
        {
            $group: {
                _id: { $month: "$createdAt" },
                bookings: { $sum: 1 },
                revenue: { $sum: "$amount" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
    // Calculate occupancy rate for each month
    const totalRooms = yield room_model_1.Room.countDocuments();
    const monthlyDataWithOccupancy = monthlyData.map((month) => {
        const occupancy = (month.bookings / totalRooms) * 100;
        return {
            name: new Date(0, month._id - 1).toLocaleString('default', { month: 'short' }),
            bookings: month.bookings,
            revenue: month.revenue,
            occupancy: Math.round(occupancy)
        };
    });
    const stats = {
        totalIncome,
        totalUsers,
        totalStaffs,
        roomData,
        lastBooking,
        totalServiceRequest,
        totalCompletedServiceRequest,
        totalPendingServices,
        totalBookings,
        monthlyData: monthlyDataWithOccupancy,
    };
    return stats;
});
exports.AuthService = {
    getToken,
    getAllUserFromDB,
    getUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
    adminStats
};
