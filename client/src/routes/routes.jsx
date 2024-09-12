import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../Pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: 'hello',
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
