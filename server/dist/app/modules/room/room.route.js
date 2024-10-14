"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoutes = void 0;
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("./room.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-room', (0, auth_1.default)('admin', 'staff'), room_controller_1.RoomControllers.createRoom);
router.get('/:id', room_controller_1.RoomControllers.getSingleRoom);
router.get('/', room_controller_1.RoomControllers.getAllRooms);
router.patch('/:id', (0, auth_1.default)('admin', 'staff'), room_controller_1.RoomControllers.updateRoom);
router.delete('/:id', (0, auth_1.default)('admin', 'staff'), room_controller_1.RoomControllers.deleteRoom);
exports.RoomRoutes = router;
