import { Link } from "react-router-dom";
import { CarouselCustomNavigation } from "./Carousel/Carousel";
import Categories from "./Categories/Categories";
import { FAQ } from "./FAQ/FAQ";
import Features from "./Features/Features";
import Location from "./Location/Location";
import Ratings from "./Ratings/Ratings";

import Welcome from "./Welcome/Welcome";
import { useEffect, useState } from "react";

const Home = () => {
    const [showNav, setShowNav] = useState(false);

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
        <section>
            <CarouselCustomNavigation />
            <Ratings/>
            <div className="max-w-screen-3xl mx-auto">
                <Welcome />
                <Categories />
                <Features />
                <Location />
                <FAQ />
                   <nav
                className={`fixed z-50 top-0 left-0 right-0 transition-all ${showNav ? "" : "-mt-20"
                    }`}
                >
                  {
                    showNav &&   <Link to={'/booking'}>
                    
                      <button className={` z-50 animate-bounce  hover:animate-none text-white fixed p-2 px-4 rounded-full shadow-lg bg-[#c98929e8]  transition duration-500 hover:bg-[#B17E32] ${showNav ? "bottom-4 left-4 transition duration-500 opacity-100 ease-in-out" : "opacity-0 ease-in-out transition duration-500 "} md:hidden`}
               
                >
                    Reserve a Room
                </button>
                </Link>
                }  
            </nav>
                
              
            </div>
        </section>
    );
};

export default Home;