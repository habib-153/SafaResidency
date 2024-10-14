"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', booking_controller_1.BookingController.createBooking);
router.get('/', (0, auth_1.default)('admin', 'staff'), booking_controller_1.BookingController.getAllBookings);
router.get('/my-bookings', (0, auth_1.default)('user', 'staff', 'admin'), booking_controller_1.BookingController.getMyBookings);
exports.BookingRoutes = router;
