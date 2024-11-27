import { Types } from "mongoose"

export type TService ={
    room?: Types.ObjectId;
    user: Types.ObjectId;
    service: string;
    description: string;
    isCompleted: boolean;
}