import { useSelector } from "react-redux";
import DPagination from "../../../Shared/Pagination";
import "../../../Shared/style.css";
import { useGetAllUsersQuery } from "../../../redux/features/auth/authApi";
import Search from "../../../Components/ui/Search";

const Users = () => {
  const page = useSelector((state) => state.filter.page);
  const { data } = useGetAllUsersQuery([
    {
      name: "page",
      value: page,
    },
  ]);
  console.log(data);
  // userData r meta r moddhe TotalPage

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

  // if (isLoading) return <Loadin />
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold ">See all Users</h1>
            <p className="">See your all users here</p>
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
                                        <MenuItem value={'userName'}
                                            className="bg-primary bg-opacity-55 text-white"
                                            onClick={() => { setSort('userName'), refetch() }}>user Name</MenuItem>
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
                      User Name
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                    >
                      User Email
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
                      Delete user
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
                        <td className="px-5 py-3">{user.name}</td>
                        <td className="px-5 py-3">{user.email}</td>
                        <td className="px-5 py-3">{user._id}</td>
                        <td className="px-5 py-3">
                          <button className="btn">Delete</button>
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
      </div>
    </>
  );
};

export default Users;

/**
 * name
 * number
 * status
 *
 */
