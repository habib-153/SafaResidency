import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>{`Home | Safa Residency`}</title>

        <meta property="og:title" content={" Home | Safa Residency"} />
        <meta name="title" content="Safa Residency Dhaka" />
        <meta
          name="description"
          content="Luxury Hotel in Dhaka - Safa Residency offers premium accommodation and dining services in the heart of Dhaka city."
        />
        <meta
          name="keywords"
          content="Safa, Residency, Hotel in Dhaka, Luxury Hotel, Dhaka Hotel, Safa Residency, "
        />

        {/* Open Graph Meta Tags for social sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://safaresidency.com/" />
        <meta
          property="og:title"
          content="Safa Residency Dhaka | Luxury Hotel"
        />
        <meta
          property="og:description"
          content="Experience luxury stay at Safa Residency, the premium hotel in Dhaka."
        />
      </Helmet>
      <CarouselCustomNavigation />
      <Ratings />
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
