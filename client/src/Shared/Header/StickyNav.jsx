import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import BottomNav from "./BottomNav";
import Headroom from "react-headroom";
import BookingNav from "./Booking Nav";
import { useLocation } from "react-router-dom";

const StickyNav = () => {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const isBookingPage = location.pathname.startsWith("/booking/");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav style={{ zIndex: 1000 }}
        className={`fixed top-0 left-0 right-0 transition-all ${
          showNav ? "" : "-mt-44"
        }`}
      >
        <div className="z-50">
          <Headroom disableInlineStyles>
            <div>
              <BottomNav />
              {!isBookingPage && <BookingNav />}
            </div>
          </Headroom>
        </div>
      </nav>

      <div className="flex gap-2">
        <button
          className={` z-50 animate-bounce hover:animate-none text-white fixed p-3 rounded-full shadow-lg bg-[#c98929e8] transition duration-500 hover:bg-[#B17E32] ${
            showNav
              ? "bottom-4 right-4 transition duration-500 opacity-100 ease-in-out"
              : "opacity-0 ease-in-out transition duration-500 "
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp className="text-xl" />
        </button>
      </div>
    </>
  );
};

export default StickyNav;
