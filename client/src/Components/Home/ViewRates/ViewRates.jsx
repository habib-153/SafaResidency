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
    <section className="max-w-screen-xl mx-auto p-1 md:0-2 lg:p-4">
      <div>
        <h1 className="text-xl">{rooms.length} rooms available.</h1>
        <div className="flex"></div>
      </div>

      <div className="w-full">
        {rooms.map((room, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-72 "
          >
            <div className="md:flex items-center justify-between p-4 rounded-md shadow-md">
              <div className="items-center md:w-2/5 gap-2 h-full justify-center ">
                <CarouselCustomNavigation images={room?.images} />
              </div>
              <div className="px-2 w-full md:w-3/5 h-full md:px-3 py-6 text-start">
                <div className="md:flex justify-between gap-4 items-center">
                  <h3 className="mb-2 text-2xl font-bold  transition-colors duration-300 w-full ">
                    {room?.room_overview.name}, {room?.category}
                  </h3>

                  <div className="min-w-28 text-center m-auto mt-1">
                    <RoomModal id={room?._id} />
                  </div>
                </div>
                <hr className="my-2" />
                <div className="">
                  <p className="my-2">{room?.room_overview?.description}</p>
                  <div className="flex justify-between">
                    <h1 className="text-xl">Price: {room?.price}</h1>

                    {/* might needs to be updated */}

                    <Link to={`/booking/${room?._id}`}>
                      <Button className="bg-gold rounded-full m-0 normal-case">
                        Book Room
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ViewRates;
