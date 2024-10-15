import { useSelector } from "react-redux";
import "../../../Shared/style.css";
import Search from "../../../Components/ui/Search";
import Loading from "../../../Components/ui/Loading";
import { Badge, Button, Space, Table } from "antd";
import CPagination from "../../../Shared/Pagination";
import { useGetAllServicesQuery } from "../../../redux/features/service/serviceApi";

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

  if (isLoading) return <Loading />;

  const columns = [
    {
      title: "",
      key: "isConfirmed",
      render: (text, record) => (
        <Badge color={record.isConfirmed ? "green" : "red"} />
      ),
    },
    {
      title: "User",
      dataIndex: ["user", "name"],
      key: "user",
    },
    {
      title: "Room",
      dataIndex: ["room", "room_overview", "room_number"],
      key: "room_number",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      //   render: (text, record) => `${record.startDate} ~ ${record.endDate}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        const words = record.description.split(" ");
        const truncatedDescription = words.slice(0, 8).join(" ");
        return `${truncatedDescription}${words.length > 10 ? "..." : ""}`;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size={2} className="w-fit">
          <Button className="text-green-500">Mark as Complete</Button>
          <Button className="text-blue-500">Details</Button>
          <Button
            //onClick={() => handleDeleteBooking(record._id)}
            className="text-red-500 ml-1"
          >
            Cancel
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
