/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Typography, Button } from "@material-tailwind/react";
import {
  MdPresentToAll,
  MdWifi,
  MdScreenShare,
  MdCoffee,
  MdRestaurant,
  MdTheaters,
  MdPhone,
  MdArrowDownward,
  MdMeetingRoom,
} from "react-icons/md";
import { BiChalkboard } from "react-icons/bi";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { EventsFAQ } from "./FAQ";
import BookEventModal from "./BookEventModal";
import { useTranslation } from "react-i18next";

const ParallaxSection = ({ image, children }) => (
  <div
    className="relative min-h-screen bg-cover bg-center"
    style={{
      backgroundImage: `url(${image})`,
      backgroundAttachment: "fixed",
    }}
  >
    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
    <div className="relative z-10 h-full">{children}</div>
  </div>
);

// ScrollIndicator and ContactBanner components remain the same
const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    <MdArrowDownward className="text-4xl" />
  </motion.div>
);

const ContactBanner = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gold to-gold z-50"
    >
      <div className="container mx-auto px-2 md:px-4 py-4">
        <div className="flex justify-center items-center space-x-4">
          <Typography variant="h6" className="text-white">
            {t("Event.bookingSection.callToBook")}
          </Typography>
          <Button
            variant="outlined"
            color="white"
            className="flex items-center gap-2 sm:text-lg px-3"
            onClick={() => window.location.href = "tel:+8801831335222"}
          >
            <MdPhone />
            {t("Event.bookingSection.phoneNumber")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Event = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const sections = [
    {
      id: "classroom",
      title: "Classroom Setup",
      description:
        "Professional learning environment ideal for training sessions and workshops",
      image:
        "https://res.cloudinary.com/dmjdmceem/image/upload/v1731694071/IMG-20241115-WA0004_sezrzo.jpg",
      capacity: "20",
      features: [
        {
          icon: BiChalkboard,
          title: "Whiteboard",
          description: "Whiteboard for presentations",
        },
        {
          icon: MdPresentToAll,
          title: "HD Projector",
          description: "High-definition projector system",
        },
        {
          icon: MdWifi,
          title: "High-Speed WiFi",
          description: "Corporate internet connection",
        },
        {
          icon: MdRestaurant,
          title: "Buffet Service",
          description: "On-demand snacks & buffet",
        },
      ],
    },
    {
      id: "u-shape",
      title: "U-Shape Layout",
      description:
        "Interactive setup perfect for discussions and collaborative sessions",
      image:
        "https://res.cloudinary.com/dmjdmceem/image/upload/v1731694070/IMG-20241115-WA0006_zeedvo.jpg",
      capacity: "21",
      features: [
        {
          icon: MdPresentToAll,
          title: "Presentation Setup",
          description: "Complete presentation equipment",
        },
        {
          icon: MdMeetingRoom,
          title: "Professional Meeting",
          description: "Complete professional setup",
        },
        {
          icon: MdWifi,
          title: "High-Speed WiFi",
          description: "Reliable internet connectivity",
        },
        {
          icon: MdCoffee,
          title: "Refreshments",
          description: "Available on request",
        },
      ],
    },
    {
      id: "i-shape",
      title: "I-Shape Layout",
      description: "Professional setup for focused meetings and presentations",
      image:
        "https://res.cloudinary.com/dmjdmceem/image/upload/v1731694071/IMG-20241115-WA0003_qfw9xj.jpg",
      capacity: "25",
      features: [
        {
          icon: MdScreenShare,
          title: "Dual Displays",
          description: "Multiple viewing angles",
        },
        {
          icon: BiChalkboard,
          title: "Whiteboard",
          description: "For brainstorming sessions",
        },
        {
          icon: MdRestaurant,
          title: "Buffet Service",
          description: "On-demand snacks & buffet",
        },
        {
          icon: MdWifi,
          title: "High-Speed WiFi",
          description: "Seamless connectivity",
        },
      ],
    },
    {
      id: "theater",
      title: "Theater Style",
      description: "Spacious arrangement for larger presentations and events",
      image:
        "https://res.cloudinary.com/dmjdmceem/image/upload/v1731694071/IMG-20241115-WA0005_f1dr9h.jpg",
      capacity: "35",
      features: [
        {
          icon: MdTheaters,
          title: "Theater Setup",
          description: "Optimal viewing angles for all",
        },
        {
          icon: MdPresentToAll,
          title: "Professional AV",
          description: "Complete audiovisual system",
        },
        {
          icon: BiChalkboard,
          title: "Presentation Tools",
          description: "Whiteboard access",
        },
        {
          icon: MdRestaurant,
          title: "Buffet Service",
          description: "On-demand snacks & buffet",
        },
      ],
    },
  ];

  return (
    <div className="relative">
      <Helmet>
        <title>{t("Event.title")} | Safa Residency</title>

        <meta
          property="og:title"
          content={`${t("Event.title")} | Safa Residency`}
        />
        <meta name="title" content="Safa Residency Dhaka" />
        <meta name="description" content={t("Event.sections.description")} />
        <meta
          name="keywords"
          content="Safa, Residency, Hotel in Dhaka, Luxury Hotel, Dhaka Hotel, Safa Residency, Best meeting palace for meeting, events "
        />

        {/* Open Graph Meta Tags for social sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://safaresidency.com/events" />
        <meta
          property="og:title"
          content="Safa Residency Dhaka | Events and Meetings"
        />
        <meta
          property="og:description"
          content="Experience luxury stay at Safa Residency, the premium hotel in Dhaka."
        />
      </Helmet>
      {/* Hero Section */}
      <ParallaxSection image="https://res.cloudinary.com/dmjdmceem/image/upload/v1731694071/IMG-20241115-WA0005_f1dr9h.jpg">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h1" className="text-3xl md:text-5xl font-bold text-white mb-4">
                {t("Event.title")}
              </Typography>
              <Typography className="text-xl text-gray-200 mb-4">
                {t("Event.subtitle")}
              </Typography>
              <Button
                size="lg"
                color="brown"
                className="mt-3"
                onClick={() => setIsModalOpen(true)}
              >
                {t("Event.bookingSection.bookButton")}
              </Button>
            </motion.div>
            <ScrollIndicator />
          </div>
        </div>
      </ParallaxSection>

      {/* Event Sections */}
      {sections.map((section, idx) => (
        <div id={section.id} key={idx} className="py-16">
        <div className="container mx-auto px-4">
          <div className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
            <div className="w-full md:w-1/2">
              <motion.img
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                src={section.image}
                alt={t(`Event.sections.${section.id}.title`)}
                className="rounded-xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <Typography variant="h2" className="text-4xl">
                {t(`Event.sections.${section.id}.title`)}
              </Typography>
              <Typography className="text-gray-700">
                {t(`Event.sections.${section.id}.description`)}
              </Typography>
              <Typography variant="h6" className="text-gold">
                {t(`Event.sections.${section.id}.capacity`)}
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                {section.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <feature.icon className="text-gold text-xl" />
                    <span>{t(`Event.commonFeatures.${feature.title}.title`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
      <EventsFAQ />
      <ContactBanner />
      <BookEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        layouts={sections}
      />
    </div>
  );
};

export default Event;
