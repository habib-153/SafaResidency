import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { RoomRoutes } from "../modules/room/room.route"
import { BookingRoutes } from "../modules/booking/booking.route"


const router = Router()

const moduleRoutes = [
    {
        path: '/',
        route: AuthRoutes 
    },
    {
        path: '/room',
        route: RoomRoutes
    },
    {
        path: '/bookings',
        route: BookingRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path , route.route))

export default router
