"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Room' },
    service: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
}, { timestamps: true });
exports.Service = (0, mongoose_1.model)('Service', serviceSchema);
