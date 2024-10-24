/* eslint-disable react/prop-types */
import { Modal, Descriptions, Tag, Button } from "antd";
import { Typography } from "@material-tailwind/react";
import { FaUser, FaBed, FaCreditCard, FaCalendar } from "react-icons/fa";
import "./booking.css";

const BookingDetailsModal = ({ visible, onClose, booking }) => {
  if (!booking) return null;
  //console.log(booking);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      style={{
        maxWidth: "1560px",
        padding: "0",
      }}
      className="custom-modal"
    >
      <div className="p-4 rounded-lg">
        <Typography variant="h4" color="blue" className="mb-4 text-center">
          Booking Details
        </Typography>
        <Descriptions
          bordered
          column={1}
          className="bg-white rounded-lg shadow-sm"
        >
          <Descriptions.Item
            label={
              <span className="flex items-center">
                <FaUser className="mr-2" /> User Information
              </span>
            }
            labelStyle={{ fontWeight: "bold" }}
          >
            <p>
              <strong>Name:</strong> {booking.user.name}
            </p>
            <p>
              <strong>Email:</strong> {booking.user.email}
            </p>
            <p>
              <strong>Phone:</strong> {booking.phone}
            </p>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span className="flex items-center">
                <FaBed className="mr-2" /> Room Details
              </span>
            }
            labelStyle={{ fontWeight: "bold" }}
          >
            <p>
              <strong>Name:</strong> {booking.room.room_overview.name}
            </p>
            <p>
              <strong>Number:</strong> {booking.room.room_overview.room_number}
            </p>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span className="flex items-center">
                <FaCreditCard className="mr-2" /> Booking Info
              </span>
            }
            labelStyle={{ fontWeight: "bold" }}
          >
            <p>
              <strong>Amount:</strong> $ {booking.amount}
            </p>
            <p>
              <strong>Transaction ID:</strong> {booking.transactionId}
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              <Tag
                color={booking.paymentStatus === "Pending" ? "red" : "green"}
                className="ml-2"
              >
                {booking.paymentStatus}
              </Tag>
            </p>
            <p>
              <strong>Booking Status:</strong>
              <Tag
                color={booking.isConfirmed ? "success" : "warning"}
                className="ml-2"
              >
                {booking.isConfirmed ? "Confirmed" : "Pending"}
              </Tag>
            </p>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span className="flex items-center">
                <FaCalendar className="mr-2" /> Dates
              </span>
            }
            labelStyle={{ fontWeight: "bold" }}
          >
            <p>
              <strong>Check-in:</strong> {booking.startDate}
            </p>
            <p>
              <strong>Check-out:</strong> {booking.endDate}
            </p>
          </Descriptions.Item>
        </Descriptions>
        <div className="mt-6 text-center">
          <Button
            type="primary"
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingDetailsModal;
