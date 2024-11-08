import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useGetFullGalleryQuery } from "../../redux/features/gallery/galleryApi";
import Loading from "../ui/Loading";
import { useEffect, useState } from "react";

const Gallery = () => {
  const { t } = useTranslation();
  const [hotel, setHotel] = useState([]);
  const [dining, setDining] = useState([]);
  const [others, setOthers] = useState([]);
  const [rooms, setRooms] = useState([]);

  const { data, isLoading } = useGetFullGalleryQuery();
  const images = data?.data;

  useEffect(() => {
    if (images) {
      const hotelImages = [];
      const diningImages = [];
      const otherImages = [];
      const roomImages = [];

      images.forEach((image) => {
        if (image.category === 'hotel') {
          hotelImages.push(image);
        } else if (image.category === 'dining') {
          diningImages.push(image);
        } else if (image.category === 'others') {
          otherImages.push(image);
        } else if (image.category === 'room') {
          roomImages.push(image);
        }
      });

      setHotel(hotelImages);
      setDining(diningImages);
      setOthers(otherImages);
      setRooms(roomImages);
    }
  }, [images]);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>
          Gallery | Safa Residency
        </title>
      </Helmet>
      <h1 className="text-center">{t("Gallery.title")}</h1>
      <p className="line"></p>
      <h1 className="text-center my-3">{t("Gallery.hotel")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {hotel?.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg shadow-lg group
              ${index % 5 === 2 ? 'sm:col-span-2 sm:row-span-2' : ''}
              ${index % 5 === 1 ? 'sm:col-span-1 sm:row-span-2' : ''}
              ${index % 6 === 0 ? 'sm:col-span-1 sm:row-span-2' : ''}
              ${index % 5 === 0 ? 'sm:col-span-3 sm:row-span-1' : ''}
              ${index % 5 === 3 || index % 5 === 4 ? 'sm:col-span-1 lg:col-span-2' : ''}
            `}
          >
            <img
              src={image.url}
              alt={`${image.title}`}
              className={`w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105
                ${index % 5 === 2 || index % 6 === 0 || index % 5 === 1 ? 'h-full' : ' sm:h-72 lg:h-80'}
              `}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">{image.title}</p>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-center mb-3 mt-6">{t("Gallery.room")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rooms?.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg shadow-lg group
              ${index % 5 === 2 ? 'sm:col-span-2 sm:row-span-2' : ''}
              ${index % 5 === 1 ? 'sm:col-span-2 sm:row-span-1' : ''}
              ${index % 7 === 1 ? 'sm:col-span-1 sm:row-span-2' : ''}
              ${index % 5 === 0 ? 'sm:col-span-2 sm:row-span-1' : ''}
              ${index % 5 === 3 || index % 5 === 4 ? 'sm:col-span-1 lg:col-span-2' : ''}
            `}
          >
            <img
              src={image.url}
              alt={`${image.title}`}
              className={`w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105
                ${index % 5 === 2 || index % 5 === 1 ? 'h-full' : ' sm:h-72 lg:h-80'}
              `}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">{image.title}</p>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-center mb-3 mt-6">{t("Gallery.dining")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dining?.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg shadow-lg group
              ${index % 5 === 2 ? 'sm:col-span-2 sm:row-span-2' : ''}
              ${index % 5 === 0 ? 'sm:col-span-3 sm:row-span-1' : ''}
              ${index % 5 === 3 || index % 5 === 4 ? 'sm:col-span-1 lg:col-span-2' : ''}
            `}
          >
            <img
              src={image.url}
              alt={`${image.title}`}
              className={`w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105
                ${index % 5 === 2 ? 'h-full' : ' sm:h-72 lg:h-80'}
              `}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">{image.title}</p>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-center mb-3 mt-6">{t("Gallery.other")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {others?.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg shadow-lg group
              ${index % 5 === 2 ? 'sm:col-span-2 sm:row-span-2' : ''}
              ${index % 5 === 1 ? 'sm:col-span-2 sm:row-span-1' : ''}
              ${index % 7 === 1 ? 'sm:col-span-1 sm:row-span-2' : ''}
              ${index % 5 === 0 ? 'sm:col-span-2 sm:row-span-1' : ''}
              ${index % 5 === 3 || index % 5 === 4 ? 'sm:col-span-1 lg:col-span-2' : ''}
            `}
          >
            <img
              src={image.url}
              alt={`${image.title}`}
              className={`w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105
                ${index % 5 === 2 || index % 5 === 1 ? 'h-full' : ' sm:h-72 lg:h-80'}
              `}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">{image.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;