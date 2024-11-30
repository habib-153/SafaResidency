import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useGetAllRoomQuery } from "../../../redux/features/room/roomApi";
import Loading from "../../ui/Loading";
import { CarouselCustomNavigation } from "./Carousel";
import RoomModal from "../../Accommodation/Room/RoomModal";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import MobileBookingNav from "../MobileBooking/MobileBooking";

const ViewRates = () => {
  const { guests, date } = useSelector(
    (state) => state.filter
  );
  const { data, isLoading } = useGetAllRoomQuery({
    status: 'available',
    page: 1,
    limit: 30,
    guests,
    date,
  });

  const rooms = data?.data;

  const getUniqueRoomsByCategory = (rooms) => {
    if (!rooms) return [];
    
    const categoryMap = new Map();
    
    rooms.forEach(room => {
      if (!categoryMap.has(room?.category)) {
        categoryMap.set(room?.category, room);
      }
    });

    return Array.from(categoryMap.values());
  };

  if (isLoading) return <Loading />;

  return (
    <section className="max-w-5xl mx-auto px-4">
      <MobileBookingNav />
      <div className="mt-3 md:mt-0">
        <h1 className="text-2xl font-semibold text-gray-800">
          {getUniqueRoomsByCategory(rooms)?.length} rooms available
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        {getUniqueRoomsByCategory(rooms)?.map((room, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row"
          >
            <div className="lg:w-1/3">
              <CarouselCustomNavigation images={room?.images} />
            </div>
            <div className="p-4 md:p-6 lg:p-8 lg:w-2/3 flex flex-col justify-around space-y-2">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                    {room?.category}, {room?.beds_and_bedding?.beds}
                  </h3>
                  <RoomModal id={room?._id} />
                </div>
                <hr className="border-gray-200 my-2" />
                <p className="text-gray-600">
                  {room?.room_overview?.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="md:text-xl font-semibold text-gray-800">
                  Price: ${room?.price}
                </h1>
                <Link to={`/booking/${room?._id}`}>
                  <Button className="bg-gold text-white rounded-full px-6 py-2 md:text-xl normal-case hover:shadow-md transition-transform duration-200 transform hover:scale-105">
                    Book Room
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ViewRates;
