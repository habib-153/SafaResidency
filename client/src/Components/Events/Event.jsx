/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Typography, Button } from "@material-tailwind/react";
import { Card, Row, Col } from "antd";
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
import { useEffect } from "react";
import { EventsFAQ } from "./FAQ";
// Previous components remain the same until EventSection
const FadeInWhenVisible = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);

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

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.03 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
  >
    <Card
      hoverable
      className="h-full bg-white/90 backdrop-blur-sm border-none  shadow-xl"
      styles={{ body: { padding: "1.5rem" } }}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className="text-4xl text-gold"
        >
          <Icon />
        </motion.div>
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        <Typography variant="paragraph" className="text-gray-600">
          {description}
        </Typography>
      </div>
    </Card>
  </motion.div>
);

const EventSection = ({ title, description, features, image, capacity }) => (
  <ParallaxSection image={image}>
    <div className="container mx-auto px-4 py-24">
      <FadeInWhenVisible>
        <div className="text-center mb-16">
          <Typography variant="h1" className="text-white mb-4">
            {title}
          </Typography>
          <Typography variant="lead" className="text-gray-200 mb-4">
            {description}
          </Typography>
          <Typography variant="h4" className="text-gold">
            Maximum Capacity: {capacity} People
          </Typography>
        </div>
      </FadeInWhenVisible>

      <Row gutter={[24, 24]}>
        {features.map((feature, idx) => (
          <Col xs={24} sm={12} md={6} key={idx}>
            <FeatureCard {...feature} />
          </Col>
        ))}
      </Row>
    </div>
  </ParallaxSection>
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

const ContactBanner = () => (
  <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gold to-gold z-50"
  >
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-center items-center space-x-4">
        <Typography variant="h6" className="text-white">
          Book your event now:
        </Typography>
        <Button
          variant="outlined"
          color="white"
          className="flex items-center gap-2 text-lg"
          onClick={() => (window.location.href = "tel:+8801831335222")}
        >
          <MdPhone className="" />
          +880 1831-335222
        </Button>
      </div>
    </div>
  </motion.div>
);

const Event = () => {
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
          title: "Whiteboard Access",
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
        <title>{`Events and Meetings | Safa Residency`}</title>

        <meta
          property="og:title"
          content={"Events and Meetings | Safa Residency"}
        />
        <meta name="title" content="Safa Residency Dhaka" />
        <meta
          name="description"
          content="Luxury Hotel in Dhaka - Safa Residency offers premium accommodation and dining services in the heart of Dhaka city."
        />
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
              <Typography
                variant="h1"
                className="text-6xl md:text-7xl font-bold text-white mb-4"
              >
                Event Spaces
              </Typography>
              <Typography variant="lead" className="text-xl text-gray-200">
                Where excellence meets occasion
              </Typography>
            </motion.div>
            <ScrollIndicator />
          </div>
        </div>
      </ParallaxSection>

      {/* Event Sections */}
      {sections.map((section, idx) => (
        <div id={section.id} key={idx}>
          <ParallaxSection image={section.image}>
            <EventSection {...section} />
          </ParallaxSection>
        </div>
      ))}
      <EventsFAQ />
      <ContactBanner />
    </div>
  );
};

export default Event;
