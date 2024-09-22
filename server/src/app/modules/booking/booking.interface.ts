import { Types } from "mongoose"

export type TBooking = {
    room: Types.ObjectId
    user: Types.ObjectId
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
