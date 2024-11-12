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

// const { RangePicker } = DatePicker;

const BookingNav = ({ isNavVisible }) => {
  const [checkInDate, setCheckInDate] = useState(dayjs());
  const [checkOutDate, setCheckOutDate] = useState(dayjs().add(1, "day"));
  // const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(1, "day")]);
  const [guestSelectorOpen, setGuestSelectorOpen] = useState(false);
  // const [guestInfo, setGuestInfo] = useState("1 Adult");
  const guestSelectorRef = useRef(null);
  const dispatch = useDispatch();

  // const handleDateChange = (dates) => {
  //   if (dates) {
  //     setDateRange(dates);
  //     const date = dates.map((date) => date.format("DD-MM-YYYY"));
  //     dispatch(setDate(date));
  //   }
  // };

  const handleDateChange = (date, dateString, isCheckIn) => {
    if (isCheckIn) {
      setCheckInDate(date);
      dispatch(setDate([dateString, checkOutDate.format("DD-MM-YYYY")]));
    } else {
      setCheckOutDate(date);
      dispatch(setDate([checkInDate.format("DD-MM-YYYY"), dateString]));
    }
  };

  useEffect(() => {
    // Reset to default guest values on mount
    dispatch(setGuests({ adults: 1, children: 0 }));
  }, [dispatch]);

  const formatDate = (date) => date.format("ddd, MMM D");

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
                <div className="flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors group  flex-1">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gold mr-3 text-xl" />
                    <div className="">
                      <p className="text-xs flex font-medium text-gray-500 uppercase">
                        Check In
                      </p>
                      <DatePicker
                        value={checkInDate}
                        onChange={(date, dateString) =>
                          handleDateChange(date, dateString, true)
                        }
                        format={formatDate}
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
                        value={checkOutDate}
                        onChange={(date, dateString) =>
                          handleDateChange(date, dateString, false)
                        }
                        format={formatDate}
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
                    {/* <p className="text-gray-900">{guestInfo}</p> */}
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
                    // onSave={handleGuestChange}
                  />
                </div>

                <Divider type="vertical" className="h-16 border-gold" dashed />

                {/* Special Rates Section */}
                {/* <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    SPECIAL RATES
                  </p>
                  <select
                    className="w-full border-none bg-transparent text-gray-900 focus:ring-0 mt-1"
                    onChange={(e) => dispatch(setSort(e.target.value))}
                    defaultValue="price"
                  >
                    <option value="price">Lowest Regular Rate</option>
                    <option value="">Medium Rate</option>
                    <option value="-price">High Rate</option>
                  </select>
                </div> */}

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
