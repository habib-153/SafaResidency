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
exports.AuthService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        const lastUser = yield user_model_1.User.findOne().sort({ membershipNumber: -1 });
        // Generate the next membership number
        let nextMembershipNumber = 'SAFA000001';
        if (lastUser && lastUser.membershipNumber) {
            const lastNumber = parseInt(lastUser.membershipNumber.replace('SAFA', ''), 10);
            nextMembershipNumber = `SAFA${String(lastNumber + 1).padStart(6, '0')}`;
        }
        // Create the new user with the generated membership number
        const newUser = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { membershipNumber: nextMembershipNumber }));
        const jwtPayload = {
            email: newUser.email,
            role: newUser.role,
        };
        const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, {
            expiresIn: config_1.default.jwt_expires_in,
        });
        return { token, user: newUser };
    }
    else {
        const jwtPayload = {
            email: user.email,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, {
            expiresIn: config_1.default.jwt_expires_in,
        });
        return { token, user };
    }
});
const getAllUserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['name', 'email', 'role'];
    const users = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate();
    const result = yield users.modelQuery;
    const meta = yield users.countTotal();
    return { result, meta };
});
const getUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email: email });
    return result;
});
const updateUserIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
exports.AuthService = {
    getToken,
    getAllUserFromDB,
    getUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB
};
