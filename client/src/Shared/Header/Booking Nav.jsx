/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { Button } from "@material-tailwind/react";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Divider, DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  setCategory,
  setDate,
  setSort,
} from "../../redux/features/filter/filterSlice";
import { motion } from "framer-motion";
import GuestSelector from "./GuestSelector";

const { RangePicker } = DatePicker;

const BookingNav = ({ isNavVisible }) => {
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(1, "day")]);
  const [guestSelectorOpen, setGuestSelectorOpen] = useState(false);
  const [guestInfo, setGuestInfo] = useState("1 Room, 1 Adult");
  const guestSelectorRef = useRef(null);
  const dispatch = useDispatch();

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
      const date = dates.map((date) => date.format("DD-MM-YYYY"));
      dispatch(setDate(date));
    }
  };

  const handleGuestChange = (value) => {
    setGuestInfo(value);
    const [rooms] = value.split(",")[0].split(" ");
    dispatch(setCategory([rooms]));
  };

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
              <div className="flex items-center py-4 gap-8 justify-between">
                {/* Date Picker Section */}
                <div
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors group flex-1"
                  onClick={() =>
                    document.querySelector(".ant-picker-range").click()
                  }
                >
                  <FaCalendarAlt className="text-gold mr-3 text-xl" />
                  <div>
                    <div className="flex gap-14">
                      <p className="text-xs font-medium text-gray-500 uppercase pr-8">
                        Check In
                      </p>
                      <p className="text-xs font-medium text-gray-500 uppercase">
                        Check Out
                      </p>
                    </div>
                    <RangePicker
                      value={dateRange}
                      onChange={handleDateChange}
                      format={formatDate}
                      className="border-none shadow-none p-0 hover:bg-transparent"
                      suffixIcon={null}
                      separator={<span className="mx-2">→</span>}
                      style={{ width: "auto" }}
                    />
                  </div>
                </div>

                <Divider type="vertical" className="h-16 border-gold" dashed />

                {/* Guest Selector Section */}
                <div
                  ref={guestSelectorRef}
                  className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors flex-1 relative"
                  onClick={() => setGuestSelectorOpen(!guestSelectorOpen)}
                >
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    ROOMS & GUESTS
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-gray-900">{guestInfo}</p>
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
                    onSave={handleGuestChange}
                  />
                </div>

                <Divider type="vertical" className="h-16 border-gold" dashed />

                {/* Special Rates Section */}
                <div className="flex-1">
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
                </div>

                <Link to="/view-rates">
                  <Button className="bg-gold hover:bg-gold/90 px-6">
                    Check Rate
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
