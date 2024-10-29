/* eslint-disable no-unused-vars */

import { useDispatch, useSelector } from "react-redux";
import { useGetAllRoomQuery } from "../../redux/features/room/roomApi";
import ParallaxSection from "../../Shared/Parallax";
import { useState } from "react";
import { setDate, setStatus } from "../../redux/features/filter/filterSlice";
import RoomModal from "./Room/RoomModal";
import { FAQ } from "./FAQ/FAQ";
import Loading from "../ui/Loading";
import { GetStatusColor } from "../../Dashboard/Admin/roomManagement/RoomManagement";
import { Tag } from "antd";
import { fadeIn } from "../../utils/varients";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Accommodation = () => {
  const { status, searchTerm, categories, sort, date } = useSelector(
    (state) => state.filter
  );
  const { data, isLoading } = useGetAllRoomQuery({
    status,
    searchTerm,
    categories,
    sort,
  });

  const { t } = useTranslation();

  const [active, setActive] = useState(0);
  const facility = [
    {
      text: t("Accommodation.Welcome.description1"),
    },
    {
      text: t("Accommodation.Welcome.description2"),
    },
    {
      text: t("Accommodation.Welcome.description3"),
    },
  ];

  const dispatch = useDispatch();

  //button functionality

  const handleAll = () => {
    dispatch(setStatus(""));
  };

  const generateMetaDescription = () => {
    if (!data?.length) return "Explore our luxury rooms";
    return data?.data[0].room_overview.description
      .replace(/<[^>]*>/g, "")
      .slice(0, 160);
  };

  const generateKeywords = () => {
    if (!data?.length) return "room, beddings";
    const categories = [
      ...new Set(data?.data.flatMap((room) => room.room_overview.name)),
    ];
    return categories.join(", ");
  };

  if (isLoading) return <Loading />;

  return (
    <section className="mx-auto text-center p-2 overflow-hidden">
      <Helmet>
        <title>{`Accommodation | Safa Residency`}</title>
        <meta name="description" content={generateMetaDescription()} />
        <meta name="keywords" content={generateKeywords()} />
        <meta property="og:title" content={" Accommodation | Safa Residency"} />
        <meta property="og:description" content={generateMetaDescription()} />
      </Helmet>
      <div className="max-w-screen-3xl mx-auto">
        <ParallaxSection
          backgroundImage={
            "https://imgeng.jagran.com/images/2022/sep/cover1663055795577.jpg"
          }
        />
        {/* header  */}
        <div className="text-center my-2">
          <div className="bg pt-4 pb-4 md:pb-6 lg:pb-8">
            <div className="max-w-3xl mx-auto ">
              <motion.div
                variants={fadeIn("up", 0.1)}
                initial={"hidden"}
                whileInView={"show"}
                viewport={{ once: true, amount: 0.7 }}
                className=" overflow-hidden text-center"
              >
                <h1 className=" mt-3 md:mt-6 text-base md:text-2xl">
                  {t("Accommodation.Welcome.title")}
                </h1>
                <div className="line"></div>
                <h2 className="text-xl md:text-3xl">
                  {t("Accommodation.Welcome.subtitle")}
                </h2>
              </motion.div>
            </div>
          </div>
          {/* facility */}
          <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3 mx-auto justify-evenly p-3">
            {facility.map((item, index) => (
              <div
                key={index}
                className="mb-3 flex rounded-md p-1 max-w-80 3xl:max-w-[500px]  text-start gap-3 mx-auto"
              >
                <span className=" rounded-l-md p-[2px] bg-gold"></span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* tabs */}
        <div className="mt-3 flex justify-center gap-3">
          <div className="">
            <button
              className={`p-0 my-2 `}
              onClick={() => {
                handleAll();
                setActive(0);
              }}
            >
              {t("Accommodation.Room")}
            </button>
            <p
              className={`p-[2px]  transition-transform       duration-500 ease-in-out
                         ${
                           active === 0
                             ? "bg-gradient-to-r from-[#B17E32] via-[#fff395] to-[#B17E32]  transform translate-x-0 rounded-full"
                             : "transform translate-x-full "
                         }`}
            ></p>
          </div>
        </div>
        <hr className="bg-[#F7F4ED] mb-2 py-[2px] max-w-[80vw] mx-auto rounded-full "></hr>

        {/* cards  */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8 lg:gap-12 3xl:gap-16  mt-4 md:mt-6 lg:mt-8 p-1 md:p-6 overflow-hidden ">
          {data?.data?.map((card, index) => (
            <motion.div
              variants={fadeIn("left", 0.1)}
              initial={"hidden"}
              whileInView={"show"}
              viewport={{ once: true, amount: 0.7 }}
              key={index}
              className="w-[340px] sm:w-[520px] mx-auto overflow-hidden rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <div
                  className="w-full h-72 object-cover transition-transform duration-300 transform hover:scale-110 text-start p-4"
                  style={{
                    backgroundImage: `url(${card.images[1]})`,
                    backgroundSize: "cover",
                  }}
                  // alt={card.room_overview.name}
                >
                  <Tag color={GetStatusColor(card?.status)}>
                    {card.status.toUpperCase()}
                  </Tag>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-30" />
              </div>
              <div className="px-6 py-4 bg-white">
                <h3 className="mb-2 text-xl font-bold  transition-colors duration-300 text-start ">
                  {card.room_overview.name}
                </h3>
                <p className="text-sm text-start">
                  {card.beds_and_bedding.beds}
                </p>

                <hr className="line" style={{ width: "100%" }} />
                <div className="text-center w-full mx-auto">
                  <RoomModal id={card._id} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <FAQ />
      </div>
    </section>
  );
};

export default Accommodation;