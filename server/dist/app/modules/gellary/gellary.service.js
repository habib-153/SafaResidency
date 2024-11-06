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
exports.GalleryService = void 0;
const gellary_model_1 = require("./gellary.model");
const postAnImage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newImage = yield gellary_model_1.Gallery.create(payload);
    return newImage;
});
const getFullGallery = () => __awaiter(void 0, void 0, void 0, function* () {
    const gallery = yield gellary_model_1.Gallery.find();
    return gallery;
});
const deleteImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gellary_model_1.Gallery.findByIdAndDelete(id);
    return result;
});
exports.GalleryService = {
    postAnImage,
    getFullGallery,
    deleteImage,
};
