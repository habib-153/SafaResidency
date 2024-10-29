import ParallaxSection from "../../Shared/Parallax";
import { useRef } from 'react';
import { FcOk } from "react-icons/fc";
import { motion, useInView } from 'framer-motion';
import { useTranslation } from "react-i18next";

const Event = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    t("Event.features.highSpeedWifi"),
    t("Event.features.videoConferencing"),
    t("Event.features.whiteboard"),
    t("Event.features.cateringServices"),
    t("Event.features.naturalLighting")
  ];

  return (
    <section className="p-2 ">
      <ParallaxSection backgroundImage={'https://th.bing.com/th/id/R.124cb862812ee486fa646d39df61624b?rik=z4h1pFITurWx1g&pid=ImgRaw&r=0'} />
      <div className="max-w-screen-3xl text-center my-4 md:mt-6">
        <motion.div
          ref={ref}
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className=""
        >
          <h1>{t("Event.title")}</h1>
          <p className="line"></p>
          <h1 className="text-xl md:text-3xl">
            {t("Event.startPlanning")}
          </h1>
          <p className="text-base my-3">
            {t("Event.tellUs")}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <div>
            <p className="line max-w-48"></p>
            <p className="text-sm md:text-3xl">
              1000 SQ MT
            </p>
            <p>
              {t("Event.eventSpace")}
            </p>
          </div>
          <div>
            <p className="line max-w-48"></p>
            <p className="text-sm md:text-3xl">
              50
            </p>
            <p>
              {t("Event.capacitySpace")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row rounded-xl p-4 my-4">
          <div className="max-h-[60vh] object-cover">
            <img className="max-h-[60vh] object-cover rounded-l-xl" src="https://th.bing.com/th/id/R.124cb862812ee486fa646d39df61624b?rik=z4h1pFITurWx1g&pid=ImgRaw&r=0" alt="" />
          </div>
          <div className="lg:w-1/2 text-start flex flex-col gap-3 p-4">
            <h1 className="text-xl md:text-2xl">
              {t("Event.planMeeting")}
            </h1>
            <p>
              {t("Event.strategicMeeting")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 flex-wrap">
              {features.map((feature, index) => (
                <div className="flex gap-2 my-auto" key={index}>
                  <FcOk />
                  <p>{feature}</p>
                </div>
              ))}
            </div>
            <p className="text-base md:text-xl">
              {t("Event.callToBook")} <span className="font-bold">+8801831-335222</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;