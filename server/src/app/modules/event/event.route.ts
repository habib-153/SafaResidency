import express from 'express';
import auth from '../../middlewares/auth';
import { EventControllers } from './event.controller';

const router = express.Router();

// Public route for creating event booking
router.post('/', EventControllers.createEvent);

// Protected routes for admin
router.get('/', auth('admin'), EventControllers.getAllEvents);
router.get('/:id', auth('admin'), EventControllers.getSingleEvent);
router.put('/:id', auth('admin'), EventControllers.updateEvent);
router.delete('/:id', auth('admin'), EventControllers.deleteEvent);

export const EventRoutes = router;