import { Button } from "@material-tailwind/react";
import { FaRegEnvelopeOpen } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlinePhone } from "react-icons/md";
import BottomNav from "./BottomNav";
import StickyNav from "./StickyNav";

const Nav = () => {
  return (
    <>
      <header className="py-3">
        <nav className="relative hidden md:block ">
          <span className="header-shape"></span>
          <div className="max-w-screen-3xl mx-auto flex justify-between">
            <Link
              to="/"
              className="flex items-center w-3/5 sm:w-1/3 z-50 logo-box gap-2"
            >
              <img
              loading="lazy"
              src="safa-logo.png"
              className="w-24 md:w-44 2xl:w-52 2xl:h-24 h-20"
              alt="safa logo"
            />
            </Link>
            <div className="w-2/5 sm:w-2/3 flex justify-end items-center gap-8">
              <a
                href="mailto:safa.residency.bd@gmail.com"
                className="hidden sm:flex justify-center items-center gap-2 hover:text-gold transition"
              >
                <FaRegEnvelopeOpen className="text-gold" />
                <p className="">safa.residency.bd@gmail.com</p>
              </a>

              <a
                href="tel:+8801234567899"
                className="hidden lg:flex justify-center items-center gap-2 hover:text-gold transition"
              >
                <MdOutlinePhone className="text-gold text-lg" />
                <p className="">+880 1111 123456</p>
              </a>

              <Link to="/accommodation">
                <Button className="bg-[#dfc967] rounded-full m-0 normal-case">
                  View Rates
                </Button>
              </Link>
            </div>
          </div>
        </nav>
        <BottomNav />
      </header>
      <StickyNav />
    </>
  );
};

export default Nav;
