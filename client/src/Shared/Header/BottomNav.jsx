import { Button, Drawer } from "@material-tailwind/react";
import { FaX, FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavbarProfile from "../NavbarProfile";

const BottomNav = () => {
    const [openNav, setOpenNav] = useState(false);

    const navLinks = <>
        <Link to='/' className="text-secondary-blue">Home</Link>
        <Link to='/appointment' className="text-secondary-blue">Appointment</Link>
        {/* {
            isAdmin ?
                <Link to='/dashboard' className="text-secondary-blue">Dashboard</Link>
                : isDoctor ? <Link to='/dashboard/doctorDashboard' className="text-secondary-blue">Dashboard</Link> :
                    user && <Link to='/dashboard/user' className="text-secondary-blue">Dashboard</Link>
        } */}
        {/* {user && <Link to='/dashboard' className="text-secondary-blue">Dashboard</Link>} */}
        <Link to='/tips' className="text-secondary-blue">Tips</Link>
        <Link to='/doctors' className="text-secondary-blue">Doctors</Link>
        <Link to='/services' className="text-secondary-blue">Services</Link>
        <Link to='/aboutUs' className="text-secondary-blue">About</Link>
        <Link to='/team' className="text-secondary-blue">Team</Link>
        <Link to='/contact' className="text-secondary-blue">Contact US</Link>
    </>

    // const authLinks = <>
    //     <div className="flex flex-wrap gap-5">
    //         <Link to='/register' >
    //             <Button className="bg-secondary-blue text-sm normal-case">Registrater</Button>
    //         </Link>
    //         <Link to='/login' className="text-secondary-blue">
    //             <Button className="border-secondary-blue text-sm border py-[10px] bg-transparent text-secondary-blue" >Login</Button>
    //         </Link>
    //     </div>
    // </>

    // const userLinks = <>
    //     <div className="flex items-center justify-center">
    //         <div className='relative group flex-col'>
    //             <p className='mx-2 right-16 absolute group-hover:visible invisible text-black'>{user?.displayName}</p>
    //             <div>
    //                 <img className="w-10 h-10 rounded-full border-2 border-white hidden md:block mx-2" src={user?.photoURL} />
    //             </div>
    //         </div>
    //         <button className='btn' onClick={handleLogout}>Logout</button>
    //     </div>
    // </>



    return (
        <nav className=" bg-white shadow-md py-2 mx-auto z-50 items-center">
            <div className="max-w-[1536px] px-4 mx-auto flex justify-between items-center">
                <ul className="font-bold hidden xl:flex gap-8 font-open-sans">
                    {navLinks}
                </ul>
                <div className="md:hidden">
                <Link
                            to="/"
                            className="flex items-center w-3/5 sm:w-1/3 z-50 logo-box gap-2 py-6"
                        >
                            <img loading="lazy" className="w-16" src='safa-logo.png' alt="VirtualDoc Logo" />
                            <span className="text-3xl font-bold text-secondary-blue">
                                Virtual
                            </span>
                            <span className="text-3xl font-bold text-primary-teal">
                                Doc
                            </span>
                        </Link>
                </div>

                <FaBars
                    onClick={() => setOpenNav(true)}
                    className="block xl:hidden text-lg"
                />
                {/* logout added */}
                <div className="md:flex items-center hidden ">
                    <div className="float-right ">
                        <NavbarProfile />
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
              className="flex items-center w-3/5 sm:w-1/3 z-50 logo-box gap-2 py-6"
            >
              <img
                loading="lazy"
                className="w-16"
                src='safa-logo.png'
                alt="VirtualDoc Logo"
              />
              <span className="text-3xl font-bold text-secondary-blue">
                Virtual
              </span>
              <span className="text-3xl font-bold text-primary-teal">Doc</span>
            </Link>
                        </div>
                        <FaX onClick={() => setOpenNav(false)} className="text-lg" />
                    </div>

                    <ul className="flex  flex-col gap-2 font-bold text-secondary-blue font-open-sans py-3">
                        {navLinks}
                        <NavbarProfile />
                    </ul>
                </div>
            </Drawer>
        </nav>
    );
};

export default BottomNav;