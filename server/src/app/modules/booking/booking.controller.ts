/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const result = await BookingService.getAllBookingsFromDB(req.query)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'All bookings retrieved successfully',
        data: result.data,
        meta: result.meta
    })
})

const getMyBookings = catchAsync(async (req, res) => {
    const result = await BookingService.getUserBookingsFromDB(req.user as JwtPayload, req.query)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'My bookings retrieved successfully',
        data: result.data,
        meta: result.meta
    })
})

const updateBookingStatus = catchAsync(async (req, res) => {

    const result = await BookingService.updateBookingStatusInDB(req.params.id, req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Booking status updated successfully',
        data: result
    })
})

const deleteBooking = catchAsync(async (req, res) => {
    const result = await BookingService.deleteBookingFromDB(req.params.id)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Booking deleted successfully',
        data: null
    })
})

export const BookingController = {
    createBooking,
    getAllBookings,
    getMyBookings,
    updateBookingStatus,
    deleteBooking
}