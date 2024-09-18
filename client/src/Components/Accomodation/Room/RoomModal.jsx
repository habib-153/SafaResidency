/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Modal } from "antd";
import { useGetSingleRoomQuery } from "../../../redux/features/room/roomApi";

const RoomModal = ({ id }) => {
  const { data } = useGetSingleRoomQuery(id);
  const [isOpen, setIsOpen] = useState(false);

  const roomData = data?.data;
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center transition-colors duration-300 hover:text-gold"
      >
        <span className="mr-2"> View Details</span>
        <FaArrowRight className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" />
      </button>
      <Modal
        width="90%"
        height="content"
        style={{
          maxWidth: "100%",
          border: "4px solid #111111",
          borderRadius: "10px",
          padding: "0",
        }}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        <h2>{roomData?.room_overview?.name}</h2>
      </Modal>
    </div>
  );
};

export default RoomModal;
