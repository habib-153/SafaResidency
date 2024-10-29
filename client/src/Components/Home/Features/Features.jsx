import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/varients";
import { useTranslation } from "react-i18next";
import { useFeatures } from "./FeaturesOptions";

const Features = () => {
  const { t } = useTranslation();
  const features = useFeatures();
  
  return (
    <motion.div
      variants={fadeIn("down", 0.1)}
      initial={"hidden"}
      whileInView={"show"}
      viewport={{ once: true, amount: 0.7 }}
      className="mt-4 md:mt-6 p-2 md:p-8 lg:p-16"
    >
      <h1 className="text-xl md:text-2xl my-4">{t("home.Features.title")}</h1>
      <div className="grid text-lg lg:text-xl grid-cols-2 gap-3 md:grid-cols-2  lg:grid-cols-3 p-4 md:p-0">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 text-gold">
              {feature.icon}
            </div>
            <p>{feature.name}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Features
