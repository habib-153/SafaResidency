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
exports.verifyPayment = exports.initiatePayment = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const store_id = config_1.default.store_id;
const store_passwd = config_1.default.store_password;
const initiatePayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        store_id: store_id,
        store_passwd: store_passwd,
        total_amount: paymentData.amount,
        currency: 'BDT',
        tran_id: paymentData.transactionId, // use unique tran_id for each api call
        success_url: `http://localhost:5000/api/payments/confirmation?status=success`,
        fail_url: `http://localhost:5000/api/payments/confirmation?status=failed`,
        cancel_url: `http://localhost:5000/api/payments/confirmation?status=cancel`,
        // ipn_url: `http://localhost:5000/api/payments/ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: paymentData.customerName,
        cus_email: paymentData.customerEmail,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: paymentData.customerPhone,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const apiResponse = yield (0, axios_1.default)({
        method: 'POST',
        url: config_1.default.sslcommerz_init_payment_url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data,
    });
    return apiResponse.data.GatewayPageURL;
});
exports.initiatePayment = initiatePayment;
const verifyPayment = (valId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            val_id: valId,
            store_id: store_id,
            store_passwd: store_passwd,
        };
        const response = yield (0, axios_1.default)({
            method: 'GET',
            url: config_1.default.sslcommerz_validation_url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        });
        // console.log(response, 'response')
        return response;
    }
    catch (err) {
        throw new Error('Payment validation failed!');
    }
});
exports.verifyPayment = verifyPayment;
