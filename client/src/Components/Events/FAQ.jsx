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
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function EventsFAQ() {
  const [open, setOpen] = React.useState(0);
  const { t } = useTranslation();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="max-w-screen-lg mx-auto text-sm md:text-base px-4 py-4">
      <h2 className="text-xl font-bold text-center mb-4">
        {t("Event.Faq.title")}
      </h2>

      <Accordion open={open === 1} icon={<Icon id={1} open={open === 1} />}>
        <AccordionHeader onClick={() => handleOpen(1)} className="text-sm">
          {t("Event.Faq.questions.banquetCapacity.question")}
        </AccordionHeader>
        <AccordionBody>
          {t("Event.Faq.questions.banquetCapacity.answer")}
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 2} icon={<Icon id={2} open={open === 2} />}>
        <AccordionHeader onClick={() => handleOpen(2)} className="text-sm">
          {t("Event.Faq.questions.eventDuration.question")}
        </AccordionHeader>
        <AccordionBody>
          {t("Event.Faq.questions.eventDuration.answer")}
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 3} icon={<Icon id={3} open={open === 3} />}>
        <AccordionHeader onClick={() => handleOpen(3)} className="text-sm">
          {t("Event.Faq.questions.paymentPolicy.question")}
        </AccordionHeader>
        <AccordionBody>
          {t("Event.Faq.questions.paymentPolicy.answer")}
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 4} icon={<Icon id={4} open={open === 4} />}>
        <AccordionHeader onClick={() => handleOpen(4)} className="text-sm">
          {t("Event.Faq.questions.cancellationPolicy.question")}
        </AccordionHeader>
        <AccordionBody>
          {t("Event.Faq.questions.cancellationPolicy.answer")}
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 5} icon={<Icon id={5} open={open === 5} />}>
        <AccordionHeader onClick={() => handleOpen(5)} className="text-sm">
          {t("Event.Faq.questions.taxesAndCharges.question")}
        </AccordionHeader>
        <AccordionBody>
          {t("Event.Faq.questions.taxesAndCharges.answer")}
        </AccordionBody>
      </Accordion>
    </div>
  );
}
