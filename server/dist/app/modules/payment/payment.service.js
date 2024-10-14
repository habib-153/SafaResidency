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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const path_1 = require("path");
const booking_model_1 = require("../booking/booking.model");
const fs_1 = require("fs");
const payment_1 = require("../../utils/payment");
const room_model_1 = require("../room/room.model");
const confirmationService = (data, status) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    let message = '';
    if (status === 'success') {
        const verifyResponse = yield (0, payment_1.verifyPayment)(data === null || data === void 0 ? void 0 : data.val_id);
        if (verifyResponse && verifyResponse.statusText === 'OK') {
            const booking = yield booking_model_1.Booking.findOne({ transactionId: data === null || data === void 0 ? void 0 : data.tran_id });
            if (booking) {
                const room = yield room_model_1.Room.findByIdAndUpdate(booking.room, {
                    status: 'booked',
                });
                result = yield booking_model_1.Booking.updateOne({ _id: booking._id }, {
                    $set: {
                        paymentStatus: 'Paid',
                        isConfirmed: true,
                    },
                }, { new: true });
            }
            message = 'Successfully Paid!';
        }
        else {
            message = 'Payment Verification Failed!';
        }
    }
    if (status === 'failed') {
        message = 'Payment Failed!';
    }
    const filePath = (0, path_1.join)(__dirname, '../../../../confirmation.html');
    let template = (0, fs_1.readFileSync)(filePath, 'utf-8');
    template = template.replace('{{message}}', message);
    return template;
});
exports.paymentServices = {
    confirmationService,
};
