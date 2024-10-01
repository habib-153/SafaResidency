import { useSelector } from "react-redux";
import DPagination from "../../../Shared/Pagination";
import "../../../Shared/style.css";
import {
    useGetAllUsersQuery,

} from "../../../redux/features/auth/authApi";
import Search from "../../../Components/ui/Search";
import Loading from "../../../Components/ui/Loading";
import { Button } from "antd";

const Requests = () => {
    const { page, searchTerm } = useSelector((state) => state.filter);


    const { data, isLoading } = useGetAllUsersQuery([
        {
            name: "page",
            value: page,
        },
        { name: "searchTerm", value: searchTerm },
    ]);

    //json e data rakha ache oita dekhe update kore dish baki ta




    if (isLoading) return <Loading />;
    return (
        <>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold ">See all Requests</h1>
                        <p className="">See your all requests here</p>
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
                                            User Name
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                                        >
                                            User Requests
                                        </th>

                                      
                                        <th
                                            scope="col"
                                            className="px-5 py-3 bg-gold border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                                        >
                                           Status
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
                                                <td className="px-5 py-3">{user?.role}</td>
                                                <td className="px-5 py-1 text-center">
                                                    <Button danger type="primary">
                                                        Delete
                                                    </Button>
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

export default Requests;
