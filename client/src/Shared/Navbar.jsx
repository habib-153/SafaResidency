
import React from "react";
import {
    Navbar,

    Typography,
    Button,
    IconButton,
    Collapse,

} from "@material-tailwind/react";

import { Link, NavLink } from "react-router-dom";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import NavbarProfile from "./NavbarProfile";

// import NavbarProfile from "./NavbarProfile";


export function StickyNavbar() {
    const [openNav, setOpenNav] = React.useState(false);
    const user = useSelector(selectCurrentUser)
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);
    const list = [
        {
            name: 'Home',
            path:'/'
    },
        {
            name: ' Accommodation',
            path:'/accommodation'
    },
        {
            name: 'Dining',
            path:'/dining'
    },
        {
            name: 'Gallery',
            path:'/gallery'
    },
        {
            name: 'Weddings & Meetings',
            path:'/weddings'
    },
      
]

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:text-lg  lg:gap-6 3xl:gap-9 font-semibold z-10 bg-opacity-10 ">
          
            {
                list.map(l => {
                    return (
                        <Typography
                            key={l.name}
                            as="li"
                            variant="small"
                            color="black"
                            className="p-1 font-normal"
                        >
                            <NavLink to={l.path} className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "3xl:text-2xl p-2 underline font-bold text-gold" : "text-black 3xl:text-2xl"
                            } >
                                {
                                    l.name
                                }
                            </NavLink>
                        </Typography>
                    )
                })
          }

        </ul>
    );

    return (
        <div className=" min-w-full mx-auto">
            <Navbar className="fixed py-0 bg-transparent max-w-[2560px] z-10 h-max  mx-auto rounded-none px-2 bg-opacity-40">
                <div className="flex items-center justify-between text-black">
                    {/* <Typography

                        className="mr-2 md:mr-4 cursor-pointer py-1.5 md:text-3xl text-base font-bold text-gold "
                    >
                                   

                    </Typography> */}
                    <div >
                      <img src="safa-logo.png" className="w-32 h-12" alt="company logo" />  
                    </div>

                    <div className="md:px-4  lg:px-8 lg:py-4 ">
                        <div className="flex items-center gap-4">
                            <div className="mr-4 hidden lg:block text-black">{navList}</div>
                            {
                                user ?
                                    <NavbarProfile></NavbarProfile> :
                                    <div className="flex items-center gap-x-1">



                                <Link to={'/booking'}>
                                    <Button
                                        className={`flex items-center text-primary bg-accent justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50 border text-gold`}
                                    >Book Now</Button>
                                </Link>


                            </div>}

                            <IconButton
                                variant="text"
                                className="ml-auto h-6 w-6 relative text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                {openNav ? (
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
                            </IconButton>

                        </div>

                    </div>


                </div>
                <Collapse open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">

                        <Link to={'/booking'}>
                            <Button fullWidth size="sm" className="  text-white bg-primary">
                                Book Now
                            </Button>
                        </Link>


                    </div>
                </Collapse>

            </Navbar>

        </div>
    );
}

