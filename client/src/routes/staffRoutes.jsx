import { RxDashboard } from "react-icons/rx";
import { VscRequestChanges } from "react-icons/vsc";
import { SiStatuspage } from "react-icons/si";
import { RiReservedFill } from "react-icons/ri";
import AdminDashboard from "../Dashboard/Admin/AdminDashboard";
import Reservation from "../Dashboard/Staff/Reservation/Reservation";
import Requests from "../Dashboard/Staff/Requests/Requests";
import RoomManagement from "../Dashboard/Admin/roomManagement/RoomManagement";
import EventRequest from "../Dashboard/Admin/eventRequest/EventRequest";

export const staffPaths = [
  {
    label: (
      <div className="flex items-center w-full">
        <RxDashboard className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">Dashboard</span>
      </div>
    ),
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    label: (
      <div className="flex items-center w-full">
        <VscRequestChanges className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">Service Requests</span>
      </div>
    ),
    path: "user-request",
    element: <Requests />,
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
    element: <Reservation />,
  },
  {
    label: (
      <div className="flex items-center w-full">
        <RiReservedFill className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">
          Event Request
        </span>
      </div>
    ),
    path: "event-request",
    element: <EventRequest />,
  },
  {
    label: (
      <div className="flex items-center w-full">
        <SiStatuspage className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">
          Housekeeping and Maintenance
        </span>
      </div>
    ),
    path: "housekeeping",
    element: <RoomManagement />,
  },
  // {
  //   label: (
  //     <div className="flex items-center w-full">
  //       <TbReportAnalytics className="w-5 h-5" />
  //       <span className="ml-4 font-medium rounded-lg">
  //         Report and Analytics
  //       </span>
  //     </div>
  //   ),
  //   path: "report",
  //   element: "f",
  // },
];
