/* eslint-disable react/prop-types */
import  { useState } from "react";
import { Select, Option, Button } from "@material-tailwind/react";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaUser,
  FaTag,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Divider, DatePicker } from "antd";
import dayjs from "dayjs";
import { roomCategoryOptions } from "../../utils/constant";
import { useDispatch } from "react-redux";
import {
  setCategory,
  setDate,
  setSort,
} from "../../redux/features/filter/filterSlice";
import { motion } from "framer-motion";

const { RangePicker } = DatePicker;

const BookingNav = ({isNavVisible }) => {
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(1, "day")]);
  
  const dispatch = useDispatch();

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
      const date = dates.map((date) => date.format("DD-MM-YYYY"));
      dispatch(setDate(date));
    }
  };

  const formatDate = (date) => date.format("ddd, MMM D");

  return (
    <div className={`${isNavVisible ? "bg-white shadow relative" : ""}`}>
      <div className={`max-w-screen-3xl  mx-auto hidden lg:block ${
      isNavVisible ? "border-y" : "mt-1"
    } px-2 relative z-40`}>
      <div className="md:flex items-center gap-2">
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isNavVisible ? "auto" : 0,
            opacity: isNavVisible ? 1 : 0,
          }}
          transition={{ duration: 0 }}
          className="flex-1"
        >
          {/* Desktop version */}
          <div className="hidden lg:block">
            <div className="flex md:flex-row items-center py-2 gap-2 lg:gap-4 justify-between">
              <div className="flex items-center cursor-pointer">
                <FaCalendarAlt className="text-gold mr-2 text-xl" />
                <div>
                  <p className="text-xs text-gray-600 uppercase">
                    DATES ({dateRange[1].diff(dateRange[0], "day")} NIGHT
                    {dateRange[1].diff(dateRange[0], "day") > 1 ? "S" : ""})
                  </p>
                  <RangePicker
                    value={dateRange}
                    onChange={handleDateChange}
                    format={formatDate}
                    className="border-none shadow-none"
                    suffixIcon={null}
                    separator={<span className="mx-2">→</span>}
                    style={{ width: "auto" }}
                  />
                </div>
              </div>
              <Divider type="vertical" className="h-16 border-gold" dashed />
              <div>
                <Select
                  label="ROOMS & GUESTS"
                  value={roomCategoryOptions[0].value}
                  onChange={(value) => dispatch(setCategory(value))}
                  icon={<FaChevronDown />}
                >
                  {roomCategoryOptions.map((item) => (
                    <Option key={item.value} value={item.value}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </div>
              <Divider type="vertical" className="h-16 border-gold" dashed />
              <div>
                <Select
                  label="SORT BY RATE"
                  value="price"
                  onChange={(value) => dispatch(setSort(value))}
                  icon={<FaChevronDown />}
                >
                  <Option value="price">Lowest Rate</Option>
                  <Option value="">Medium Rate</Option>
                  <Option value="-price">High Rate</Option>
                </Select>
              </div>
              <Link to="/view-rates">
                <Button className="bg-gold w-24 md:px-2 normal-case">
                  Check Rate
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile version */}
          <div className="md:hidden">
            <div className="flex flex-col py-2 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gold mr-2 text-xl" />
                  <div>
                    <p className="text-xs text-gray-600 uppercase">DATES</p>
                    <p className="text-sm font-semibold">
                      {formatDate(dateRange[0])} - {formatDate(dateRange[1])}
                    </p>
                  </div>
                </div>
                <FaChevronDown className="text-gold" />
              </div>
              <Divider className="my-0 border-gold" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaUser className="text-gold mr-2 text-xl" />
                  <div>
                    <p className="text-xs text-gray-600 uppercase">ROOMS & GUESTS</p>
                    <p className="text-sm font-semibold">1 Room, 1 Adult</p>
                  </div>
                </div>
                <FaChevronDown className="text-gold" />
              </div>
              <Divider className="my-0 border-gold" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaTag className="text-gold mr-2 text-xl" />
                  <div>
                    <p className="text-xs text-gray-600 uppercase">SPECIAL RATES</p>
                    <p className="text-sm font-semibold">Lowest Regular Rate</p>
                  </div>
                </div>
                <FaChevronDown className="text-gold" />
              </div>
              <Link to="/view-rates" className="mt-2">
                <Button className="bg-gold w-full normal-case">
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