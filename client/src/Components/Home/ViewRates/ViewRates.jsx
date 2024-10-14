import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useGetAllRoomQuery } from "../../../redux/features/room/roomApi";
import Loading from "../../ui/Loading";
import { CarouselCustomNavigation } from "./Carousel";
import RoomModal from "../../Accommodation/Room/RoomModal";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const ViewRates = () => {
  const { status, searchTerm, categories, sort, date } = useSelector(
    (state) => state.filter
  );
  const { data, isLoading } = useGetAllRoomQuery({
    status,
    searchTerm,
    categories,
    sort,
    date,
  });

  const rooms = data?.data;

  if (isLoading) return <Loading />;

  return (
    <section className="max-w-5xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {rooms?.length} rooms available
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        {rooms.map((room, index) => (
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
            <div className="p-4 lg:w-2/3 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">
                    {room?.room_overview.name}, {room?.category}
                  </h3>
                  <RoomModal id={room?._id} />
                </div>
                <hr className="border-gray-200 my-2" />
                <p className="text-gray-600">{room?.room_overview?.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-800">
                  Price: ${room?.price}
                </h1>
                <Link to={`/booking/${room?._id}`}>
                  <Button
                    className="bg-gold text-white rounded-full px-6 py-2 text-sm normal-case hover:shadow-md transition-transform duration-200 transform hover:scale-105"
                  >
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
