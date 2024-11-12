/* eslint-disable react/prop-types */

import { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Divider } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setGuests } from "../../redux/features/filter/filterSlice";

const GuestSelector = ({ open, onClose }) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const dispatch = useDispatch();

  const handleIncrement = (setter, value, max) => {
    const totalGuests = adults + children;
    if (totalGuests >= 3) return;
    if (value < max) setter(value + 1);
  };

  const handleDecrement = (setter, value, min = 0) => {
    if (value > min) setter(value - 1);
  };

  const handleDone = () => {
    // Update guest info display
    onClose(
      `${adults} Adult${adults > 1 ? "s" : ""}, ${children} Child${
        children > 1 ? "ren" : ""
      }`
    );

    // Dispatch guest count to filter
    dispatch(setGuests({ adults, children }));
    open();
  };

  const Counter = ({
    label,
    value,
    onIncrement,
    onDecrement,
    max,
    min = 0,
    maxText,
  }) => (
    <div className="py-4 w-96">
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
            onClick={(e) => {
              e.stopPropagation();
              onDecrement();
            }}
            disabled={value <= min}
          >
            <FaMinus className="h-3 w-3" />
          </IconButton>
          <span className="w-6 text-center">{value}</span>
          <IconButton
            variant="outlined"
            size="sm"
            className="rounded-full h-8 w-8 p-0 flex items-center justify-center border-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              onIncrement();
            }}
            disabled={value >= max || adults + children >= 3}
          >
            <FaPlus className="h-3 w-3" />
          </IconButton>
        </div>
      </div>
    </div>
  );

  return (
    <Menu open={open} handler={onClose}>
      <MenuHandler>
        <p className="flex items-center gap-2">
          {`${adults} Adult${adults > 1 ? "s" : ""}, ${children} Child${
            children > 1 ? "ren" : ""
          }`}
        </p>
      </MenuHandler>
      <MenuList className="p-0">
        <div className="w-96 bg-white rounded-lg shadow-xl">
          <div className="border-b pb-4 px-4">
            <h4 className="text-lg font-semibold text-center w-full mt-3">
              MAXIMUM 3 GUESTS PER ROOM
            </h4>
          </div>

          <div className="px-6">
            <Counter
              label="Adults"
              value={adults}
              onIncrement={() => handleIncrement(setAdults, adults, 3)}
              onDecrement={() => handleDecrement(setAdults, adults, 1)}
              max={3}
              min={1}
              maxText="(Ages 13+)"
            />
            <Divider className="my-0" />
            <Counter
              label="Children"
              value={children}
              onIncrement={() => handleIncrement(setChildren, children, 2)}
              onDecrement={() => handleDecrement(setChildren, children)}
              max={2}
              maxText="(Ages 0-12)"
            />
          </div>

          <div className="p-4">
            <Button onClick={handleDone} className="w-full btn" size="lg">
              Done
            </Button>
          </div>
        </div>
      </MenuList>
    </Menu>
  );
};

export default GuestSelector;

// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import {
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Button,
//   IconButton,
// } from "@material-tailwind/react";
// import { Divider } from "antd";
// import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { setGuests } from "../../redux/features/filter/filterSlice";

// const GuestSelector = ({ open, onClose, onSave }) => {
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);
//   //const [infants, setInfants] = useState(0);
//   const dispatch = useDispatch();

//   const handleIncrement = (setter, value, max) => {
//     const totalGuests = adults + children;

//     if(totalGuests > 3) return;
//     if (value < max) setter(value + 1);
//   };

//   const handleDecrement = (setter, value, min = 0) => {
//     if (value > min) setter(value - 1);
//   };

//   const handleDone = () => {
//     // Update guest info display
//     onSave(
//       `${adults} Adult${adults > 1 ? 's' : ''},
//       ${children} Child${ children > 1 ? 's' : ''}`
//     );

//     // Dispatch guest count to filter
//     dispatch(setGuests({ adults, children }));
//     onClose();
//   };

//   const Counter = ({ label, value, onIncrement, onDecrement, maxText }) => (
//     <div className="py-4">
//       <div className="flex justify-between items-center">
//         <div>
//           <div className="text-gray-900 font-medium">{label}</div>
//           {maxText && <div className="text-gray-500 text-sm">{maxText}</div>}
//         </div>
//         <div className="flex items-center gap-4">
//           <IconButton
//             variant="outlined"
//             size="sm"
//             className="rounded-full h-8 w-8 p-0 flex items-center justify-center border-gray-300"
//             onClick={onDecrement}
//           >
//             <FaMinus className="h-3 w-3" />
//           </IconButton>
//           <span className="w-6 text-center">{value}</span>
//           <IconButton
//             variant="outlined"
//             size="sm"
//             className="rounded-full h-8 w-8 p-0 flex items-center justify-center border-gray-300"
//             onClick={onIncrement}
//           >
//             <FaPlus className="h-3 w-3" />
//           </IconButton>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <Dialog
//       open={open}
//       handler={onClose}
//       size="xs"
//       dismiss={{ outsidePress: true }}
//       className="bg-white rounded-lg shadow-xl"
//     >
//       <DialogHeader className="flex justify-between items-center border-b pb-4">
//         <h4 className="text-lg font-semibold text-center w-full">
//           MAXIMUM 8 GUESTS PER ROOM
//         </h4>
//         <IconButton variant="text" onClick={onClose} className="p-0">
//           <FaTimes className="h-5 w-5" />
//         </IconButton>
//       </DialogHeader>

//       <DialogBody className="px-6">
//         {/* <Counter
//           label="Rooms"
//           value={rooms}
//           onIncrement={() => handleIncrement(setRooms, rooms, 3)}
//           onDecrement={() => handleDecrement(setRooms, rooms, 1)}
//           maxText="(Max: 3 Rooms/person)"
//         />
//         <Divider className="my-0" /> */}
//         <Counter
//           label="Adults"
//           value={adults}
//           onIncrement={() => handleIncrement(setAdults, adults, 3)}
//           onDecrement={() => handleDecrement(setAdults, adults, 1)}
//           maxText="(Ages 13+)"
//         />
//         <Divider className="my-0" />
//         <Counter
//           label="Children"
//           value={children}
//           onIncrement={() => handleIncrement(setChildren, children, 1)}
//           onDecrement={() => handleDecrement(setChildren, children)}
//           maxText="(Ages 0-12)"
//         />
//       </DialogBody>

//       <DialogFooter className="p-4">
//         <Button onClick={handleDone} className="w-full bg-blue-600" size="lg">
//           Done
//         </Button>
//       </DialogFooter>
//     </Dialog>
//   );
// };

// export default GuestSelector;

// // ${infants ? `, ${infants} Infant${infants > 1 ? 's' : ''}` : ''
