import { Types } from "mongoose"
import { TUser } from "../user/user.interface"

export type TBooking = {
    room: Types.ObjectId
    user?: TUser
    startDate: string
    endDate: string
    amount: number
    transactionId: string
    address: string
    phone: string
    paymentStatus: string
    isConfirmed: boolean
    isDeleted: boolean
}
