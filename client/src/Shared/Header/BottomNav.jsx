import { Button, Drawer, Typography } from "@material-tailwind/react";
import { FaX, FaBars } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import NavbarProfile from "../NavbarProfile";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";
import { RiUserSharedFill } from "react-icons/ri";
import LanguageToggle from "./LanguageToggle";

const BottomNav = () => {
  const [openNav, setOpenNav] = useState(false);
  const user = useSelector(currentUser);

  const list = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: " Accommodation",
      path: "/accommodation",
    },
    // {
    //   name: "Dining",
    //   path: "/dining",
    // },
    {
      name: "Gallery",
      path: "/gallery",
    },
    {
      name: "Meetings & Events",
      path: "/events",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Our City",
      path: "/our-city",
    },
    {
      name: "Membership Benefits",
      path: "/membership-benefits",
    },
  ];

  const navList = (
    <ul className="mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 md:flex-row lg:items-center lg:text-lg  lg:gap-6 3xl:gap-9 font-semibold z-10 bg-white ">
      {list.map((l) => {
        return (
          <Typography
            key={l.name}
            as="li"
            variant="small"
            color="black"
            className="p-1 font-normal"
          >
            <NavLink
              to={l.path}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "3xl:text-2xl p-2 underline font-bold text-gold"
                  : "text-black hover:text-gold transition-colors duration-500 3xl:text-2xl"
              }
            >
              {l.name}
            </NavLink>
          </Typography>
        );
      })}
    </ul>
  );

  return (
    <nav className=" bg-white shadow-md py-2 mx-auto z-50 items-center">
      <div className="max-w-[1536px] px-3 mx-auto flex justify-between items-center">
        <ul className="font-bold hidden md:flex gap-8 font-open-sans">
          {navList}
        </ul>
        <div className="md:hidden">
          <Link to="/" className="z-50 logo-box">
            <img
              loading="lazy"
              src="safa-logo.png"
              className="w-32 2xl:h-24 h-14"
              alt="safa logo"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="md:flex hidden items-center  gap-2">
            <LanguageToggle />
          </div>
          {user ? (
            <NavbarProfile></NavbarProfile>
          ) : (
            <div className="flex items-center gap-x-1">
              <Link to={"/login"}>
                <Button
                  variant="outlined"
                  className={`flex items-center justify-center text-gold w-full px-3 py-1.5 font-semibold rounded-md text-lg`}
                >
                  <RiUserSharedFill />
                </Button>
              </Link>
            </div>
          )}
          <FaBars
            onClick={() => setOpenNav(true)}
            className="block md:hidden text-lg"
          />
        </div>
      </div>

      <Drawer
        placement="right"
        open={openNav}
        onClose={() => setOpenNav(false)}
        className="p-4 fixed"
      >
        <div className=" bg-white overflow-auto h-screen mx-auto z-50 items-center">
          <div className="flex bg-white justify-between items-center">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center w-3/5 sm:w-1/3 z-50 logo-box gap-2 pt-2"
              >
                <span className="text-3xl font-bold ">Safa</span>
                <span className="text-3xl font-bold ">Residency</span>
              </Link>
            </div>
            <FaX onClick={() => setOpenNav(false)} className="text-lg" />
          </div>
          <ul className="flex  flex-col gap-2 font-bold  font-open-sans py-2">
            {navList}
          </ul>
          <div className="my-2 flex items-center  gap-2">
            <LanguageToggle />
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default BottomNav;
