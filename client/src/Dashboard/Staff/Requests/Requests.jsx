import { useSelector } from "react-redux";
import "../../../Shared/style.css";
import Search from "../../../Components/ui/Search";
import Loading from "../../../Components/ui/Loading";
import { Badge, Button, Space, Table } from "antd";
import CPagination from "../../../Shared/Pagination";
import { useDeleteServiceMutation, useGetAllServicesQuery, useUpdateServiceMutation } from "../../../redux/features/service/serviceApi";
import { Dialog, DialogBody } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useState } from "react";

const Requests = () => {
  const { page, searchTerm } = useSelector((state) => state.filter);
  const { data, isLoading } = useGetAllServicesQuery([
    {
      name: "page",
      value: page,
    },
    { name: "searchTerm", value: searchTerm },
  ]);
  const serviceRequests = data?.data?.result;

  const [open, setOpen] = useState(false);
  const [updateServiceRequest] = useUpdateServiceMutation();
  const [deleteServiceRequest] = useDeleteServiceMutation();

  const handleOpen = () => setOpen(!open);
 
  const handleComplete = async (id) => {
    const payload = {
      isCompleted: true,
    };

    const toastId = toast.loading("please wait...");

    const res = await updateServiceRequest({id, payload});
    if (res?.error) {
      toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
    } else {
      toast.success("Marked As Completed", { id: toastId, duration: 2000 });
    }

  };
  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting Service...");
    const res = await deleteServiceRequest(id);
    if (res?.error) {
      toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
    } else {
      toast.success("Service is Deleted", { id: toastId, duration: 2000 });
    }
  };

  if (isLoading) return <Loading />;

  const columns = [
    {
      title: "",
      key: "isCompleted",
      render: (text, record) => (
        <Badge color={record.isCompleted ? "green" : "red"} />
      ),
    },
    {
      title: "User",
      dataIndex: ["user", "name"],
      key: "user",
    },
    {
      title: "Room",
      dataIndex: ["room", "category"],
      key: "category",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      //   render: (text, record) => `${record.startDate} ~ ${record.endDate}`,
    },
    
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size={4} className="w-fit">
          {!record.isCompleted ? (
            <Button
              className={`text-green-500`}
              onClick={() => handleComplete(record._id)}
            >
              {" "}
              Mark as Complete
            </Button>
          ) : (
            <Button className={`text-green-500`}>Completed</Button>
          )}

          <Button className="text-blue-500" onClick={handleOpen}>
            Details
          </Button>
          <Dialog open={open} handler={handleOpen} className="">
  <h2 className="text-3xl font-semibold mt-3 text-center">
    Request Details
  </h2>
  <DialogBody>
    <div className="space-y-2">
      <p>
        <span className="font-bold">User Name:</span> {record.user?.name}
      </p>
      <p>
        <span className="font-bold">Email:</span> {record.user?.email}
      </p>
      <p>
        <span className="font-bold">Phone:</span> {record.user?.phone}
      </p>
      <p>
        <span className="font-bold">Service Type:</span> {record.service}
      </p>
      <p>
        <span className="font-bold">Description:</span> {record.description}
      </p>
      <p>
        <span className="font-bold">Status:</span>{" "}
        <span className={record.isCompleted ? "text-green-500" : "text-yellow-500"}>
          {record.isCompleted ? "Completed" : "Pending"}
        </span>
      </p>
    </div>
  </DialogBody>
</Dialog>
          <Button
            onClick={() => handleDelete(record._id)}
            className={`text-red-500 `}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
              <Table
                className="text-center"
                columns={columns}
                dataSource={serviceRequests}
                rowKey="_id"
                pagination={false}
              />
            </div>
          </div>
          <CPagination meta={data?.data?.meta} />
        </div>
      </div>
    </>
  );
};

export default Requests;
