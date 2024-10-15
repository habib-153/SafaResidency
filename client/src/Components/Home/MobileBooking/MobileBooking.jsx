import { useState } from "react";
import { FaCalendarAlt, FaChevronDown, FaUser, FaTag } from "react-icons/fa";
import { Select, Button, Option } from "@material-tailwind/react";
import { DatePicker, Divider, message } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  setCategory,
  setDate,
  setSort,
} from "../../../redux/features/filter/filterSlice";
import { roomCategoryOptions } from "../../../utils/constant";
import "./custom.css";

const MobileBookingNav = () => {
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(1, "day")]);
  const [openSection, setOpenSection] = useState(null);
  const dispatch = useDispatch();
  const [openPicker, setOpenPicker] = useState(null);

  const handleOpenChange = (open, type) => {
    if (open) {
      setOpenPicker(type);
    } else {
      setOpenPicker(null);
    }
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
      const formattedDates = dates.map((date) => date.format("DD-MM-YYYY"));
      dispatch(setDate(formattedDates));
    }
  };

  const handleStartDateChange = (date) => {
    if (date && date.isAfter(dateRange[1])) {
      message.error("Start date cannot be after end date");
      return;
    }
    handleDateChange([date, dateRange[1]]);
  };

  const handleEndDateChange = (date) => {
    if (date && date.isBefore(dateRange[0])) {
      message.error("End date cannot be before start date");
      return;
    }
    handleDateChange([dateRange[0], date]);
  };

  const formatDate = (date) => date.format("ddd, MMM D");

  const handleCategoryChange = (value) => {
    dispatch(setCategory(value));
  };

  const handleSortChange = (value) => {
    dispatch(setSort(value));
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 px-4 py-3">
      <div className="space-y-3">
        <motion.div
          className="cursor-pointer "
          onClick={() => toggleSection("dates")}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaCalendarAlt className="text-gold mr-3 text-xl" />
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">
                  DATES ({dateRange[1].diff(dateRange[0], "day")} NIGHT
                  {dateRange[1].diff(dateRange[0], "day") > 1 ? "S" : ""})
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {formatDate(dateRange[0])} - {formatDate(dateRange[1])}
                </p>
              </div>
            </div>
            <FaChevronDown
              className={`text-gold transition-transform duration-300 ${
                openSection === "dates" ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </motion.div>
        <AnimatePresence>
          {openSection === "dates" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="responsive-container"
            >
              <div className="responsive-datepicker">
                <label>Start Date</label>
                <DatePicker
                  value={dateRange[0]}
                  onChange={handleStartDateChange}
                  format={formatDate}
                  open={openPicker === "start"}
                  onOpenChange={(open) => handleOpenChange(open, "start")}
                  className="w-full my-2"
                />
              </div>
              <div className="responsive-datepicker">
                <label>End Date</label>
                <DatePicker
                  value={dateRange[1]}
                  onChange={handleEndDateChange}
                  format={formatDate}
                  open={openPicker === "end"}
                  onOpenChange={(open) => handleOpenChange(open, "end")}
                  className="w-full my-2"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Divider className="my-2 border-amber-200" />

        <motion.div
          className="cursor-pointer"
          onClick={() => toggleSection("rooms")}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaUser className="text-gold mr-3 text-xl" />
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">
                  ROOMS & GUESTS
                </p>
                <p className="text-sm font-bold text-gray-800">
                  Select category
                </p>
              </div>
            </div>
            <FaChevronDown
              className={`text-gold transition-transform duration-300 ${
                openSection === "rooms" ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </motion.div>
        <AnimatePresence>
          {openSection === "rooms" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Select
                label="Select Room Category"
                onChange={handleCategoryChange}
                className="w-full my-2"
              >
                {roomCategoryOptions.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </motion.div>
          )}
        </AnimatePresence>

        <Divider className="my-2 border-amber-200" />

        <motion.div
          className="cursor-pointer"
          onClick={() => toggleSection("sort")}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaTag className="text-gold mr-3 text-xl" />
              <div>
                <p className="text-xs text-gray-600 uppercase font-semibold">
                  SORT BY RATE
                </p>
                <p className="text-sm font-bold text-gray-800">
                  Select sorting
                </p>
              </div>
            </div>
            <FaChevronDown
              className={`text-gold transition-transform duration-300 ${
                openSection === "sort" ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </motion.div>
        <AnimatePresence>
          {openSection === "sort" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Select
                label="Sort By Rate"
                onChange={handleSortChange}
                className="w-full my-2"
              >
                <Option value="price">Lowest Rate</Option>
                <Option value="">Medium Rate</Option>
                <Option value="-price">High Rate</Option>
              </Select>
            </motion.div>
          )}
        </AnimatePresence>

        <Link to="/view-rates" className="block mt-4">
          <Button className="w-full bg-gold hover:bg-amber-600 text-white">
            View Rates
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MobileBookingNav;
