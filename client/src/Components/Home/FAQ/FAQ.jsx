/* eslint-disable react/prop-types */
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useFeatures } from "../Features/FeaturesOptions";
import { useTranslation } from "react-i18next";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function FAQ() {
  const [open, setOpen] = React.useState(0);
  const features = useFeatures();
  const { t } = useTranslation();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <section className="mt-5 mb-8 mx-auto p-2 md:px-0">
      <h1 className="text-xl md:text-3xl my-3 text-center mx-auto">
        {t("home.Faq.title")}
      </h1>
      <div className="max-w-screen-lg mx-auto text-sm md:text-base">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="text-sm "
          >
            {t("home.Faq.questions.checkInOut.question")}
          </AccordionHeader>
          <AccordionBody>
            {t("home.Faq.questions.checkInOut.answer")}
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="text-sm "
          >
            {t("home.Faq.questions.pets.question")}
          </AccordionHeader>
          <AccordionBody>{t("home.Faq.questions.pets.answer")}</AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className="text-sm "
          >
            {t("home.Faq.questions.parking.question")}
          </AccordionHeader>
          <AccordionBody>
            {t("home.Faq.questions.parking.answer")}
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(4)}
            className="text-sm "
          >
            {t("home.Faq.questions.amenities.question")}
          </AccordionHeader>
          <AccordionBody>
            <div className="grid text-lg lg:text-xl grid-cols-1 md:grid-cols-2  ">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-black">
                    {feature.icon}
                  </div>
                  <p>{feature.name}</p>
                </div>
              ))}
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(5)}
            className="text-sm "
          >
            {t("home.Faq.questions.wifi.question")}
          </AccordionHeader>
          <AccordionBody>{t("home.Faq.questions.wifi.answer")}</AccordionBody>
        </Accordion>
      </div>
    </section>
  );
}
