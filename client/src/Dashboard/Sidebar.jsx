import { useState } from "react";
import { GrLogout } from "react-icons/gr";
// import { CgProfile } from "react-icons/cg";
// import MenuItem from "./MenuItem.jsx/MenuItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, useCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken.js";
import { adminPaths } from "../routes/adminRoutes.jsx";
import { userPaths } from "../routes/userRoutes.jsx";
import { staffPaths } from "../routes/staffRoutes.jsx";
import { SidebarItemsGenerator } from "../utils/SidebarItemGenerator.jsx";

const userRole = {
  ADMIN: "admin",
  User: "user",
  Staff: "staff",
};

const Sidebar = () => {
  const [isActive, setActive] = useState(true);
  const token = useSelector(useCurrentToken);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  let user;
  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = SidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.User:
      sidebarItems = SidebarItemsGenerator(userPaths, userRole.User);
      break;
    case userRole.Staff:
      sidebarItems = SidebarItemsGenerator(staffPaths, userRole.Staff);
      break;

    default:
      break;
  }

  const handleToggle = () => {
    setActive(!isActive);
    //console.log("clicked", isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-[#333333] text-[#F5F5F5] flex justify-end lg:hidden">
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-primary focus:text-white text-primary"
        >
          {!isActive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6 relative "
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 relative"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 lg:fixed flex flex-col justify-between overflow-x-hidden bg-[#2C2C2C]  text-black w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  lg:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center  mx-auto">
              <Link to="/">
                <div className="flex gap-1">
                  {/* <img src="/logo.jpeg" alt="" className="w-6 h-6" /> */}
                  <h3 className="text-white font-bold text-xl">
                    {" "}
                    Safa Residency{" "}
                  </h3>
                </div>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 rounded mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {sidebarItems?.map((item) => (
                <div
                  key={item.key}
                  className=" duration-300 transform 3xl:text-2xl"
                >
                  {item.label}
                </div>
              ))}
            </nav>
          </div>
        </div>
        <div>
          <hr />

          {/* Profile Menu */}
          {/* <MenuItem
            label="Profile"
            address="/profile"
            icon={CgProfile}
          /> */}

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 bg-primary text-white hover:bg-[#B17E32]  hover:text-black transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
