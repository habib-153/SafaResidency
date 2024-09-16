import { CarouselCustomNavigation } from "./Carousel/Carousel";
import Features from "./Features/Features";
import Location from "./Location/Location";
import Rooms from "./Rooms/Rooms";
import Welcome from "./Welcome/Welcome";

const Home = () => {
    return (
        <section>
            <CarouselCustomNavigation />
            <div className="max-w-screen-3xl mx-auto">
                <Welcome />
                <Rooms />
                <Features />
                <Location/>
            </div>
        </section>
    );
};

export default Home;