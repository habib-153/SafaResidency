"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const service_controller_1 = require("./service.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user', 'admin', 'staff'), service_controller_1.ServiceControllers.createService);
router.get('/', (0, auth_1.default)('staff', 'admin'), service_controller_1.ServiceControllers.getAllService);
router.patch('/:id', (0, auth_1.default)('user', 'admin', 'staff'), service_controller_1.ServiceControllers.updateService);
router.delete('/:id', (0, auth_1.default)('user', 'admin', 'staff'), service_controller_1.ServiceControllers.deleteService);
exports.ServiceRoutes = router;
