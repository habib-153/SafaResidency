import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../Pages/Error";
import Home from "../Components/Home/Home";
import Login from "../UserManagement/LogIn";
import SignUp from "../UserManagement/SignUp";
import Accommodation from "../Components/Accommodation/Accommodation";
import Gallery from "../Components/Gallery/Gallery";
import Event from "../Components/Events/Event";
import Rates from "../Components/Rates/Rates";
import Dashboard from "../Components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoutes";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./adminRoutes";
import { userPaths } from "./userRoutes";
import { staffPaths } from "./staffRoutes";
import Profile from "../Dashboard/Profile/Profile";
import Booking from "../Components/Accommodation/Booking/Booking";
import UserBooking from "../Components/Accommodation/Booking/UserBooking";
import Dining from "../Components/Dining/Dining";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home></Home>, 
      },
      {
        path: "/accommodation",
        element: <Accommodation />
      },
      {
        path: "/accommodation/rates",
        element: <Rates />
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
        path: "/dining",
        element: <Dining />
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
        path: "/booking/:id",
        element: <UserBooking />
        
      },
      // {
      //   path: "/booking/:id",
      //   element: <ProtectedRoute role='user'><UserBooking /></ProtectedRoute>
        
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <SignUp/>
  },
  {
    path: '/admin',
    element: <ProtectedRoute role='admin'><Dashboard /></ProtectedRoute>,
    children: routeGenerator(adminPaths),
  },
  {
    path: '/user',
    element: <ProtectedRoute role='user'><Dashboard /></ProtectedRoute>,
    children: routeGenerator(userPaths),
  },
  {
    path: '/staff',
    element: <ProtectedRoute role='staff'><Dashboard /></ProtectedRoute>,
    children: routeGenerator(staffPaths),
  },
]);

export default router;
