import { Carousel } from "@material-tailwind/react";
import { useState, useEffect, useMemo } from "react";

export function HomeCarousel() {
  const [isLoading, setIsLoading] = useState(true);

  const images = useMemo(() => [
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
  ], []);

  // Improved image preloading
  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = images.map((image, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          
          // Set loading priority for first image
          if (index === 0) {
            img.fetchPriority = "high";
            img.loading = "eager";
          } else {
            img.loading = "lazy";
          }
          
          img.onload = resolve;
          img.onerror = reject;
          img.src = image.original;
        });
      });

      Promise.all(imagePromises)
        .then(() => setIsLoading(false))
        .catch(console.error);
    };

    preloadImages();
  }, [images]);

  // const ArrowButton = ({ direction, onClick }) => (
  //   <IconButton
  //     size="lg"
  //     onClick={onClick}
  //     className={`!absolute top-2/4 ${
  //       direction === 'prev' ? 'left-4' : '!right-4'
  //     } -translate-y-2/4 text-gold bg-white/30 hover:bg-white/50 transition-all`}
  //   >
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth={2}
  //       stroke="currentColor"
  //       className="h-6 w-6"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d={direction === 'prev' 
  //           ? "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
  //           : "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
  //         }
  //       />
  //     </svg>
  //   </IconButton>
  // );

  return (
    <div className="relative h-[500px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div 
            className="w-full h-full bg-gray-200"
            style={{
              backgroundImage: `url(${images[0].placeholder})`,
              backgroundSize: 'cover',
              filter: 'blur(10px)',
              transform: 'scale(1.1)'
            }}
          />
        </div>
      )}
      
      <Carousel
        autoplay={true}
        autoplayDelay={20000}
        loop={true}
        className="rounded-xl h-full"
      >
        {images.map((image, index) => (
          <div key={index} className="relative h-full w-full">
            <img
              src={image.original}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              width={800}
              height={500}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}