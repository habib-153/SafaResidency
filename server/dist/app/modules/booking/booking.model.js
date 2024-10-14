"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../user/user.model");
const bookingSchema = new mongoose_1.Schema({
    room: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Room', required: true },
    user: { type: user_model_1.userSchema },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    transactionId: { type: String },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: String },
    phone: { type: String, required: true },
    isConfirmed: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
