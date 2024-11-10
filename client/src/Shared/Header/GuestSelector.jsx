/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Divider } from "antd";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";

const GuestSelector = ({ open, onClose, onSave }) => {
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleIncrement = (setter, value, max) => {
    if (value < max) setter(value + 1);
  };

  const handleDecrement = (setter, value, min = 0) => {
    if (value > min) setter(value - 1);
  };

  const handleDone = () => {
    onSave(
      `${rooms} Room${rooms > 1 ? "s" : ""}, ${adults + children} Guest${
        adults + children > 1 ? "s" : ""
      }`
    );
    onClose();
  };

  const Counter = ({ label, value, onIncrement, onDecrement, maxText }) => (
    <div className="py-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-gray-900 font-medium">{label}</div>
          {maxText && <div className="text-gray-500 text-sm">{maxText}</div>}
        </div>
        <div className="flex items-center gap-4">
          <IconButton
            variant="outlined"
            size="sm"
            className="rounded-full h-8 w-8 p-0 flex items-center justify-center border-gray-300"
            onClick={onDecrement}
          >
            <FaMinus className="h-3 w-3" />
          </IconButton>
          <span className="w-6 text-center">{value}</span>
          <IconButton
            variant="outlined"
            size="sm"
            className="rounded-full h-8 w-8 p-0 flex items-center justify-center border-gray-300"
            onClick={onIncrement}
          >
            <FaPlus className="h-3 w-3" />
          </IconButton>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="xs"
      dismiss={{ outsidePress: true }}
      className="bg-white rounded-lg shadow-xl"
    >
      <DialogHeader className="flex justify-between items-center border-b pb-4">
        <h4 className="text-lg font-semibold text-center w-full">
          MAXIMUM 8 GUESTS PER ROOM
        </h4>
        <IconButton variant="text" onClick={onClose} className="p-0">
          <FaTimes className="h-5 w-5" />
        </IconButton>
      </DialogHeader>

      <DialogBody className="px-6">
        <Counter
          label="Rooms"
          value={rooms}
          onIncrement={() => handleIncrement(setRooms, rooms, 3)}
          onDecrement={() => handleDecrement(setRooms, rooms, 1)}
          maxText="(Max: 3 Rooms/person)"
        />
        <Divider className="my-0" />
        <Counter
          label="Adults"
          value={adults}
          onIncrement={() => handleIncrement(setAdults, adults, 8)}
          onDecrement={() => handleDecrement(setAdults, adults, 1)}
          maxText="(Max: 8 total guests/room)"
        />
        <Divider className="my-0" />
        <Counter
          label="Children"
          value={children}
          onIncrement={() => handleIncrement(setChildren, children, 8 - adults)}
          onDecrement={() => handleDecrement(setChildren, children)}
          maxText="(Max: 8 total guests/room)"
        />
      </DialogBody>

      <DialogFooter className="p-4">
        <Button onClick={handleDone} className="w-full bg-blue-600" size="lg">
          Done
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default GuestSelector;
