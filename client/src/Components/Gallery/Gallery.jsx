/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import { useGetFullGalleryQuery } from "../../redux/features/gallery/galleryApi";
import Loading from "../ui/Loading";
import { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Image optimization utility
const getOptimizedImageUrl = (url, width) => {
  if (url.includes('cloudinary')) {
    return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`);
  }
  return url;
};

const GalleryImage = ({ image, index }) => (
  <div
    key={index}
    className={`relative overflow-hidden rounded-lg shadow-lg group
      ${index % 5 === 2 ? "sm:col-span-2 sm:row-span-2" : ""}
      ${index % 5 === 1 ? "sm:col-span-1 sm:row-span-2" : ""}
      ${index % 6 === 0 ? "sm:col-span-1 sm:row-span-2" : ""}
      ${index % 5 === 0 ? "sm:col-span-3 sm:row-span-1" : ""}
      ${index % 5 === 3 || index % 5 === 4 ? "sm:col-span-1 lg:col-span-2" : ""}
    `}
  >
    <LazyLoadImage
      src={getOptimizedImageUrl(image.url, 800)}
      alt={image.title}
      effect="blur"
      placeholderSrc={getOptimizedImageUrl(image.url, 50)}
      className={`w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105
        ${index % 5 === 2 || index % 6 === 0 || index % 5 === 1 ? "h-full" : "sm:h-72 lg:h-80"}
      `}
      wrapperClassName="w-full h-full"
      loading="lazy"
      srcSet={`
        ${getOptimizedImageUrl(image.url, 400)} 400w,
        ${getOptimizedImageUrl(image.url, 800)} 800w,
        ${getOptimizedImageUrl(image.url, 1200)} 1200w
      `}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <p className="text-white text-lg font-semibold">{image.title}</p>
    </div>
  </div>
);

const GalleryGrid = ({ images }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {images?.map((image, index) => (
      <GalleryImage key={image._id || index} image={image} index={index} />
    ))}
  </div>
);

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
      setHotel(images.filter(img => img.category === "hotel"));
      setDining(images.filter(img => img.category === "dining"));
      setOthers(images.filter(img => img.category === "others"));
      setRooms(images.filter(img => img.category === "room"));
      setEvent(images.filter(img => img.category === "event"));
    }
  }, [images]);

  if (isLoading) return <Loading />;

  const items = [
    {
      key: "1",
      label: t("Gallery.hotel"),
      children: <GalleryGrid images={hotel} />
    },
    {
      key: "2",
      label: t("Gallery.room"),
      children: <GalleryGrid images={rooms} />
    },
    {
      key: "3",
      label: t("Gallery.dining"),
      children: <GalleryGrid images={dining} />
    },
    {
      key: "5",
      label: t("Gallery.event"),
      children: <GalleryGrid images={event} />
    },
    {
      key: "4",
      label: t("Gallery.other"),
      children: <GalleryGrid images={others} />
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Gallery | Safa Residency</title>
        <meta property="og:title" content="Gallery | Safa Residency" />
        <meta name="title" content="Safa Residency Dhaka" />
        <meta
          name="description"
          content="Luxury Hotel in Dhaka - Safa Residency offers premium accommodation and dining services in the heart of Dhaka city."
        />
        <meta
          name="keywords"
          content="Safa, Residency, Hotel in Dhaka, Luxury Hotel, Dhaka Hotel, Safa Residency, Safa view, Safa residency view"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://safaresidency.com/gallery" />
        <meta property="og:title" content="Safa Residency Dhaka | Gallery" />
        <meta
          property="og:description"
          content="Experience luxury stay at Safa Residency, the premium hotel in Dhaka."
        />
      </Helmet>
      
      <h1 className="text-center font-[Bebas Neue] text-xl md:text-2xl lg:text-3xl">
        {t("Gallery.title")}
      </h1>
      <p className="line"></p>
      
      <Tabs
        defaultActiveKey="1"
        items={items}
        className="mt-6 custom-tabs"
        centered
        size="large"
        tabPosition="top"
        tabBarGutter={window.innerWidth <= 768 ? 20 : 30}
      />
    </div>
  );
};

export default Gallery;