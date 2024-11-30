import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { RoomRoutes } from "../modules/room/room.route"
import { BookingRoutes } from "../modules/booking/booking.route"
import { ServiceRoutes } from "../modules/service/service.route"
import { BlogRoutes } from "../modules/blog/blog.route"
import { GalleryRoutes } from "../modules/gellary/gellary.route"
import { CouponRoutes } from "../modules/coupon/coupon.route"
import { EventRoutes } from "../modules/event/event.route"

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
    },
    {
        path: '/events',
        route: EventRoutes
    },
    {
        path: '/services',
        route: ServiceRoutes
    },
    {
        path: '/blogs',
        route: BlogRoutes
    },
    {
        path: '/gallery',
        route: GalleryRoutes
    },
    {
        path: "/coupons",
        route: CouponRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path , route.route))

export default router
