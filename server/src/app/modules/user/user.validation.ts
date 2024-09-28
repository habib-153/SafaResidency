import { z } from "zod";
import { Role } from "./user.constant";

const createUserValidationSchema = z.object({
    body: z.object({
        email: z.string({required_error: 'email is required'}).email(),
        name: z.string({required_error: 'name is required'}),
        image: z.string().optional(),
        role: z.enum([...Role] as [string, ...string[]]).optional(),
        phone: z.string().optional()
    })
})

export const UserValidation = {
    createUserValidationSchema
}