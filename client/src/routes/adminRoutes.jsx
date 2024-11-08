import { BsBook, BsHouseAdd, BsHouseGear } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
// import { RiReservedFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
// import { TbReportAnalytics } from "react-icons/tb";
import RoomManagement from "../Dashboard/Admin/roomManagement/RoomManagement";
import AddRoom from "../Dashboard/Admin/AddRoom/AddRoom";
import Users from "../Dashboard/Admin/userManagement/Users";
import AdminDashboard from "../Dashboard/Admin/AdminDashboard";
import AddBlog from "../Dashboard/Admin/Blog/AddBlog";
import {  RiCouponLine, RiGalleryUploadFill, RiReservedFill } from "react-icons/ri";
import Reservation from "../Dashboard/Staff/Reservation/Reservation";
import GalleryManagement from "../Dashboard/Admin/galleryManagement/GalleryManagement";
import DiscountManagement from "../Dashboard/Admin/discountManagement/DiscountManagement";


export const adminPaths = [
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
    element: <Reservation />,
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
        <BsHouseAdd className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">Add Room</span>
      </div>
    ),
    path: "add-room",
    element: <AddRoom />,
  },
  {
    label: (
      <div className="flex items-center w-full">
        <BsBook className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">
          Add Blog
        </span>
      </div>
    ),
    path: "add-blog",
    element: <AddBlog />,
  },
  {
    label: (
      <div className="flex items-center w-full">
        <RiGalleryUploadFill className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">
          Manage Gallery
        </span>
      </div>
    ),
    path: "manage-gallery",
    element: <GalleryManagement />,
  },
  {
    label: (
      <div className="flex items-center w-full">
        < RiCouponLine className="w-5 h-5" />
        <span className="ml-4 font-medium rounded-lg">
          Manage Coupon
        </span>
      </div>
    ),
    path: "manage-discount",
    element: <DiscountManagement />,
  },
];
