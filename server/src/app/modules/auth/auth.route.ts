import express from 'express';
import { AuthController } from './auth.controller';
import { UserValidation } from '../user/user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/auth', validateRequest(UserValidation.createUserValidationSchema), AuthController.getToken)

router.get('/users', auth('admin'), AuthController.getAllUser)

router.get('/users/:email', auth('user', 'admin'), AuthController.getUserByEmail)
router.put('/users/:id', auth('admin', 'user'), AuthController.updateUser)

export const AuthRoutes = router;