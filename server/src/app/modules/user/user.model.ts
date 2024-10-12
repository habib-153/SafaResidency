import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { Role, USER_Status } from "./user.constant";

const userSchema = new Schema<TUser>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: { values: Role, message: '{VALUE} is not supported' }, default: 'user' },
    phone: { type: String },
    address: { type: String },
    status: { type: String, enum: {values: USER_Status}, default: 'BASIC' }
},
{
    timestamps: true
})

export const User = model<TUser>('User', userSchema);