"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const gellary_controller_1 = require("./gellary.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('admin'), gellary_controller_1.GalleryController.postAnImage);
router.get('/', gellary_controller_1.GalleryController.getFullGallery);
router.delete('/:id', (0, auth_1.default)('admin'), gellary_controller_1.GalleryController.deleteImage);
exports.GalleryRoutes = router;
