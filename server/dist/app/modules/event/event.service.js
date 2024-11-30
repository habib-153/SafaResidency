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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventServices = void 0;
const event_model_1 = require("./event.model");
const createEventIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.Event.create(payload);
    return result;
});
const getAllEventsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.Event.find().sort({ date: 1 });
    return result;
});
const getSingleEventFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.Event.findById(id);
    return result;
});
const updateEventInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.Event.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteEventFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.Event.findByIdAndDelete(id);
    return result;
});
exports.EventServices = {
    createEventIntoDB,
    getAllEventsFromDB,
    getSingleEventFromDB,
    updateEventInDB,
    deleteEventFromDB,
};
