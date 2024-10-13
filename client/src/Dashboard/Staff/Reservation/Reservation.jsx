import { useSelector } from "react-redux";
import { useGetAllBookingsQuery } from "../../../redux/features/booking/bookingApi";
import { useState } from "react";
import Loading from "../../../Components/ui/Loading";
import { Button, Space, Table, Badge, Tag } from "antd";
import Search from "../../../Components/ui/Search";
import CPagination from "../../../Shared/Pagination";
import BookingDetailsModal from "../../../Components/ui/Modals/BookingDetailsModal";
import BookingCancelModal from "../../../Components/ui/Modals/BookingCancelModal";

const ReservationManagement = () => {
    const { page, searchTerm } = useSelector((state) => state.filter);
    const { data, isLoading } = useGetAllBookingsQuery([{
        name: "page",
        value: page,
      },
      { name: "searchTerm", value: searchTerm }]);
  
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
  
    if (isLoading) return <Loading />;
  
    const showDetailModal = (booking) => {
      setSelectedBooking(booking);
      setIsDetailModalVisible(true);
    };
  
    const showCancelModal = (booking) => {
      console.log(booking);
      setSelectedBooking(booking);
      setIsCancelModalVisible(true);
    };
  
    const handleDetailModalClose = () => {
      setIsDetailModalVisible(false);
    };
  
    const handleCancelModalClose = () => {
      setIsCancelModalVisible(false);
    };
  
    const handleCancelBooking = () => {
      setIsCancelModalVisible(false);
    };
  
    const columns = [
      {
        title: "",
        key: "isConfirmed",
        render: (text, record) => (
          <Badge color={record.isConfirmed ? "green" : "red"} />
        ),
      },
      {
        title: "ID",
        dataIndex: "transactionId",
        key: "transactionId",
      },
      {
        title: "Room Number",
        dataIndex: ["room", "room_overview", "room_number"],
        key: "room_number",
      },
      {
        title: "Dates",
        key: "dates",
        render: (text, record) => `${record.startDate} ~ ${record.endDate}`,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount) => `৳ ${amount}`,
      },
      {
        title: "Payment",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        render: (item) => {
          let color;
          if (item === "Pending") {
            color = "red";
          }
          if (item === "Paid") {
            color = "green";
          }
  
          return <Tag color={color}>{item}</Tag>;
        },
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <Space>
            <Button
              onClick={() => showDetailModal(record)}
              className="text-blue-500"
            >
              Details
            </Button>
            <Button
              onClick={() => showCancelModal(record)}
              className="text-red-500 ml-2"
            >
              Cancel
            </Button>
          </Space>
        ),
      },
    ];
  
    return (
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold ">See all Booking</h1>
            <p className="">See your all users Booking and Reservation</p>
            <div>
              <Search searchPlaceholder="Search" />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-auto">
              <Table
                className="text-center"
                columns={columns}
                dataSource={data?.data}
                rowKey="_id"
                pagination={false}
              />
            </div>
          </div>
          <CPagination meta={data?.meta} />
        </div>
        <BookingDetailsModal
          visible={isDetailModalVisible}
          onClose={handleDetailModalClose}
          booking={selectedBooking}
        />
  
        <BookingCancelModal
          visible={isCancelModalVisible}
          onClose={handleCancelModalClose}
          onCancel={handleCancelBooking}
        />
      </div>
    );
  };
  
  export default ReservationManagement
  