import express from 'express';
import auth from '../../middlewares/auth';
import { BookingController } from './booking.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post('/',
    // auth('user'), 
// validateRequest(BookingValidation.createBookingValidationSchema),
 BookingController.createBooking)

// router.get('/bookings', auth('admin'), BookingController.getAllBookings)

// router.get('/my-bookings', auth('user'), BookingController.getUserBookings)

export const BookingRoutes = router;