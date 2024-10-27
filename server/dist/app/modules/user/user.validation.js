"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'email is required' }).email(),
        name: zod_1.z.string({ required_error: 'name is required' }),
        membershipNumber: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        role: zod_1.z.enum([...user_constant_1.Role]).optional(),
        phone: zod_1.z.string().optional()
    })
});
exports.UserValidation = {
    createUserValidationSchema
};
