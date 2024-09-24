import { RxDashboard } from "react-icons/rx";
import { FaHouseUser } from "react-icons/fa6";
import { VscRequestChanges } from "react-icons/vsc";
import UserDashboard from "../Dashboard/User/UserDashboard";

export const userPaths = [
  {
    label: (
      <div className="flex items-center w-full">
        <RxDashboard className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">Dashboard</span>
      </div>
    ),
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    label: (
      <div className="flex items-center w-full">
        <FaHouseUser className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">My Bookings</span>
      </div>
    ),
    path: "my-bookings",
    element: "hello my bookings",
  },
  {
    label: (
      <div className="flex items-center w-full">
        <VscRequestChanges className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">Service Requests</span>
      </div>
    ),
    path: "my-request",
    element: "f",
  },
];
