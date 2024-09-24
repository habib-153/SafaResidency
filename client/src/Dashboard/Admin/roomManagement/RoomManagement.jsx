


import Loading from "../../../Components/ui/Loading";
import { useGetAllRoomQuery } from "../../../redux/features/room/roomApi";
import Pagination from "../../../Shared/Pagination";
import "../../../Shared/style.css";
import RoomModal from "../../../Components/Accommodation/Room/RoomModal";


const RoomManagement = () => {


    // const { status, searchTerm, categories, sort } = useSelector((state) => state.filter);
    const { data, isLoading } = useGetAllRoomQuery({
        undefined
    });
console.log(data);

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

    if (isLoading) return <Loading />
    return (
        <>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
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
                                    <div className="relative mx-auto">
                                        <input
                                            type="search"
                                            name="search"
                                            placeholder="Search room names..."
                                            className="w-32 py-2 pl-10 text-sm  border border-primary rounded-md sm:w-auto focus:outline-none text-black bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-violet-600"
                                        />
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <button
                                                type="submit"
                                                title="search"
                                                className="p-1  focus:outline-none focus:ring"
                                            >
                                                <svg
                                                    fill="currentColor"
                                                    viewBox="0 0 512 512"
                                                    className="w-4 h-4 dark:text-gray-800 text-primary"
                                                >
                                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                                </svg>
                                            </button>
                                        </span>
                                    </div>
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
                                            Id
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
                                <tbody>
                                    {data?.data?.map((room) => {
                                        return (
                                            <tr
                                                key={room._id}
                                                className="border border-gold text-black"
                                            >
                                                <td className="px-5 py-3">{room.room_overview.room_number
}</td>
                                                <td className="px-5 py-3">{room.room_overview.name}</td>
                                                <td className="px-5 py-3">
                                                    {room._id}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="text-center w-full mx-auto">
                                                        <RoomModal id={room._id} />
                                                    </div>
                                                    
                                                </td>
                                                <td className="px-5 py-3">
                                                    <button className="">
                                                        Update
                                                    </button>
                                                </td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pagination numbersOfPage={data?.meta?.totalPage} />
                </div>
            </div>
        </>
    );
};

export default RoomManagement;

