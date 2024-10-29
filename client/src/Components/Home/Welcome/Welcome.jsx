import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Welcome = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.5,
        delayChildren: 1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6,
      },
    },
  };

  const lineVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "50%",
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const benefitsCardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateX: -30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  return (
    <section className="md:text-center mx-auto p-2 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="overflow-hidden text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-base md:text-2xl mb-3 title"
        >
          {t("home.Welcome.title")}
        </motion.h1>
        <motion.div
          variants={lineVariants}
          className="line mx-auto w-1/2"
        ></motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-xl md:text-3xl mb-4 title"
        >
          {t("home.Welcome.subtitle")}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="max-w-[700px] mx-auto text-sm md:text-lg text-wrap"
        >
          {t("home.Welcome.description")}
        </motion.p>
      </motion.div>
      <motion.div
        variants={benefitsCardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="p-3 md:p-6 lg:p-12 2xl:p-16 text-start border border-gold rounded-xl mt-4 md:mt-6 lg:mt-8 overflow-hidden"
      >
        <motion.h1
          className="text-xl md:text-2xl mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {t("home.Welcome.benefits.title")}
        </motion.h1>
        <motion.p
          className="text-sm md:text-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {t("home.Welcome.benefits.description")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {/* <Link to={'/benefits'}>
            <motion.p
              className="p-0 text-sm md:text-lg flex gap-1 text-gold"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {t("home.Welcome.benefits.learnMore")} <AiOutlineArrowRight className="mt-1" />
            </motion.p>
          </Link> */}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Welcome;