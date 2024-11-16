import { Button, Drawer, Typography } from "@material-tailwind/react";
import { FaX, FaBars } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import NavbarProfile from "../NavbarProfile";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";
import { FiUser } from "react-icons/fi";
import LanguageToggle from "./LanguageToggle";
import { Dropdown, Menu } from "antd";

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
      submenu: [
        { name: "Classroom Setup", path: "/events#classroom" },
        { name: "U-Shape Layout", path: "/events#u-shape" },
        { name: "I-Shape Layout", path: "/events#i-shape" },
        { name: "Theater Style", path: "/events#theater" },
      ],
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
    <ul className="mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:text-lg  lg:gap-6 font-semibold z-10 bg-white ">
      {list.map((l) => {
        return (
          <div key={l.name} className="relative group">
            <Typography
              as="li"
              variant="small"
              color="black"
              className="p-1 font-normal"
            >
              {l.submenu ? (
                <Dropdown
                  overlay={
                    <Menu>
                      {l.submenu.map((subItem) => (
                        <Menu.Item key={subItem.name}>
                          <Link
                            to={subItem.path}
                            className="text-black hover:text-gold transition-colors duration-500"
                          >
                            {subItem.name}
                          </Link>
                        </Menu.Item>
                      ))}
                    </Menu>
                  }
                  placement="bottom"
                  trigger={["hover"]}
                >
                  <span className="cursor-pointer text-black hover:text-gold transition-colors duration-500 flex items-center gap-1">
                    {l.name}
                  </span>
                </Dropdown>
              ) : (
                <NavLink
                  to={l.path}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "p-2 underline font-bold text-gold"
                      : "text-black hover:text-gold transition-colors duration-500"
                  }
                >
                  {l.name}
                </NavLink>
              )}
            </Typography>
          </div>
        );
      })}
    </ul>
  );

  return (
    <nav className="bg-white w-full py-2 mx-auto z-50 items-center">
      <div className="max-w-[1536px]  px-3 mx-auto flex justify-between items-center">
        <FaBars
          onClick={() => setOpenNav(true)}
          className="block lg:hidden text-lg "
        />

        <ul className="font-bold hidden lg:flex gap-8 font-open-sans">
          {navList}
        </ul>
        <div className="md:hidden">
          <Link to="/">
            <h2 className="font-bold text-xl bg-gradient-to-r from-[#AE8626] via-[#e4dd7d] to-[#D2AC47] text-transparent bg-clip-text">
              Safa Residency
            </h2>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="lg:flex hidden items-center  gap-2">
            <LanguageToggle />
          </div>
          {user ? (
            <NavbarProfile></NavbarProfile>
          ) : (
            <div className="hidden lg:flex items-center gap-x-1">
              <Link to={"/login"}>
                <Button
                  variant="outlined"
                  className={`flex items-center gap-1 normal-case justify-center text-[16px] w-full px-3 py-1.5 rounded-md border-none `}
                >
                  <FiUser /> Login
                </Button>
              </Link>
            </div>
          )}
          <div className="lg:hidden text-center justify-end">
            <Link to={"/view-rates"}>
              <button className="px-3 border-gold py-2 border rounded-lg hover:shadow-lg">
                Reserve
              </button>
            </Link>
          </div>
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
          <div className="my-2 flex items-center justify-between  gap-2">
            <LanguageToggle />
            <div className="">
              <Link to={"/login"}>
                <Button
                  variant="outlined"
                  className={`flex items-center gap-1 normal-case justify-center text-[16px] w-full px-3 py-1 rounded-md `}
                >
                  <FiUser /> Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default BottomNav;
