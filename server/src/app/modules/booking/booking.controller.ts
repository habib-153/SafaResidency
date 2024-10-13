import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req, res) => {
    const result = await BookingService.createBookingIntoDB(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Booking successful',
        data: result
    })
})

const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingService.getAllBookingsFromDB()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'All bookings retrieved successfully',
        data: result
    })
})

const getMyBookings = catchAsync(async (req, res) => {
    const result = await BookingService.getUserBookingsFromDB(req.user as JwtPayload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'My bookings retrieved successfully',
        data: result
    })
})

export const BookingController = {
    createBooking,
    getAllBookings,
    getMyBookings
}