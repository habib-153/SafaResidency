import { useSelector } from "react-redux";
import DPagination from "../../../Shared/Pagination";
import "../../../Shared/style.css";
import {
    useGetAllUsersQuery,

} from "../../../redux/features/auth/authApi";
import Search from "../../../Components/ui/Search";
import Loading from "../../../Components/ui/Loading";
import { Button, Dropdown, Space } from "antd";
import { useState } from "react";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
const Housekeeping = () => {
    const { page, searchTerm } = useSelector((state) => state.filter);
    const [roomId, setRoomId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isLoading } = useGetAllUsersQuery([
        {
            name: "page",
            value: page,
        },
        { name: "searchTerm", value: searchTerm },
    ]);
  

    const handleUpdateRole = async () => {
        

     
    };

    const items = [
        {
            label: "Admin",
            key: "admin",
        },
        {
            label: "User",
            key: "user",
        },
        {
            label: "Staff",
            key: "staff",
        },
    ];

    const menuProps = {
        items,
        onClick: handleUpdateRole,
    };

    //etar json rakha nai database e rekhe dish




    if (isLoading) return <Loading />;
    return (
        <>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold ">See all Rooms</h1>
                        <p className="">See your all rooms here</p>
                        <div>
                            <Search searchPlaceholder="Search User" />
                        </div>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-auto">
                            <table className="min-w-full leading-normal bg-primary text-white overflow-auto">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                                        >
                                            Room Number
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                                        >
                                            Room Id
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                                        >
                                            Room Status
                                        </th>


                                        
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-gold border-b text-center border-gray-200 text-white  text-sm uppercase font-normal"
                                        >
                                            Requested on
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data?.map((user) => {
                                        return (
                                            <tr
                                                key={user._id}
                                                className="border border-gold text-black"
                                            >
                                                <td className="px-5 py-3">{user?.name}</td>
                                                <td className="px-5 py-3">{user?.email}</td>
                                                <td className="px-5 py-3">{user?.role}</td>
                                             
                                                <td className="px-5 py-1 text-center">
                                                    <Space>
                                                        <Dropdown menu={menuProps} trigger={["click"]}>
                                                            <Button onClick={() => setRoomId(user?._id)}>
                                                                Update
                                                            </Button>
                                                        </Dropdown>
                                                        <Button danger type="primary">
                                                            Delete
                                                        </Button>
                                                    </Space>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <DPagination meta={data?.meta} />
                </div>
                <Dialog
                    open={isModalOpen}
                    handler={() => setIsModalOpen(false)}
                    className="bg-[#F7F4ED] text-black"
                >
                    <DialogHeader className="text-gold">Confirm Guest Booking</DialogHeader>
                    <DialogBody divider className="grid gap-4">
                        <p><span className="font-bold">Guest:</span>


                        </p>
                        <p><span className="font-bold">Email:</span>


                        </p>
                        <p><span className="font-bold">Room Category:</span>

                        </p>
                        <p><span className="font-bold">Room Name:</span>

                        </p>
                        <p><span className="font-bold"> Room Number: </span> {data?.data?.room_overview?.room_number
                        }</p>
                        <p><span className="font-bold">Check-in:</span>
                        </p>
                        <p><span className="font-bold">Check-out:</span>
                        </p>
                        <p><span className="font-bold">Total Price:</span> $
                        </p>
                    </DialogBody>
                    <DialogFooter className="space-x-4">
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => setIsModalOpen(false)}
                            className="mr-1"
                        >
                            Cancel
                        </Button>

                    </DialogFooter>
                </Dialog>
            </div>
        </>
    );
};

export default Housekeeping;
