/* eslint-disable react/prop-types */
import  { useState } from "react";
import { Select, Option, Button } from "@material-tailwind/react";
import {
  FaCalendarAlt,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Divider, DatePicker } from "antd";
import dayjs from "dayjs";
import {roomCategoryOptions2 } from "../../utils/constant";
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
 // console.log(roomCategoryOptions2)
  const dispatch = useDispatch();

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
      const date = dates.map((date) => date.format("DD-MM-YYYY"));
      dispatch(setDate(date));
    }
  };

  const formatDate = (date) => date.format("ddd, MMM D");

  const handleCategoryChange = (value) => {
    const categories = value.split(', ')
    dispatch(setCategory(categories));
    // console.log(categories)
    // categories.map((category) => {
    //   console.log(category)
    //   dispatch(setCategory(category));

    // })
  }
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
                  value={roomCategoryOptions2[0].value}
                  onChange={(value) => handleCategoryChange(value)}
                  icon={<FaChevronDown />}
                >
                  {roomCategoryOptions2.map((item) => (
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
        </motion.div> 
      </div>
    </div>
    </div>
    
  );
};

export default BookingNav;