import { useGetAllRoomQuery } from "../../../redux/features/room/roomApi";
import "../../../Shared/style.css";
import RoomModal from "../../../Components/Accommodation/Room/RoomModal";
import { useSelector, useDispatch } from "react-redux";
import { Tag, Dropdown, Button } from "antd";
import CPagination from "../../../Shared/Pagination";
import Search from "../../../Components/ui/Search";
import Loading from "../../../Components/ui/Loading";
import { setStatus } from "../../../redux/features/filter/filterSlice";

const RoomManagement = () => {
  const dispatch = useDispatch();
  const { status, searchTerm, categories, sort, page } = useSelector(
    (state) => state.filter
  );
  const { data, isLoading } = useGetAllRoomQuery({
    status,
    searchTerm,
    categories,
    sort,
    page,
  });

  const meta = data?.meta;

  const getStatusColor = (status) => {
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

  const handleMenuClick = (e) => {
    dispatch(setStatus(e.key));
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

  const menuProps = {
    items,
    onClick: handleMenuClick,
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
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gold border-b border-gray-200 text-white text-left text-sm uppercase font-normal"
                    >
                      Room Number
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-gold border-b border-gray-200 text-white text-left text-sm uppercase font-normal"
                    >
                      Room Name
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-gold border-b border-gray-200  text-center text-sm uppercase font-normal"
                    >
                      <Dropdown menu={menuProps} trigger={["click"]}>
                        <Button>Filter By Status</Button>
                      </Dropdown>
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gold border-b border-gray-200 text-white text-left text-sm uppercase font-normal"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gold border-b border-gray-200 text-white text-left text-sm uppercase font-normal"
                    >
                      Update room
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
                          {room.room_overview.room_number}
                        </td>
                        <td className="px-5 py-3">{room.room_overview.name}</td>
                        <td className="px-5 py-3 text-center">
                          <Tag color={getStatusColor(room?.status)}>
                            {room.status.toUpperCase()}
                          </Tag>
                        </td>
                        <td className="px-5 py-3">
                          <div className="text-center w-full mx-auto">
                            <RoomModal id={room._id} />
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <button className="">Update</button>
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
    </>
  );
};

export default RoomManagement;
