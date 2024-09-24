import { BsHouseGear } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { RiReservedFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import Users from "../Dashboard/Admin/Users/Users";
import RoomManagement from "../Dashboard/Admin/roomManagement/RoomManagement";

export const adminPaths = [
  {
    label: (
      <div className="flex items-center w-full">
        <HiUsers className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">Users</span>
      </div>
    ),
    path: "users",
    element: <Users />,
  },
  {
    label: (
      <div className="flex items-center w-full">
        <RiReservedFill className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">
          Reservation Management
        </span>
      </div>
    ),
    path: "reservation",
    element: 'f',
  },
  {
    label: (
      <div className="flex items-center w-full">
        <BsHouseGear className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">Room Management</span>
      </div>
    ),
    path: "room-management",
    element: <RoomManagement />,
  },
  {
    label: (
      <div className="flex items-center w-full">
        <TbReportAnalytics className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">
          Report and Analytics
        </span>
      </div>
    ),
    path: "see-report",
    element: "report",
  },
];
