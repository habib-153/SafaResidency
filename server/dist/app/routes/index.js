"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const room_route_1 = require("../modules/room/room.route");
const booking_route_1 = require("../modules/booking/booking.route");
const service_route_1 = require("../modules/service/service.route");
const blog_route_1 = require("../modules/blog/blog.route");
const gellary_route_1 = require("../modules/gellary/gellary.route");
const coupon_route_1 = require("../modules/coupon/coupon.route");
const event_route_1 = require("../modules/event/event.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/',
        route: auth_route_1.AuthRoutes
    },
    {
        path: '/room',
        route: room_route_1.RoomRoutes
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes
    },
    {
        path: '/events',
        route: event_route_1.EventRoutes
    },
    {
        path: '/services',
        route: service_route_1.ServiceRoutes
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes
    },
    {
        path: '/gallery',
        route: gellary_route_1.GalleryRoutes
    },
    {
        path: "/coupons",
        route: coupon_route_1.CouponRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
