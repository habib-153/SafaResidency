import { useSelector } from "react-redux";
import DPagination from "../../../Shared/Pagination";
import "../../../Shared/style.css";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/features/auth/authApi";
import Search from "../../../Components/ui/Search";
import Loading from "../../../Components/ui/Loading";
import { Button, Dropdown, Space } from "antd";
import toast from "react-hot-toast";
import { useState } from "react";

const Users = () => {
  const { page, searchTerm } = useSelector((state) => state.filter);
  const [userId, setUserId] = useState("");
  const { data, isLoading } = useGetAllUsersQuery([
    {
      name: "page",
      value: page,
    },
    { name: "searchTerm", value: searchTerm },
  ]);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleUpdateRole = async (data) => {
    const toastId = toast.loading("Please wait...");

    const userPayload = {
      id: userId,
      payload: {
        role: data.key,
      },
    };

    const res = await updateUser(userPayload);
   console.log(res);
    if (res?.error) {
      toast.error(res?.error?.data?.message || 'Something went wrong', { id: toastId });
    } else {
      toast.success("User role updated successfully", { id: toastId });
    }
  };

  const handleDeleteUser = async (id) => {
    const toastId = toast.loading("Please wait...");
    const res = await deleteUser(id);
   // console.log(res);
    if (res?.error) {
      toast.error("something went wrong", { id: toastId });
    } else {
      toast.success("User Deleted successfully", { id: toastId });
    }
  }

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

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold ">See all Users</h1>
            <p className="">See your all users here</p>
            <div>
              <Search searchPlaceholder="Search User" />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-auto">
              <table className="min-w-full leading-normal text-white overflow-auto">
                <thead>
                  <tr className="bg-[#333333]">
                    <th
                      scope="col"
                      className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                    >
                      User Name
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                    >
                      User Email
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b text-center border-gray-200 text-white  text-sm uppercase font-normal"
                    >
                      Action
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
                        <td className="px-5 py-3 capitalize">{user?.role}</td>
                        <td className="px-5 py-1 text-center">
                          <Space>
                            <Dropdown menu={menuProps} trigger={["click"]}>
                              <Button onClick={() => setUserId(user?._id)}>
                                Update
                              </Button>
                            </Dropdown>
                            <Button onClick={() => handleDeleteUser(user?._id)} danger type="primary">
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
