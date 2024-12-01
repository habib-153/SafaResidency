import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoutes";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./adminRoutes";
import { userPaths } from "./userRoutes";
import { staffPaths } from "./staffRoutes";

import {
  Error,
  Home,
  Login,
  SignUp,
  Accommodation,
  Gallery,
  Event,
  Profile,
  Booking,
  ViewRates,
  MobileBookingNav,
  ContactForm,
  Blog,
  MembershipBenefits,
  TermsAndConditions
} from './LazyComponents';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/accommodation",
        element: <Accommodation />
      },
      {
        path: "/gallery",
        element: <Gallery />
      },
      {
        path: "/events",
        element: <Event />
      },
      {
        path: "/view-rates",
        element: <ViewRates />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "guest/booking/:id",
        element: <ProtectedRoute role='staff'><Booking /></ProtectedRoute>
      },
      {
        path: "booking/:id",
        element: <Booking />
      },
      {
        path: "/booking",
        element: <MobileBookingNav />
      },
      {
        path: "/contact",
        element: <ContactForm />
      },
      {
        path: "/our-city",
        element: <Blog />
      },
      {
        path: "/membership-benefits",
        element: <MembershipBenefits />
      },
      {
        path: "/terms",
        element: <TermsAndConditions />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: '/admin',
    element: <ProtectedRoute role='admin'><Dashboard /></ProtectedRoute>,
    children: routeGenerator(adminPaths)
  },
  {
    path: '/user',
    element: <ProtectedRoute role='user'><Dashboard /></ProtectedRoute>,
    children: routeGenerator(userPaths)
  },
  {
    path: '/staff',
    element: <ProtectedRoute role='staff'><Dashboard /></ProtectedRoute>,
    children: routeGenerator(staffPaths)
  }
]);

export default router;