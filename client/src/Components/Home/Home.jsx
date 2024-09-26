import { CarouselCustomNavigation } from "./Carousel/Carousel";
import Categories from "./Categories/Categories";
import { FAQ } from "./FAQ/FAQ";
import Features from "./Features/Features";
import Location from "./Location/Location";
import Ratings from "./Ratings/Ratings";

import Welcome from "./Welcome/Welcome";

const Home = () => {
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
            </div>
        </section>
    );
};

export default Home;