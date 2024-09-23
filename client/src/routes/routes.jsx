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
import Users from "../Dashboard/Admin/Users/Users"
import Dashboard from "../Components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoutes";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./adminRoutes";
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
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    errorElement: <Error />,
    children: [
      {
        path: '/dashboard/users',
        element: <Users/>
      }
    ]
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
]);

export default router;
