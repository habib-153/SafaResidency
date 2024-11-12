/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Divider, DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setDate, setGuests } from "../../redux/features/filter/filterSlice";
import { motion } from "framer-motion";
import GuestSelector from "./GuestSelector";

const BookingNav = ({ isNavVisible }) => {
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(1, "day")]);
  const [guestSelectorOpen, setGuestSelectorOpen] = useState(false);
  const guestSelectorRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGuests({ adults: 1, children: 0 }));
  }, [dispatch]);

  // Update date range state and dispatch formatted dates
  const handleDateChange = (date, isCheckIn) => {
    const newRange = isCheckIn ? [date, dateRange[1]] : [dateRange[0], date];
    setDateRange(newRange);
    const formattedRange = newRange.map((d) => d.format("DD-MM-YYYY"));
    dispatch(setDate(formattedRange));
  };

  const formatDisplayDate = (date) => date.format("ddd, MMM D");

  return (
    <div className={`${isNavVisible ? "bg-white shadow-md" : ""}`}>
      <div
        className={`max-w-screen-3xl mx-auto hidden lg:block ${
          isNavVisible ? "border-y" : "mt-1"
        } px-6 relative z-40`}
      >
        <div className="md:flex items-center gap-2">
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isNavVisible ? "auto" : 0,
              opacity: isNavVisible ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            <div className="hidden lg:block">
              <div className="flex items-center py-4 gap-16 mx-auto justify-between">
                {/* Date Picker Section */}
                <div
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors group flex-1"
                  onClick={() =>
                    document.getElementById("checkInPicker").click()
                  }
                >
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gold mr-3 text-xl" />
                    <div>
                      <p className="text-xs flex font-medium text-gray-500 uppercase">
                        Check In
                      </p>
                      <DatePicker
                        id="checkInPicker"
                        value={dateRange[0]}
                        onChange={(date) => handleDateChange(date, true)}
                        format={formatDisplayDate}
                        className="border-none shadow-none p-0 hover:bg-transparent w-full"
                        suffixIcon={null}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors group flex-1"
                  onClick={() =>
                    document.getElementById("checkOutPicker").click()
                  }
                >
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gold mr-3 text-xl" />
                    <div>
                      <p className="text-xs flex font-medium text-gray-500 uppercase">
                        Check Out
                      </p>
                      <DatePicker
                        id="checkOutPicker"
                        value={dateRange[1]}
                        onChange={(date) => handleDateChange(date, false)}
                        format={formatDisplayDate}
                        className="border-none shadow-none p-0 hover:bg-transparent w-full"
                        suffixIcon={null}
                      />
                    </div>
                  </div>
                </div>

                <Divider type="vertical" className="h-16 border-gold" dashed />
                <div className="text-center mx-auto w-32">
                  <p className="uppercase">1 Room</p>
                </div>
                <Divider type="vertical" className="h-10 border-gold" dashed />
                {/* Guest Selector Section */}
                <div
                  ref={guestSelectorRef}
                  className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors flex-1 relative"
                  onClick={() => setGuestSelectorOpen(!guestSelectorOpen)}
                >
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-2">
                      ROOMS & GUESTS
                    </p>
                    <FaChevronDown
                      className={`text-gray-500 text-sm transition-transform duration-200 ${
                        guestSelectorOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <GuestSelector
                    open={guestSelectorOpen}
                    anchorEl={guestSelectorRef.current}
                    onClose={() => setGuestSelectorOpen(false)}
                  />
                </div>

                <Divider type="vertical" className="h-16 border-gold" dashed />

                <Link to="/view-rates">
                  <Button className="bg-gold hover:bg-gold/90 px-6">
                    Check Availability
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingNav;
