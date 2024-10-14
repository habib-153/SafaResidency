"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
exports.userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: { values: user_constant_1.Role, message: '{VALUE} is not supported' }, default: 'user' },
    phone: { type: String },
    address: { type: String },
    status: { type: String, enum: { values: user_constant_1.USER_Status }, default: 'BASIC' }
}, {
    timestamps: true
});
exports.User = (0, mongoose_1.model)('User', exports.userSchema);
