import { RxDashboard } from "react-icons/rx";
import {FaUserPlus } from "react-icons/fa6"
import { VscRequestChanges } from "react-icons/vsc"
import { SiStatuspage } from "react-icons/si";
import { TbReportAnalytics } from "react-icons/tb";
import { RiReservedFill } from "react-icons/ri";
import StaffDashboard from "../Dashboard/Staff/StaffDashboard";
import Booking from "../Components/Accommodation/Booking/Booking";

export const staffPaths = [
    {
      label: (
        <div className="flex items-center w-full">
          <RxDashboard className="w-5 h-5" />
          <span className="ml-4 font-medium rounded-lg">Dashboard</span>
        </div>
      ),
      path: "dashboard",
      element: <StaffDashboard />,
    },
    {
      label: (
        <div className="flex items-center w-full">
          <FaUserPlus className="w-5 h-5" />
          <span className="ml-4 font-medium rounded-lg">Guest User</span>
        </div>
      ),
       
        path: "booking/:id",
        element: <Booking />
        
     
    },
    {
      label: (
        <div className="flex items-center w-full">
          <VscRequestChanges className="w-5 h-5" />
          <span className="ml-4 font-medium rounded-lg">Service Requests</span>
        </div>
      ),
      path: "user-request",
      element: "f",
    },
    {
      label: (
        <div className="flex items-center w-full">
          <RiReservedFill className="w-5 h-5" />
          <span className="ml-4 font-medium rounded-lg">Reservation Management</span>
        </div>
      ),
      path: "reservation",
      element: "f",
    },
    {
      label: (
        <div className="flex items-center w-full">
          <SiStatuspage className="w-5 h-5" />
          <span className="ml-4 font-medium rounded-lg">Housekeeping and Maintenance</span>
        </div>
      ),
      path: "housekeeping",
      element: "f",
    },
    {
      label: (
        <div className="flex items-center w-full">
          <TbReportAnalytics className="w-5 h-5" />
          <span className="ml-4 font-medium rounded-lg">Report and Analytics</span>
        </div>
      ),
      path: "report",
      element: "f",
    },
    {
      label: (
        <div className="flex items-center w-full">
          <TbReportAnalytics className="w-5 h-5" />
          <span className="ml-4 font-medium rounded-lg">Report and Analytics</span>
        </div>
      ),
      path: "report",
      element: "f",
    },
  ];
  