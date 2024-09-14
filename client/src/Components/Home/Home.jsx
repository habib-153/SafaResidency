import { CarouselCustomNavigation } from "./Carousel/Carousel";
import Welcome from "./Welcome/Welcome";

const Home = () => {
    return (
        <section>
            <CarouselCustomNavigation />
            <div className="max-w-screen-3xl mx-auto">
                 <Welcome/>
            </div>
           
        </section>
    );
};

export default Home;