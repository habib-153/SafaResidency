import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../../redux/features/room/roomApi";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import "react-datepicker/dist/react-datepicker.css";
import RoomModal from "../Room/RoomModal";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  currentUser,
  useCurrentToken,
} from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import dayjs from "dayjs";
import { useBookRoomMutation } from "../../../redux/features/booking/bookingApi";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useLazyGetCouponByCodeQuery } from "../../../redux/features/coupon/couponApi";

const Booking = () => {
  const { id } = useParams();
  const { data } = useGetSingleRoomQuery(id);
  const [bookRoom] = useBookRoomMutation();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("");
  const [error, setError] = useState(null);
  const [trigger, { data: couponData, error: couponError }] = useLazyGetCouponByCodeQuery();
  const [coupon, setCoupon] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    sendMail: false,
    mobileNumber: "",
    country: "Bangladesh",
    addressLine1: "",
    addressLine2: "",
  });
  const token = useSelector(useCurrentToken);
  const user = useSelector(currentUser);
  const { date } = useSelector((state) => state.filter);
  const [startDate, endDate] = date;

  const dateRange = date?.map((date) => dayjs(date, "DD-MM-YYYY")) || [];
  const night = dateRange[1].diff(dateRange[0], "day")
    ? dateRange[1].diff(dateRange[0], "day")
    : 1;

  useEffect(() => {
    if (token) {
      const verifiedUser = verifyToken(token);

      if (verifiedUser) {
        const nameParts = user?.name?.split(" ") || [];

        setFormData((prevData) => ({
          ...prevData,
          firstName: nameParts[0] || "",
          lastName: nameParts[nameParts.length - 1] || "",
          email: user?.email || "",
          mobileNumber: user?.phone || "",
        }));
      }
    }
  }, [token, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Booking Room...");

    const payload = {
      room: id,
      user: user
        ? user
        : {
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`,
          },
      startDate: startDate,
      endDate: endDate,
      amount: calculateTotalPrice(),
      coupon: coupon,
      phone: formData.mobileNumber,
      address: `${formData.addressLine1} ${formData.addressLine2}, ${formData.country}`,
    };

    const res = await bookRoom(payload);

    if (res.error) {
      toast.error(res?.error?.data?.message, { id: toastId });
    } else {
      toast.success("Room Booked Successfully, We Will Contact with you soon", {
        id: toastId,
      });
      navigate(user?.role === "user" ? "/user/my-bookings" : "/");
    }
  };

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0.0;
    return night * (data?.data?.price || 0);
  };

  useEffect(() => {
    if (couponError) {
      setError("Invalid coupon code");
      setDiscount(0);
      setDiscountType("");
    } else if (couponData) {
      setDiscount(couponData?.data?.discountValue);
      setDiscountType(couponData?.data?.discountType);
      setCoupon(couponData?.data?._id);
      setError(null);
    }
  }, [couponData, couponError]);

  const handleCouponApply = () => {
    trigger(couponCode);
  };

  const totalPrice = calculateTotalPrice();
  const discountedPrice =
    discountType === "percentage"
      ? totalPrice * (1 - discount / 100)
      : totalPrice - discount;

  return (
    <motion.div
      className="my-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>{`Booking | Safa Residency`}</title>

        <meta
          property="og:title"
          content={
            data?.data?.length > 0
              ? data?.data[0]?.room_overview.name
              : " Booking | Safa Residency"
          }
        />
      </Helmet>
      <Card className="max-w-6xl border mx-auto p-6 bg-white shadow-lg rounded-lg">
        <Typography variant="h3" color="blue-gray" className="mb-6">
          Complete Your Booking
        </Typography>

        <div className="flex flex-col lg:flex-row gap-8">
          <CardBody className="flex-1">
            {!user && (
              <Link to={"/login"}>
                <p className="text-gold hover:underline mb-4 inline-block font-medium">
                  Sign in for Faster Booking
                </p>
              </Link>
            )}

            <Typography variant="h5" color="blue-gray" className="mb-2">
              Guest Information
            </Typography>
            <Typography color="gray" className="mb-4 text-sm">
              All fields are required unless otherwise stated.
            </Typography>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  size="lg"
                  disabled={
                    user && user.role !== "admin" && user.role !== "staff"
                  }
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  size="lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Email Address"
                  name="email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  size="lg"
                  // readOnly={user?.email}
                />
                <Input
                  label="Mobile Number"
                  name="mobileNumber"
                  required
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  size="lg"
                />
              </div>

              <Typography color="gray" className="text-xs italic">
                Note: To be credited for this stay, the name on your Safa
                Residency account must match the guest name.
              </Typography>

              <Checkbox
                required
                name="sendMail"
                checked={formData.sendMail}
                onChange={handleInputChange}
                label="Send my reservation confirmation by E-mail"
                color="amber"
              />

              <Input
                required
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                size="lg"
              />

              <Input
                required
                label="Your Address"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                size="lg"
              />
              <Input
                label="Address Line 2 (Optional)"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                size="lg"
              />

              <motion.div
                className="w-full text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button type="submit" className="btn py-4">
                  Complete Your Booking
                </Button>
              </motion.div>
            </form>
          </CardBody>

          <Card className="flex-1 lg:max-w-sm bg-gray-50 p-2 rounded-lg">
            <CardBody>
              <img
                src={data?.data?.images[0]}
                alt="Room"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex gap-1 justify-between items-center mb-2">
                <Typography variant="h5" color="blue-gray">
                  {data?.data?.room_overview?.name || "1 King Bed, Guest Room"}
                </Typography>
                <RoomModal className="text-gold hover:underline" id={id}>
                  Room Details
                </RoomModal>
              </div>

              <Typography color="gray" className="mt-2">
                <span className="text-gray-600 flex flex-col uppercase">
                  DATES ({night} NIGHT
                  {night > 1 ? "S" : ""})
                  <span>
                    {startDate} - {endDate}
                  </span>
                </span>
              </Typography>
              {/* <Typography color="gray">1 Room, 1 Adult</Typography> */}

              <Link
                to="/view-rates"
                className="text-gold hover:underline block mt-4"
              >
                ← Edit Stay Details
              </Link>
            </CardBody>

            <CardFooter className="pt-4 border-t">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between items-center mb-4"
              >
                <Typography variant="h6" color="blue-gray">
                  Summary of Charges
                </Typography>
                <Typography variant="h4" color="blue-gray">
                  $ {totalPrice.toFixed(2)}
                </Typography>
              </motion.div>

              <div className="flex items-center gap-1 mb-4">
                <Input
                  label="Coupon Code"
                  name="couponCode"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  size="md"
                  className="flex-1 mr-4"
                />
                <Button
                  onClick={handleCouponApply}
                  className="btn py-2 text-sm"
                  color="amber"
                >
                  Apply
                </Button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-red-900"
                >
                  {error}
                </motion.div>
              )}

              {discount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-between items-center mb-4"
                >
                  <Typography color="gray" className="text-right text-sm">
                    Discount (
                    {discountType === "percentage"
                      ? `${discount}%`
                      : `$${discount}`}
                    )
                  </Typography>
                  <Typography variant="h5" color="blue-gray">
                    -${" "}
                    {discountType === "percentage"
                      ? (totalPrice * (discount / 100)).toFixed(2)
                      : discount.toFixed(2)}
                  </Typography>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-between items-center"
              >
                <hr />
                <Typography variant="h6" color="blue-gray">
                  Total
                </Typography>
                <Typography variant="h4" color="blue-gray">
                  $ {discountedPrice.toFixed(2)}
                </Typography>
              </motion.div>
            </CardFooter>
          </Card>
        </div>
      </Card>
    </motion.div>
  );
};

export default Booking;
