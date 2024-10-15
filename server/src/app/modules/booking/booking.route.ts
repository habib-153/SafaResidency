import express from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post( '/', BookingController.createBooking,);

router.get('/', auth('admin', 'staff'), BookingController.getAllBookings)

router.get('/my-bookings', auth('user', 'staff', 'admin'), BookingController.getMyBookings)

router.patch('/:id', auth('admin', 'staff'), BookingController.updateBookingStatus)

router.delete('/:id', auth('admin', 'staff'), BookingController.deleteBooking)

export const BookingRoutes = router;