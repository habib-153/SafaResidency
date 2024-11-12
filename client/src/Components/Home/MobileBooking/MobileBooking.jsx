import { useState, useRef } from "react";
import { FaCalendarAlt, FaChevronDown, FaUserFriends } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { DatePicker, Divider } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import GuestSelector from "../../../Shared/Header/GuestSelector";
import "./custom.css";
import { setDate, setGuests } from "../../../redux/features/filter/filterSlice";

const MobileBookingNav = () => {
  const [guestSelectorOpen, setGuestSelectorOpen] = useState(false);
  const guestSelectorRef = useRef(null);
  const dispatch = useDispatch();

  const handleGuestChange = (guests) => {
    dispatch(setGuests(guests));
  };

  // Initialize date range
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(1, "day")]);

  // Handle date changes for check-in or check-out and update the date range
  const handleSingleDateChange = (date, isCheckIn) => {
    const newRange = isCheckIn ? [date, dateRange[1]] : [dateRange[0], date];

    setDateRange(newRange);
    const formattedRange = newRange.map((d) => d.format("DD-MM-YYYY"));
    dispatch(setDate(formattedRange));
  };

  // Format date for display
  const formatDisplayDate = (date) => date.format("ddd, MMM D");

  return (
    <div className="bg-white lg:hidden shadow-lg rounded-lg border border-gray-200 px-4 py-3">
      <div className="space-y-3">
        {/* Date Picker Section */}
        <div className="flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors group flex-1">
          <div className="flex items-center">
            <FaCalendarAlt className="text-gold mr-3 text-xl" />
            <div>
              <p className="text-xs flex font-medium text-gray-500 uppercase">
                Check In
              </p>
              <DatePicker
                value={dateRange[0]}
                onChange={(date) => handleSingleDateChange(date, true)}
                format={formatDisplayDate}
                className="border-none shadow-none p-0 hover:bg-transparent w-full"
                suffixIcon={null}
              />
            </div>
          </div>

          <div className="flex items-center">
            <FaCalendarAlt className="text-gold mr-3 text-xl" />
            <div>
              <p className="text-xs flex font-medium text-gray-500 uppercase">
                Check Out
              </p>
              <DatePicker
                value={dateRange[1]}
                onChange={(date) => handleSingleDateChange(date, false)}
                format={formatDisplayDate}
                className="border-none shadow-none p-0 hover:bg-transparent w-full"
                suffixIcon={null}
              />
            </div>
          </div>
        </div>

        <Divider className="my-2 border-amber-200" />
        {/* Guest Selector Section */}
        <motion.div
          className="cursor-pointer"
          onClick={() => setGuestSelectorOpen(!guestSelectorOpen)}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaUserFriends className="text-gold mr-3 text-xl" />
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">
                  ROOMS & GUESTS
                </p>
                <p className="text-sm font-bold text-gray-800">
                  Select rooms and guests
                </p>
              </div>
            </div>
            <FaChevronDown
              className={`text-gold transition-transform duration-300 ${
                guestSelectorOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </motion.div>
        <AnimatePresence>
          {guestSelectorOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="responsive-container"
            >
              <GuestSelector
                open={guestSelectorOpen}
                anchorEl={guestSelectorRef.current}
                onClose={() => setGuestSelectorOpen(false)}
                onSave={handleGuestChange}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Divider className="my-2 border-amber-200" />

        <div className="flex justify-center mt-4">
          <Button className="bg-gold hover:bg-gold/90 px-6">
            Check Availability
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileBookingNav;
