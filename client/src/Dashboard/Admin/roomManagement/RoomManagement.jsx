import {
  useDeleteRoomMutation,
  useGetAllRoomQuery,
  useUpdateRoomMutation,
} from "../../../redux/features/room/roomApi";
import "../../../Shared/style.css";
import RoomModal from "../../../Components/Accommodation/Room/RoomModal";
import { useSelector, useDispatch } from "react-redux";
import { Tag, Dropdown, Button, Space } from "antd";
import CPagination from "../../../Shared/Pagination";
import Search from "../../../Components/ui/Search";
import Loading from "../../../Components/ui/Loading";
import {
  setCategory,
  setStatus,
} from "../../../redux/features/filter/filterSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { UpdateRoomModal } from "./UpdateRoomModal";

export const GetStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "available":
      return "green";
    case "booked":
      return "blue";
    case "maintenance":
      return "red";
    case "cleaning":
      return "orange";
    default:
      return "gray";
  }
};

const RoomManagement = () => {
  const [roomId, setRoomId] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const dispatch = useDispatch();
  const { status, searchTerm, categories, page } = useSelector(
    (state) => state.filter
  );
  const { data, isLoading } = useGetAllRoomQuery({
    status,
    searchTerm,
    categories,
    page,
  });
  const [updateRoom] = useUpdateRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();

  const meta = data?.meta;
  console.log(meta)
  console.log(data)

  const handleMenuClick = (e) => {
    dispatch(setStatus(e.key));
  };

  const handleUpdateClick = (room) => {
    setSelectedRoom(room);
    setIsUpdateModalOpen(true);
  };

  const handleCategoryMenuClick = (e) => {
    dispatch(setCategory(e.key));
  };

  const items = [
    {
      label: "Available",
      key: "available",
    },
    {
      label: "Booked",
      key: "booked",
    },
    {
      label: "Maintenance",
      key: "maintenance",
    },
    {
      label: "Cleaning",
      key: "cleaning",
    },
    {
      label: "All",
      key: "",
    },
  ];

  const categoryItems = [
    {
      label: "All",
      key: "",
    },
    {
      label: "Executive Suite",
      key: "Executive Suite",
    },
    {
      label: "Deluxe Supreme",
      key: "Deluxe Supreme",
    },
    {
      label: "Luxury Deluxe",
      key: "Luxury Deluxe",
    },
    {
      label: "Luxury Twin",
      key: "Luxury Twin",
    },
    {
      label: "Deluxe Twin",
      key: "Deluxe Twin",
    },
    {
      label: "Standard",
      key: "Standard",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const menuPropsCategory = {
    items: categoryItems,
    onClick: handleCategoryMenuClick,
  };

  const handleUpdateStatus = async (data) => {
    const toastId = toast.loading("Please wait...");

    const id = roomId;
    const payload = {
      status: data.key,
    };

    const res = await updateRoom({ payload, id });
    // console.log(res);
    if (res?.error) {
      toast.error("something went wrong", { id: toastId });
    } else {
      toast.success("Room Status updated successfully", { id: toastId });
    }
  };

  const menuStatus = {
    items,
    onClick: handleUpdateStatus,
  };

  const handleDeleteRoom = async (id) => {
    const toastId = toast.loading("Please wait...");
    const res = await deleteRoom(id);
    // console.log(res);
    if (res?.error) {
      toast.error("something went wrong", { id: toastId, duration: 3000 });
    } else {
      toast.success("Room Deleted successfully", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold ">See all Rooms</h1>
            <p className="">See your all rooms here</p>
            <div>
              <Search searchPlaceholder="Search By Room Number & Name" />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-auto">
              <table className="min-w-full leading-normal bg-primary text-white overflow-auto">
                <thead>
                  <tr className="bg-[#333333]">
                    <th
                      scope="col"
                      className="px-5 py-3 text-white text-left text-sm uppercase font-normal"
                    >
                      Room Number
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3  text-center text-sm uppercase font-normal"
                    >
                      <Dropdown menu={menuPropsCategory} trigger={["click"]}>
                        <Button>Filter By Category</Button>
                      </Dropdown>
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3  text-center text-sm uppercase font-normal"
                    >
                      <Dropdown menu={menuProps} trigger={["click"]}>
                        <Button>Filter By Status</Button>
                      </Dropdown>
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-white text-sm uppercase font-normal"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-white text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="rounded-lg">
                  {data?.data?.map((room) => {
                    return (
                      <tr
                        key={room._id}
                        className="border border-gold rounded-lg text-black"
                      >
                        <td className="px-5 py-3">
                          {room.room_overview?.room_number}
                        </td>
                        <td className="px-5 py-3">{room?.category}</td>
                        <td className="px-5 py-3 text-center">
                          <Tag color={GetStatusColor(room?.status)}>
                            {room.status.toUpperCase()}
                          </Tag>
                        </td>
                        <td className="px- py-3">
                          <div className="text-center w-full mx-auto">
                            <RoomModal id={room?._id} />
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <Space>
                            <Dropdown menu={menuStatus} trigger={["click"]}>
                              <Button onClick={() => setRoomId(room?._id)}>
                                Update Status
                              </Button>
                            </Dropdown>
                            <Button onClick={() => handleUpdateClick(room)}>
                              Update
                            </Button>
                            <Button
                              onClick={() => handleDeleteRoom(room?._id)}
                              danger
                              type="primary"
                            >
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
          <CPagination meta={meta} />
        </div>
      </div>
      <UpdateRoomModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedRoom(null);
        }}
        roomData={selectedRoom}
      />
    </>
  );
};

export default RoomManagement;
