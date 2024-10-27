/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { Typography, Alert } from "@material-tailwind/react";
import { FaExclamationCircle } from "react-icons/fa";

const BookingCancelModal = ({ visible, onClose, onCancel }) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      style={{ maxWidth: "500px" }}
    >
      <div className=" rounded-lg">
        <div className="text-center mb-4">
          <FaExclamationCircle className="w-16 h-16 text-red-500 mx-auto" />
        </div>
        <Typography variant="h4" color="red" className="mb-4 text-center">
          Cancel Booking
        </Typography>
        <Alert color="red" icon={<FaExclamationCircle />} className="mb-4">
          Please Contact with the Manager to cancel the booking.
          <p className="text-xl font-semibold text-center">
            Tel:<a href="tel:+8801831-335222"> +8801831-335222 </a>
          </p>
          <p className="text-xl font-semibold text-center">
            Email:{" "}
            <a href="mailto:info@safaresidency.com">
              info@safaresidency.com
            </a>
          </p>
        </Alert>
        {/* <Alert color="red" icon={<FaExclamationCircle />} className="mb-4">
          Are you sure you want to cancel this booking? This action cannot be undone.
        </Alert> */}
        {/* <div className="mt-6 flex justify-center space-x-4">
          <Button onClick={onClose} className="bg-gray-200 text-gray-700 hover:bg-gray-300 border-none">
            No, Keep Booking
          </Button>
          <Button type="primary" danger onClick={onCancel}>
            Yes, Cancel Booking
          </Button>
        </div> */}
      </div>
    </Modal>
  );
};

export default BookingCancelModal;
