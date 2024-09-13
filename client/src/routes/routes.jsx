import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../Pages/Error";
import Home from "../Components/Home/Home";

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
    element: 'login'
  },
  {
    path: "/signUp",
    element: 'register'
  },
]);

export default router;
