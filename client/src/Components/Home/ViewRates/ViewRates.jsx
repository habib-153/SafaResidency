import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useGetAllRoomQuery } from "../../../redux/features/room/roomApi";
import Loading from "../../ui/Loading";
import { CarouselCustomNavigation } from "./Carousel";
import RoomModal from "../../Accommodation/Room/RoomModal";

const ViewRates = () => {
  const { status, searchTerm, categories, sort } = useSelector(
    (state) => state.filter
  );
  const { data, isLoading } = useGetAllRoomQuery({
    status,
    searchTerm,
    categories,
    sort,
  });

  const rooms = data?.data;
  console.log(rooms);
  if (isLoading) return <Loading />;

  return (
    <section className="max-w-screen-xl mx-auto">
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
            className="md:flex flex-col gap-4 w-full  "
          >
            <div className="md:flex items-center justify-between p-4 rounded-md shadow-md">
              <div className="items-center md:w-2/5 gap-2 h-full justify-center ">
                <CarouselCustomNavigation images={room?.images} />
              </div>
              <div className="px-2 w-full md:w-3/5 h-full md:px-3 py-4 flex justify-between text-start">
                <div
                  className="md:flex justify-between "
                >
                  <h3 className="mb-2 text-xl font-bold  transition-colors duration-300 w-full ">
                    {room?.room_overview.name}, {room?.category}
                  </h3>

                  <div className="min-w-28 text-center m-auto ">
                    <RoomModal id={room?._id} />
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
