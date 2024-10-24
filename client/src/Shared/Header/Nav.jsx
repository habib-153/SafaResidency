import { FaRegEnvelopeOpen } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { MdOutlinePhone } from "react-icons/md";
import BottomNav from "./BottomNav";
import StickyNav from "./StickyNav";
import BookingNav from "./Booking Nav";
import logo from "/safa-logo.png";

const Nav = () => {
  const location = useLocation();
  const isBookingPage = location.pathname.startsWith("/booking/");

  return (
    <>
      <header className="">
        <nav className="relative hidden md:block ">
          <span className="header-shape"></span>
          <div className="max-w-screen-3xl mx-auto flex justify-between">
            <Link
              to="/"
              className="flex items-center w-3/5 sm:w-1/3 z-50 logo-box gap-2"
            >
              <img
                loading="lazy"
                src={logo}
                className="w-28 md:w-44 2xl:w-52 2xl:h-24 h-20"
                alt="safa logo"
              />
            </Link>
            <div className="w-2/5 sm:w-2/3 flex justify-end pr-3 items-center gap-8">
              <a
                href="mailto:info@safaresidency.com"
                className="hidden sm:flex justify-center items-center gap-2 hover:text-gold transition"
              >
                <FaRegEnvelopeOpen className="text-gold" />
                <p className="">info@safaresidency.com</p>
              </a>

              <a
                href="tel:+8801234567899"
                className="hidden lg:flex justify-center items-center gap-2 hover:text-gold transition"
              >
                <MdOutlinePhone className="text-gold text-lg" />
                <p className="">+8801831-335222</p>
              </a>

              {/* <Link to="/view-rates">
                <Button className="bg-gold rounded-full m-0 normal-case">
                  View Rates
                </Button>
              </Link> */}
            </div>
          </div>
        </nav>
        <BottomNav />
        {!isBookingPage && <BookingNav />}
      </header>
      <StickyNav />
    </>
  );
};

export default Nav;
