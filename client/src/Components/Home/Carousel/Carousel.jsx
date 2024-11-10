import { Carousel, IconButton } from "@material-tailwind/react";
// import { Link } from "react-router-dom";
// import { Player } from '@lottiefiles/react-lottie-player';
// import animationData from './banner.json';

export function CarouselCustomNavigation() {
  return (
    <Carousel
      autoplay={true}
      autoplayDelay={4000}
      loop={true}
      transition={{
        duration: 2,
      }}
      className="rounded-xl"
      prevArrow={({ handlePrev }) => (
        <IconButton
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4 text-gold  bg-white bg-opacity-30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4 text-gold bg-white bg-opacity-30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-gold" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <img
        src="https://res.cloudinary.com/daakgp09p/image/upload/v1726552387/lk-in-mbr-0342-1646227208-N8TtC_n3ays2.jpg"
        className="md:h-full w-full object-cover overflow-hidden h-[400px] md:max-h-[80vh] 3xl:max-h-[700px]  "
      />
      <img
        src="https://imgeng.jagran.com/images/2022/sep/cover1663055795577.jpg "
        alt="image 2"
        className="md:h-full w-full object-cover h-[400px] md:max-h-[80vh] 3xl:max-h-[700px] "
      />
      <img
        src="https://res.cloudinary.com/daakgp09p/image/upload/v1726552387/lk-in-mbr-0342-1646227208-N8TtC_n3ays2.jpg"
        alt="image 3"
        className="md:h-full w-full object-cover h-[400px] md:max-h-[80vh] 3xl:max-h-[700px] "
      />

      {/* in case of content */}

      {/* <div className="relative md:h-full w-full ">
                <img
                    src="https://imgeng.jagran.com/images/2022/sep/cover1663055795577.jpg"
                    alt="image 1"
                    className="md:h-full w-full object-cover h-[400px] md:max-h-[80vh] 3xl:max-h-[700px] "
                />
                <div className="absolute inset-0 grid md:h-full w-full place-items-center bg-[#4F2E1D] bg-opacity-50">
                    <div className="w-3/4 text-center md:w-2/4">
                        <Typography
                            variant="h1"
                            color="white"
                            className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                        >
                            The Beauty of Nature
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            className="mb-12 opacity-80"
                        >
                            It is not so much for its beauty that the forest makes a claim
                            upon men&apos;s hearts, as for that subtle something, that quality
                            of air that emanation from old trees, that so wonderfully changes
                            and renews a weary spirit.
                        </Typography>
                        <div className="flex justify-center gap-2">
                            <Link to={'/accommodation'}>
                                   <Button size="lg" color="white" className="btn ">
                                Accommodation
                            </Button>
                            </Link>
                            <Link to={'/dining'}>
                            <Button size="lg" color="white" variant="text">
                                Dining
                                </Button>
                                </Link>
                        </div>
                    </div>
                </div>
            </div> */}
    </Carousel>
    //        <div
    //   className="md:h-full w-full overflow-hidden h-full md:max-h-[80vh] 3xl:max-h-[700px] flex justify-center items-center mx-auto">
    //   <Player
    //     autoplay
    //     loop
    //     src={animationData}
    //     renderer={'svg'}
    //     rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
    //     className="w-full h-full max-h-[100%] mx-auto"
    //   />
    // </div>
  );
}
