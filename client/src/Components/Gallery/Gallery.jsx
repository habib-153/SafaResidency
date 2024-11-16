import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import { useGetFullGalleryQuery } from "../../redux/features/gallery/galleryApi";
import Loading from "../ui/Loading";
import { useEffect, useState } from "react";

const Gallery = () => {
  const { t } = useTranslation();
  const [hotel, setHotel] = useState([]);
  const [dining, setDining] = useState([]);
  const [others, setOthers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [event, setEvent] = useState([]);

  const { data, isLoading } = useGetFullGalleryQuery();
  const images = data?.data;

  useEffect(() => {
    if (images) {
      const hotelImages = [];
      const diningImages = [];
      const otherImages = [];
      const roomImages = [];
      const eventImages = [];

      images.forEach((image) => {
        if (image.category === "hotel") {
          hotelImages.push(image);
        } else if (image.category === "dining") {
          diningImages.push(image);
        } else if (image.category === "others") {
          otherImages.push(image);
        } else if (image.category === "room") {
          roomImages.push(image);
        } else if (image.category === "event") {
          eventImages.push(image);
        }
      });

      setHotel(hotelImages);
      setDining(diningImages);
      setOthers(otherImages);
      setRooms(roomImages);
      setEvent(eventImages);
    }
  }, [images]);

  if (isLoading) return <Loading />;

  const items = [
    {
      key: "1",
      label: t("Gallery.hotel"),
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hotel?.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg group
                ${index % 5 === 2 ? "sm:col-span-2 sm:row-span-2" : ""}
                ${index % 5 === 1 ? "sm:col-span-1 sm:row-span-2" : ""}
                ${index % 6 === 0 ? "sm:col-span-1 sm:row-span-2" : ""}
                ${index % 5 === 0 ? "sm:col-span-3 sm:row-span-1" : ""}
                ${
                  index % 5 === 3 || index % 5 === 4
                    ? "sm:col-span-1 lg:col-span-2"
                    : ""
                }
              `}
            >
              <img
                src={image.url}
                alt={`${image.title}`}
                className={`w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105
                  ${
                    index % 5 === 2 || index % 6 === 0 || index % 5 === 1
                      ? "h-full"
                      : " sm:h-72 lg:h-80"
                  }
                `}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: t("Gallery.room"),
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rooms?.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg group
                ${index % 5 === 2 ? "sm:col-span-2 sm:row-span-2" : ""}
                ${index % 5 === 1 ? "sm:col-span-2 sm:row-span-1" : ""}
                ${index % 7 === 1 ? "sm:col-span-1 sm:row-span-2" : ""}
                ${index % 5 === 0 ? "sm:col-span-2 sm:row-span-1" : ""}
                ${
                  index % 5 === 3 || index % 5 === 4
                    ? "sm:col-span-1 lg:col-span-2"
                    : ""
                }
              `}
            >
              <img
                src={image.url}
                alt={`${image.title}`}
                className={`w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105
                  ${
                    index % 5 === 2 || index % 5 === 1
                      ? "h-full"
                      : " sm:h-72 lg:h-80"
                  }
                `}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "3",
      label: t("Gallery.dining"),
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dining?.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg group
                ${index % 5 === 2 ? "sm:col-span-2 sm:row-span-2" : ""}
                ${index % 5 === 0 ? "sm:col-span-3 sm:row-span-1" : ""}
                ${
                  index % 5 === 3 || index % 5 === 4
                    ? "sm:col-span-1 lg:col-span-2"
                    : ""
                }
              `}
            >
              <img
                src={image.url}
                alt={`${image.title}`}
                className={`w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105
                  ${index % 5 === 2 ? "h-full" : " sm:h-72 lg:h-80"}
                `}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "5",
      label: t("Gallery.event"),
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {event?.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg group
                ${index % 5 === 2 ? "sm:col-span-2 sm:row-span-2" : ""}
                ${index % 5 === 1 ? "sm:col-span-1 sm:row-span-2" : ""}
                ${index % 6 === 0 ? "sm:col-span-1 sm:row-span-2" : ""}
                ${index % 5 === 0 ? "sm:col-span-3 sm:row-span-1" : ""}
                ${
                  index % 5 === 3 || index % 5 === 4
                    ? "sm:col-span-1 lg:col-span-2"
                    : ""
                }
              `}
            >
              <img
                src={image.url}
                alt={`${image.title}`}
                className={`w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105
                  ${
                    index % 5 === 2 || index % 6 === 0 || index % 5 === 1
                      ? "h-full"
                      : " sm:h-72 lg:h-80"
                  }
                `}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "4",
      label: t("Gallery.other"),
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {others?.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg group
                ${index % 5 === 2 ? "sm:col-span-2 sm:row-span-2" : ""}
                ${index % 5 === 1 ? "sm:col-span-2 sm:row-span-1" : ""}
                ${index % 7 === 1 ? "sm:col-span-1 sm:row-span-2" : ""}
                ${index % 5 === 0 ? "sm:col-span-2 sm:row-span-1" : ""}
                ${
                  index % 5 === 3 || index % 5 === 4
                    ? "sm:col-span-1 lg:col-span-2"
                    : ""
                }
              `}
            >
              <img
                src={image.url}
                alt={`${image.title}`}
                className={`w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105
                  ${
                    index % 5 === 2 || index % 5 === 1
                      ? "h-full"
                      : " sm:h-72 lg:h-80"
                  }
                `}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{`Gallery | Safa Residency`}</title>

        <meta property="og:title" content={" Gallery | Safa Residency"} />
        <meta name="title" content="Safa Residency Dhaka" />
        <meta
          name="description"
          content="Luxury Hotel in Dhaka - Safa Residency offers premium accommodation and dining services in the heart of Dhaka city."
        />
        <meta
          name="keywords"
          content="Safa, Residency, Hotel in Dhaka, Luxury Hotel, Dhaka Hotel, Safa Residency, Safa view, Safa residency view "
        />

        {/* Open Graph Meta Tags for social sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://safaresidency.com/gallery" />
        <meta property="og:title" content="Safa Residency Dhaka | Gallery" />
        <meta
          property="og:description"
          content="Experience luxury stay at Safa Residency, the premium hotel in Dhaka."
        />
      </Helmet>
      <h1 className="text-center">{t("Gallery.title")}</h1>
      <p className="line"></p>
      <Tabs
        defaultActiveKey="1"
        items={items}
        className="mt-6 custom-tabs"
        centered
        size="large"
        tabPosition={window.innerWidth <= 768 ? "top" : "top"}
        tabBarGutter={window.innerWidth <= 768 ? 20 : 30}
        style={{
          ".antTabsNav": {
            marginBottom: "2rem",
          },
          ".antTabsTab": {
            padding: window.innerWidth <= 768 ? "8px 12px" : "12px 16px",
          },
        }}
      />
    </div>
  );
};
export default Gallery;
