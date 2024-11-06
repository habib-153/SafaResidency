"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const room_route_1 = require("../modules/room/room.route");
const booking_route_1 = require("../modules/booking/booking.route");
const payment_route_1 = require("../modules/payment/payment.route");
const service_route_1 = require("../modules/service/service.route");
const blog_route_1 = require("../modules/blog/blog.route");
const gellary_route_1 = require("../modules/gellary/gellary.route");
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
        path: '/payments',
        route: payment_route_1.PaymentRoutes
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
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
