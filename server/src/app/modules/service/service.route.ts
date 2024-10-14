import express from 'express';
import auth from '../../middlewares/auth';
import { ServiceControllers } from './service.controller';

const router = express.Router();

router.post('/', auth('user', 'admin', 'staff'), ServiceControllers.createService)
router.get('/', auth('staff', 'admin'), ServiceControllers.getAllService)
router.patch('/:id', auth('user', 'admin', 'staff'), ServiceControllers.updateService)
router.delete('/:id', auth('user', 'admin', 'staff'), ServiceControllers.deleteService)

export const ServiceRoutes = router;