import express from 'express';
import { AuthController } from './auth.controller';
import { UserValidation } from '../user/user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/auth', validateRequest(UserValidation.createUserValidationSchema), AuthController.getToken)

router.get('/users', AuthController.getAllUser)
router.get('/admin', auth('admin', 'staff'), AuthController.getAdminStats)
router.get('/users/:email', auth('user', 'admin', 'staff'), AuthController.getUserByEmail)
router.put('/users/:id', auth('admin'), AuthController.updateUser)
router.delete('/users/:id', auth('admin'), AuthController.deleteUser)

export const AuthRoutes = router;