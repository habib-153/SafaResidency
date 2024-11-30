/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import {
  useDeleteEventMutation,
  useGetAllEventsQuery,
} from "../../../redux/features/event/eventApi";
import { useState } from "react";
import Loading from "../../../Components/ui/Loading";
import toast from "react-hot-toast";
import { Badge, Button, Space, Table } from "antd";
import CPagination from "../../../Shared/Pagination";
import EventDetailsModal from "../../../Components/ui/Modals/EventDetailsModal";
import UpdateEventModal from "../../../Components/ui/Modals/UpdateEventModal";

const EventRequest = () => {
  const { page } = useSelector((state) => state.filter);
  const { data, isLoading } = useGetAllEventsQuery([
    { name: "page", value: page },
  ]);
  const [deleteEvent] = useDeleteEventMutation();

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (isLoading) return <Loading />;

  const showDetailModal = (event) => {
    setSelectedEvent(event);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalVisible(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async (id) => {
    const toastId = toast.loading("Deleting event...");
    try {
      const res = await deleteEvent(id);
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      } else {
        toast.success("Event deleted successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to delete event", { id: toastId });
    }
  };

  const columns = [
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Badge
          color={
            record.status === "confirmed"
              ? "green"
              : record.status === "cancelled"
              ? "red"
              : "gold"
          }
          text={
            record.status?.charAt(0).toUpperCase() + record.status?.slice(1)
          }
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Event Type",
      dataIndex: "eventType",
      key: "eventType",
    },
    {
      title: "Layout",
      dataIndex: "layout",
      key: "layout",
    },
    {
      title: "Date & Time",
      key: "datetime",
      render: (_, record) => (
        <>
          <div>{new Date(record.date).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">
            {record.startTime} - {record.endTime}
          </div>
        </>
      ),
    },
    {
      title: "Guest Count",
      dataIndex: "guestCount",
      key: "guestCount",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Button
            onClick={() => showDetailModal(record)}
            className="text-blue-500"
          >
            Details
          </Button>
          <Button
            onClick={() => {
              setSelectedEvent(record);
              setIsUpdateModalVisible(true);
            }}
            className="text-green-500"
          >
            Update
          </Button>
          <Button
            onClick={() => handleDeleteEvent(record._id)}
            className="text-red-500"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Event Requests</h1>
          <p>Manage all event bookings and requests</p>
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <Table
              columns={columns}
              dataSource={data?.data}
              rowKey="_id"
              pagination={false}
            />
          </div>
        </div>
        <CPagination meta={data?.meta} />
      </div>

      <EventDetailsModal
        visible={isDetailModalVisible}
        onClose={handleDetailModalClose}
        event={selectedEvent}
      />
      <UpdateEventModal
        visible={isUpdateModalVisible}
        onClose={() => {
          setIsUpdateModalVisible(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
      />
    </div>
  );
};

export default EventRequest;
