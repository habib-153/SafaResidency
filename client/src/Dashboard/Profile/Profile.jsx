


import {
    Dialog,
    DialogBody,
} from "@material-tailwind/react";

import UpdateProfile from './UpdateProfile';
import { useState } from 'react';

import { useSelector } from "react-redux";
import { currentUser, isLoading } from "../../redux/features/auth/authSlice";
import Loading from "../../Components/ui/Loading";


const Profile = () => {
     const handleOpen = () => setOpen(!open);
    const user = useSelector(currentUser);

    const loading = useSelector(isLoading);
    const [open, setOpen] = useState(false);
    console.log(user);



    if (loading) return <Loading/>
   
    return (
        <div className='md:flex justify-center items-center h-screen'>
          
            <div className='bg-white shadow-lg rounded-2xl md:w-3/5'>
                <img
                    alt='profile'
                    src='/safa-logo.png'
                    className='w-full mb-4 rounded-t-lg h-36'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user?.image}
                            referrerPolicy='no-referrer'
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>


                    <p className='mt-2 text-xl font-medium text-wrap text-gray-800 '>
                        User Id: {user?._id}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-black '>
                                    {user?.name}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Role
                                <span className='font-bold text-black '>{user?.role}</span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-black '>{user?.email}</span>
                            </p>

                        </div>
                        <div className='mx-auto mt-4'>

                            <button className='btn block mb-1 mx-auto' onClick={handleOpen} >
                                Update Profile
                            </button>
                        </div>
                        <Dialog open={open} handler={handleOpen} className='rounded-lg'>

                            <DialogBody className='bg-[#F7F4ED]  rounded-lg'>
                                <UpdateProfile></UpdateProfile>
                            </DialogBody>

                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile