import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState, useRef } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import {Link} from "react-router-dom"
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Pagination, Navigation } from "swiper/modules";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const swiperRef = useRef(null); // Ref for Swiper instance

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

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
    <section className=" mt-4 md:mt-6 h-full p-4 md:p-8 lg:p-16">
      <div className="header-container md:flex items-center justify-between">
        <h1 className=" text-3xl">Rooms & Suites</h1>
        <div className="navigation-buttons flex gap-5 justify-between mt-3">
          <button className="flex gap-2 items-center prev" onClick={handlePrev}>
            <FaArrowLeftLong className="text-3xl" /> Prev
          </button>
          <button className="flex gap-2 next items-center" onClick={handleNext}>
            Next <FaArrowRightLong className="text-3xl" />
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
        className="mySwiper "
      >
        {categories.map((category, index) => (
          <SwiperSlide
            className="swiper-slide flex-col rounded-md"
            key={index}
            tabIndex={0}
          >
            <img
              src={category.image}
              alt={category.category}
              className="w-full h-56 object-cover rounded-lg shadow-lg"
            />
            <Link>
                <h2 className="text-xl font-medium my-4 text-center">
              {category.category}
            </h2>
            </Link>
            
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Categories;
