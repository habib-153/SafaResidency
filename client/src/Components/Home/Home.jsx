import { CarouselCustomNavigation } from "./Carousel/Carousel";
import Categories from "./Categories/Categories";
import Features from "./Features/Features";
import Location from "./Location/Location";

import Welcome from "./Welcome/Welcome";

const Home = () => {
    return (
        <section>
            <CarouselCustomNavigation />
            <div className="max-w-screen-3xl mx-auto">
                <Welcome />
                <Categories />
                <Features />
                <Location/>
            </div>
        </section>
    );
};

export default Home;