/* eslint-disable react/prop-types */
import { Carousel, IconButton} from "@material-tailwind/react";


export function CarouselCustomNavigation({ images}) {
  
    return (
        <Carousel
            transition={{ duration: 2 }}
            className="rounded-xl py-4 "
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
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-gold" : "w-4 bg-white/50"
                                }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
        >
            {images.map((imageUrl, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                    <img
                        src={imageUrl}
                        alt={`Gallery image ${index + 1}`}
                        className="h-80 flex justify-center items-center overflow-hidden w-full object-cover"
                    />
                </div>
            ))}
           
        </Carousel>
    );
}