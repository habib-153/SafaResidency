"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const event_controller_1 = require("./event.controller");
const router = express_1.default.Router();
// Public route for creating event booking
router.post('/', event_controller_1.EventControllers.createEvent);
// Protected routes for admin
router.get('/', (0, auth_1.default)('admin'), event_controller_1.EventControllers.getAllEvents);
router.get('/:id', (0, auth_1.default)('admin'), event_controller_1.EventControllers.getSingleEvent);
router.put('/:id', (0, auth_1.default)('admin'), event_controller_1.EventControllers.updateEvent);
router.delete('/:id', (0, auth_1.default)('admin'), event_controller_1.EventControllers.deleteEvent);
exports.EventRoutes = router;
