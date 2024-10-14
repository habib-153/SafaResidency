"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const auth = (...userRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
            if (!token) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
            const { email, role } = decoded;
            const user = yield user_model_1.User.findOne({ email, role });
            if (!user) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
            }
            if (!(userRoles === null || userRoles === void 0 ? void 0 : userRoles.includes(role))) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            (0, sendResponse_1.default)(res, {
                success: false,
                statusCode: http_status_1.default.UNAUTHORIZED,
                message: 'You are not authorized!',
                data: '',
            });
        }
    }));
};
exports.default = auth;
