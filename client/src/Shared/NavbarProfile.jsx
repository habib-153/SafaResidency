import { useState } from "react";

import { Button, Tooltip } from "@material-tailwind/react";

import { FaRegCircleUser } from "react-icons/fa6";

import { GrLogout } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, isLoading, logoutUser } from "../redux/features/auth/authSlice";

const NavbarProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(currentUser);
  const loading = useSelector(isLoading);
  const dispatch = useDispatch();

    const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!loading)
    return (
      <div className=" relative items-center ">
        <div className="flex justify-end items-center">
          <Tooltip content={`${user.name}`}>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-12 h-12 rounded-full bg-primary border border-primary dark:bg-gray-500 p-1 `}
            >
              {user?.image ? (
                <img
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  src={user.image}
                  alt="profile"
                  height="48"
                  width="48"
                />
              ) : (
                <FaRegCircleUser className="text-5xl -mt-[5.5px] -ml-[5px]" />
              )}
            </Button>
          </Tooltip>
        </div>

        {isOpen && (
          <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 drop">
            <a
              href="#"
              className="flex items-center p-2 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {user?.image ? (
                <img
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  src={user.image}
                  alt="profile"
                  height="48"
                  width="48"
                />
              ) : (
                <FaRegCircleUser className="text-5xl -mt-[5.5px] -ml-[5px]" />
              )}
              <div className="mx-1">
                <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {user.name}{" "}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}{" "}
                </p>
              </div>
            </a>

            <hr className="border-gray-200 dark:border-gray-700 " />
            <Link
              to={"/dashboard"}
              className="block px-4 py-3 text-sm text-gray-800 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Dashboard
            </Link>
            <hr className="border-gray-200 dark:border-gray-700 " />

            <a
              href="#"
              className="block px-4 py-3 text-sm text-gray-800 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Help
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-800 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <GrLogout className="w-5 h-5" />
              <span className="mx-2 font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    );
};

export default NavbarProfile;
