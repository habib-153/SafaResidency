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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const room_model_1 = require("./room.model");
const createRoomIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existingRoom = yield room_model_1.Room.findOne({ 'room_overview.room_number': payload.room_overview.room_number });
    if (existingRoom) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Room with number ${(_a = payload === null || payload === void 0 ? void 0 : payload.room_overview) === null || _a === void 0 ? void 0 : _a.room_number} already exists.`);
    }
    const result = yield room_model_1.Room.create(payload);
    return result;
});
const getAllRoomFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['room_overview.room_number', 'category', 'room_overview.name'];
    let filterConditions = {};
    // Add guest capacity filtering
    //console.log(query)
    if (query.guests) {
        const guests = JSON.parse(query.guests);
        filterConditions = Object.assign(Object.assign({}, filterConditions), { 'beds_and_bedding.maximum_adults': { $gte: Number(guests.adults) || 1 }, 'beds_and_bedding.maximum_children': { $gte: Number(guests.children) || 0 } });
    }
    const roomQuery = new QueryBuilder_1.default(room_model_1.Room.find(filterConditions), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate();
    const result = yield roomQuery.modelQuery;
    const meta = yield roomQuery.countTotal();
    return { data: result, meta };
});
const getSingleRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findById(id);
    return result;
});
const updateRoomIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { room_overview, beds_and_bedding, room_features, bath_and_bathroom_features, furniture_and_furnishings, food_and_beverages, internet_and_phones, entertainment, accessible_room_features, special_benefits, images } = payload, remainingRoomData = __rest(payload, ["room_overview", "beds_and_bedding", "room_features", "bath_and_bathroom_features", "furniture_and_furnishings", "food_and_beverages", "internet_and_phones", "entertainment", "accessible_room_features", "special_benefits", "images"]);
    const modifiedUpdateData = Object.assign({}, remainingRoomData);
    const nestedFields = [
        'room_overview',
        'beds_and_bedding',
        'room_features',
        'bath_and_bathroom_features',
        'furniture_and_furnishings',
        'food_and_beverages',
        'internet_and_phones',
        'entertainment',
        'accessible_room_features',
    ];
    nestedFields.forEach((field) => {
        const data = payload[field];
        if (data && typeof data === 'object' && Object.keys(data).length) {
            for (const [key, value] of Object.entries(data)) {
                modifiedUpdateData[`${field}.${key}`] = value;
            }
        }
    });
    // Handle special_benefits array
    if (special_benefits !== undefined) {
        modifiedUpdateData['special_benefits'] = special_benefits;
    }
    // Handle images array
    if (images !== undefined) {
        modifiedUpdateData['images'] = images;
    }
    const result = yield room_model_1.Room.findByIdAndUpdate(id, modifiedUpdateData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findByIdAndDelete(id, { isDeleted: true });
    return result;
});
exports.RoomService = {
    createRoomIntoDB,
    getAllRoomFromDB,
    getSingleRoomFromDB,
    updateRoomIntoDB,
    deleteRoomFromDB,
};
