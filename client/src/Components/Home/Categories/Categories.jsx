import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { GoHorizontalRule } from "react-icons/go";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Pagination, Navigation } from "swiper/modules";
import { useDispatch } from "react-redux";
import { setCategory } from "../../../redux/features/filter/filterSlice";
import { fadeIn } from "../../../utils/varients";
import { useTranslation } from "react-i18next";
import luxuryTwin from "../../../assets/Home/Categories/Luxury_twins.jpg";
import standard from "../../../assets/Home/Categories/standard.jpg";
import luxuryDeluxe from "../../../assets/Home/Categories/Luxury_deluxe.jpg";
import deluxeSupreme from "../../../assets/Home/Categories/Dulux_supreme.jpg";
import deluxeTwin from "../../../assets/Home/Categories/Deluxe_twins.jpg";
import executiveSuite from "../../../assets/Home/Categories/Executive_suite.jpg";

const Categories = () => {
  const categories = [
    {
      category: "Luxury Twin",
      image: luxuryTwin,
    },
    {
      category: "Standard",
      image: standard,
    },
    {
      category: "Luxury Deluxe",
      image: luxuryDeluxe,
    },
    {
      category: "Deluxe Supreme",
      image: deluxeSupreme,
    },
    {
      category: "Deluxe Twin",
      image: deluxeTwin,
    },
    {
      category: "Executive Suite",
      image: executiveSuite,
    },
  ];
  const swiperRef = useRef(null); // Ref for Swiper instance
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev(); // Slide to previous
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext(); // Slide to next
    }
  };

  return (
    <section className=" mt-4 bg md:mt-6 h-full p-2 md:p-8 lg:p-16 overflow-hidden">
      <motion.div
        variants={fadeIn("left", 0.1)}
        initial={"hidden"}
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="max-w-screen-3xl"
      >
        <div className="header-container md:flex items-center justify-between">
          <h1 className=" text-xl md:text-3xl">{t("home.Category.title")}</h1>
          <div className="navigation-buttons flex gap-5 justify-between mx-3 mt-3">
            <button
              className="flex gap-2 group items-center prev "
              onClick={handlePrev}
            >
              <GoHorizontalRule className="group-hover:hidden text-3xl" />
              <FaArrowLeftLong className="text-3xl hidden group-hover:inline" />
              {t("home.Category.btn1")}
            </button>
            <button
              className="flex group gap-2 next items-center "
              onClick={handleNext}
            >
              {t("home.Category.btn2")}{" "}
              <FaArrowRightLong className="text-3xl hidden group-hover:inline" />
              <GoHorizontalRule className="group-hover:hidden text-3xl transition-all duration-300" />
            </button>
          </div>
        </div>
        <Swiper
          ref={swiperRef} // Assign ref to Swiper
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 50 },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper gap-3"
        >
          {categories.map((category, index) => (
            <SwiperSlide
              className="swiper-slide flex-col rounded-md cursor-grab active:cursor-grabbing "
              key={index}
              tabIndex={0}
            >
              <Link
                to={"/accommodation"}
                onClick={() => dispatch(setCategory(category?.category))}
                className=""
              >
                <div className="w-full">
                  <img
                    src={category?.image}
                    alt={category.category}
                    className="w-full min-w-80 h-56 object-cover rounded-lg shadow-lg"
                  />

                  <h2 className="md:text-xl flex gap-3 text-center font-medium my-4 items-center justify-center">
                    {category.category}

                    <FaSquareArrowUpRight className="text-gold font-medium " />
                  </h2>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default Categories;
