import { Types } from "mongoose"
import { TUser } from "../user/user.interface"

export type TBooking = {
    room: Types.ObjectId
    user?: TUser
    startDate: Date
    endDate: Date
    amount: number
    transactionId: string
    address: string
    phone: string
    paymentStatus: string
    isConfirmed: boolean
    isDeleted: boolean
}
