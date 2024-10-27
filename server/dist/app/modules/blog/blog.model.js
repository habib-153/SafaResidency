"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    category: { type: [String], required: true },
}, {
    timestamps: true,
});
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
