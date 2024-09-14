import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../Pages/Error";
import Home from "../Components/Home/Home";
import Login from "../UserManagement/LogIn";

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
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signUp",
    element: 'register'
  },
]);

export default router;
