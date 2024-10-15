"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatesInRange = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const getDatesInRange = (startDate, endDate) => {
    let start = (0, dayjs_1.default)(startDate, 'YYYY-MM-DD');
    const end = (0, dayjs_1.default)(endDate, 'YYYY-MM-DD');
    const dates = [];
    while (start.isBefore(end) || start.isSame(end, 'day')) {
        dates.push(start.format('YYYY-MM-DD'));
        start = start.add(1, 'day');
    }
    return dates;
};
exports.getDatesInRange = getDatesInRange;
