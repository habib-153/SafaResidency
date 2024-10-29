/* eslint-disable react/prop-types */
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
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
  const { t } = useTranslation();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <section className="my-8 mx-auto">
      <h1 className="text-xl md:text-3xl my-3 text-center mx-auto">
        {t("Accommodation.Faq.title")}
      </h1>
      <div className="max-w-screen-lg mx-auto text-start text-sm">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="text-sm"
          >
            {t("Accommodation.Faq.questions.workSpace.question")}
          </AccordionHeader>
          <AccordionBody>
            {t("Accommodation.Faq.questions.workSpace.answer")}
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="text-sm"
          >
            {t("Accommodation.Faq.questions.rollawayBeds.question")}
          </AccordionHeader>
          <AccordionBody>
            {t("Accommodation.Faq.questions.rollawayBeds.answer")}
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className="text-sm"
          >
            {t("Accommodation.Faq.questions.fridge.question")}
          </AccordionHeader>
          <AccordionBody>
            {t("Accommodation.Faq.questions.fridge.answer")}
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(4)}
            className="text-sm"
          >
            {t("Accommodation.Faq.questions.teaMaker.question")}
          </AccordionHeader>
          <AccordionBody>
            {t("Accommodation.Faq.questions.teaMaker.answer")}{" "}
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(5)}
            className="text-sm"
          >
            {t("Accommodation.Faq.questions.hairDryers.question")}
          </AccordionHeader>
          <AccordionBody>
            {t("Accommodation.Faq.questions.hairDryers.answer")}{" "}
          </AccordionBody>
        </Accordion>
      </div>
    </section>
  );
}
