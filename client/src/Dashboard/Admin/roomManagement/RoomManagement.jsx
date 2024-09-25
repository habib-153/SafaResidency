import Loading from "../../../Components/ui/Loading";
import { useGetAllRoomQuery } from "../../../redux/features/room/roomApi";
import "../../../Shared/style.css";
import RoomModal from "../../../Components/Accommodation/Room/RoomModal";
import { useSelector } from "react-redux";
import { Tag } from "antd";
import CPagination from "../../../Shared/Pagination";
import Search from "../../../Components/ui/Search";

const RoomManagement = () => {
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
  const handleFilter = (e) => {
    e.preventDefault();
    const filter = e.target.search.value;
    if (!filter) {
      // setError('Please enter a search term');
      return;
    }
    // setFilter(filter)
    // refetch()
  };

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

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold ">See all Rooms</h1>
            <p className="">See your all rooms here</p>
            <div className="md:flex gap-4 mx-auto w-full justify-center  text-center">
              <div className="text-center md:mr-20  ">
                <form
                  className="w-32 space-y-1 dark:text-gray-800 mx-auto"
                  onSubmit={handleFilter}
                >
                  <label htmlFor="Search" className="hidden">
                    Search
                  </label>
                  <Search />
                  {/* {error && <p className='text-red-700 w-full'>Error: {error}</p>} */}
                </form>
              </div>
              <div>
                {/* <Menu>
                                    <MenuHandler>
                                        <Button className="bg-primary  text-white w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200">{sort ? `${sort}` : 'Sort'}</Button>
                                    </MenuHandler>
                                    <MenuList className="bg-primary bg-opacity-45">
                                        <MenuItem value={'healthcareProfessional'}
                                            onClick={() => { setSort('healthcareProfessional'), refetch() }} className="bg-primary bg-opacity-55 text-white" >Healthcare Professional Name</MenuItem>
                                        <MenuItem value={'dateTime'}
                                            className="bg-primary bg-opacity-55 text-white" onClick={() => { setSort('dateTime'), refetch() }}
                                        > Date</MenuItem>
                                        <MenuItem value={'roomName'}
                                            className="bg-primary bg-opacity-55 text-white"
                                            onClick={() => { setSort('roomName'), refetch() }}>room Name</MenuItem>
                                    </MenuList>
                                </Menu> */}
              </div>
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
                      Room Name
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
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
                        <td className="px-5 py-3">
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
