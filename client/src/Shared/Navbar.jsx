
import React from "react";
import {
    Navbar,

    Typography,
    Button,
    IconButton,
    Collapse,

} from "@material-tailwind/react";

import { Link, NavLink } from "react-router-dom";
//import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
//import NavbarProfile from "./NavbarProfile";




export function StickyNavbar() {
    const [openNav, setOpenNav] = React.useState(false);
    const user = 'user';
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
        <ul className="mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:text-lg  lg:gap-6 3xl:gap-9 font-semibold z-10 bg-white ">
          
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
                                isPending ? "pending" : isActive ? "3xl:text-2xl p-2 underline font-bold text-gold" : "text-black hover:text-gold transition-colors duration-500 3xl:text-2xl"
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
        <div className=" min-w-full mx-auto  bg-white">
            <Navbar className="fixed py-0 bg-opacity-100 bg-white max-w-[2560px] z-50 h-max  mx-auto rounded-none px-2 ">
                
                <div className="flex items-center w-full justify-between text-black max-w-screen-3xl mx-auto bg-white">
                    {/* <Typography

                        className="mr-2 md:mr-4 cursor-pointer py-1.5 md:text-3xl text-base font-bold text-gold "
                    >
                                   

                    </Typography> */}
                    <div >
                      <img src="safa-logo.png" className="w-24 md:w-44 2xl:w-52 2xl:h-24 h-20" alt="safa logo" />  
                    </div>

                    <div className="md:px-4  lg:px-8 lg:py-4 ">
                        <div className="flex items-center gap-4">
                            <div className="mr-4 hidden lg:block text-black">{navList}</div>
                            {
                                user ?
                                    //<NavbarProfile></NavbarProfile> 
                                    <p></p>
                                    :
                                    <div className="flex items-center gap-x-1">



                                <Link to={'/booking'}>
                                    <Button
                                        className={`flex items-center text-primary justify-center w-full p-3 font-semibold tracking-wide rounded-md btn `}
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
                            <Button fullWidth size="sm" className="  text-white btn">
                                Book Now
                            </Button>
                        </Link>


                    </div>
                </Collapse>

            </Navbar>

        </div>
    );
}

