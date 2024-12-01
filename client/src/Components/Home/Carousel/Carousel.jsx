/* eslint-disable react/prop-types */
import { Carousel, IconButton } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export function CarouselCustomNavigation() {
  const [isLoading, setIsLoading] = useState(true);

  const images = [
    {
      original: "https://res.cloudinary.com/dmjdmceem/image/upload/q_auto,f_auto/v1731740196/20241108_180611_a58f0s.jpg",
      thumbnail: "https://res.cloudinary.com/dmjdmceem/image/upload/w_50,q_10/v1731740196/20241108_180611_a58f0s.jpg",
    },
    {
      original: "https://res.cloudinary.com/dmjdmceem/image/upload/q_auto,f_auto/v1731740276/IMG_9616_1_wwe2yj.jpg",
      thumbnail: "https://res.cloudinary.com/dmjdmceem/image/upload/w_50,q_10/v1731740276/IMG_9616_1_wwe2yj.jpg",
    },
    {
      original: "https://res.cloudinary.com/dmjdmceem/image/upload/q_auto,f_auto/v1731740317/20241108_181158_2_eeowvc.jpg",
      thumbnail: "https://res.cloudinary.com/dmjdmceem/image/upload/w_50,q_10/v1731740317/20241108_181158_2_eeowvc.jpg",
    }
  ];

  // Improved image preloading
  useEffect(() => {
    let loadedImages = 0;
    const totalImages = images.length;

    images.forEach(image => {
      const img = new Image();
      img.onload = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${image.original}`);
        loadedImages++;
        if (loadedImages === totalImages) {
          setIsLoading(false);
        }
      };
      img.src = image.original;
    });
  }, []);

  const ArrowButton = ({ direction, onClick }) => (
    <IconButton
      size="lg"
      onClick={onClick}
      className={`!absolute top-2/4 ${
        direction === 'prev' ? 'left-4' : '!right-4'
      } -translate-y-2/4 text-gold bg-white/30 hover:bg-white/50 transition-all`}
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
          d={direction === 'prev' 
            ? "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            : "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          }
        />
      </svg>
    </IconButton>
  );

  return (
    <div className="relative h-[500px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
        </div>
      )}
      
      <Carousel
        autoplay={true}
        autoplayDelay={9000}
        loop={true}
        transition={{ duration: 0.9 }}
        className="rounded-xl h-full"
        prevArrow={({ handlePrev }) => (
          <ArrowButton direction="prev" onClick={handlePrev} />
        )}
        nextArrow={({ handleNext }) => (
          <ArrowButton direction="next" onClick={handleNext} />
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
        {images?.map((image, index) => (
          <div key={index} className="relative h-full w-full">
            <img
              src={image.original} // Fixed: Use image.original instead of image
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              width={800}
              height={500}
              onError={(e) => {
                console.error(`Error loading image ${index + 1}`);
                e.target.src = "fallback-image-url.jpg"; // Add a fallback image
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}