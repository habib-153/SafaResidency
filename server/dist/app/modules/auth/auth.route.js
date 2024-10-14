"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const user_validation_1 = require("../user/user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/auth', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserValidationSchema), auth_controller_1.AuthController.getToken);
router.get('/users', auth_controller_1.AuthController.getAllUser);
router.get('/users/:email', (0, auth_1.default)('user', 'admin', 'staff'), auth_controller_1.AuthController.getUserByEmail);
router.put('/users/:id', (0, auth_1.default)('admin'), auth_controller_1.AuthController.updateUser);
router.delete('/users/:id', (0, auth_1.default)('admin'), auth_controller_1.AuthController.deleteUser);
exports.AuthRoutes = router;
