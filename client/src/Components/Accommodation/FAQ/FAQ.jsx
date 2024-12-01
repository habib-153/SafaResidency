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

export function FAQ() {
  const [open, setOpen] = React.useState(0);
  const { t } = useTranslation();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="max-w-screen-lg mx-auto text-sm md:text-base px-4 py-4">
      <h2 className="text-xl font-bold mb-4">{t("Accommodation.Faq.title")}</h2>

      <Accordion open={open === 1} icon={<Icon id={1} open={open === 1} />}>
        <AccordionHeader style={{fontFamily: "Montserrat"}}  onClick={() => handleOpen(1)} className="text-sm">
          {t("Accommodation.Faq.questions.workSpace.question")}
        </AccordionHeader>
        <AccordionBody style={{fontFamily: "Montserrat"}} >
          {t("Accommodation.Faq.questions.workSpace.answer")}
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 2} icon={<Icon id={2} open={open === 2} />}>
        <AccordionHeader style={{fontFamily: "Montserrat"}} onClick={() => handleOpen(2)} className="text-sm">
          {t("Accommodation.Faq.questions.rollawayBeds.question")}
        </AccordionHeader>
        <AccordionBody style={{fontFamily: "Montserrat"}} >
          {t("Accommodation.Faq.questions.rollawayBeds.answer")}
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 3} icon={<Icon id={3} open={open === 3} />}>
        <AccordionHeader style={{fontFamily: "Montserrat"}} onClick={() => handleOpen(3)} className="text-sm">
          {t("Accommodation.Faq.questions.fridge.question")}
        </AccordionHeader>
        <AccordionBody style={{fontFamily: "Montserrat"}} >
          {t("Accommodation.Faq.questions.fridge.answer")}
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 4} icon={<Icon id={4} open={open === 4} />}>
        <AccordionHeader style={{fontFamily: "Montserrat"}} onClick={() => handleOpen(4)} className="text-sm">
          {t("Accommodation.Faq.questions.teaMaker.question")}
        </AccordionHeader>
        <AccordionBody style={{fontFamily: "Montserrat"}} >
          {t("Accommodation.Faq.questions.teaMaker.answer")}
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 5} icon={<Icon id={5} open={open === 5} />}>
        <AccordionHeader style={{fontFamily: "Montserrat"}} onClick={() => handleOpen(5)} className="text-sm">
          {t("Accommodation.Faq.questions.hairDryers.question")}
        </AccordionHeader>
        <AccordionBody style={{fontFamily: "Montserrat"}} >
          {t("Accommodation.Faq.questions.hairDryers.answer")}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 6} icon={<Icon id={6} open={open === 6} />}>
        <AccordionHeader style={{fontFamily: "Montserrat"}} onClick={() => handleOpen(6)} className="text-sm">
          {t("Accommodation.Faq.questions.airportTransfer.question")}
        </AccordionHeader>
        <AccordionBody style={{fontFamily: "Montserrat"}} >
          {t("Accommodation.Faq.questions.airportTransfer.answer")}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 7} icon={<Icon id={7} open={open === 7} />}>
        <AccordionHeader style={{fontFamily: "Montserrat"}} onClick={() => handleOpen(7)} className="text-sm">
          {t("Accommodation.Faq.questions.breakfast.question")}
        </AccordionHeader>
        <AccordionBody style={{fontFamily: "Montserrat"}} >
          {t("Accommodation.Faq.questions.breakfast.answer")}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 8} icon={<Icon id={8} open={open === 8} />}>
        <AccordionHeader style={{fontFamily: "Montserrat"}} onClick={() => handleOpen(8)} className="text-sm">
          {t("Accommodation.Faq.questions.familyFriendly.question")}
        </AccordionHeader>
        <AccordionBody style={{fontFamily: "Montserrat"}} >
          {t("Accommodation.Faq.questions.familyFriendly.answer")}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 9} icon={<Icon id={9} open={open === 9} />}>
        <AccordionHeader style={{fontFamily: "Montserrat"}} onClick={() => handleOpen(9)} className="text-sm">
          {t("Accommodation.Faq.questions.roomAmenities.question")}
        </AccordionHeader>
        <AccordionBody style={{fontFamily: "Montserrat"}} >
          {t("Accommodation.Faq.questions.roomAmenities.answer")}
        </AccordionBody>
      </Accordion>
    </div>
  );
}
