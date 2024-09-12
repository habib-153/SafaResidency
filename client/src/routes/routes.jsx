import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    //errorElement: <ErrorPage />,
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
