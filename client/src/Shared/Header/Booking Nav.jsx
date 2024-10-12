import { useState } from "react";
import { Select, Option, Button } from "@material-tailwind/react";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Divider, DatePicker } from "antd";
import dayjs from "dayjs";
import { roomCategoryOptions } from "../../utils/constant";
import { useDispatch } from "react-redux";
import {
  setCategory,
  setDate,
  setRates,
} from "../../redux/features/filter/filterSlice";
import { motion } from "framer-motion"; // Import Framer Motion

const { RangePicker } = DatePicker;

const BookingNav = () => {
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(1, "day")]);
  const [isNavVisible, setIsNavVisible] = useState(true); // State to control visibility
  const dispatch = useDispatch();

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
      const date = dates.map((date) => date.format("YYYY-MM-DD"));
      dispatch(setDate(date));
    }
  };

  const formatDate = (date) => date.format("ddd, MMM D");

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div
      className={`max-w-screen-3xl mx-auto ${
        isNavVisible ? "bg-white shadow border" : "mt-1"
      } px-2 relative z-50`}
    >
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isNavVisible ? "auto" : 0, opacity: isNavVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden flex-1"
        >
          <div className="hidden md:block">
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
              <div className="">
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
              <div className="">
                <Select
                  label="SPECIAL RATES"
                  value="low"
                  onChange={(value) => dispatch(setRates(value))}
                  icon={<FaChevronDown />}
                >
                  <Option value="low">Lowest Rate</Option>
                  <Option value="medium">Medium Rate</Option>
                  <Option value="high">High Rate</Option>
                </Select>
              </div>
              <Link to="/view-rates">
                <Button className="bg-gold w-24 md:px-2 normal-case">
                  View Rates
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
        <div className={`${!isNavVisible ? "w-full text-right" : ""}`}>
          <button
            onClick={toggleNavVisibility}
            className="bg-[#c49a3b] p-2 rounded-full"
            aria-label="Toggle Navigation"
          >
            {isNavVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingNav;