/* eslint-disable react/prop-types */
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { TbCar, TbPlane } from "react-icons/tb";
// import { FaArrowUpRightFromSquare } from "react-icons/fa6";
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

export function AccordionCustomIcon() {
    const { t } = useTranslation();
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          className="flex text-white  border-gold  hover:text-gold "
          onClick={() => handleOpen(1)}
        >
          <p className="flex justify-start gap-2">
            <TbPlane className="my-auto text-white text-sm md:text-base" />
            {t("home.Location.airport.title")}
          </p>
        </AccordionHeader>
        <AccordionBody>
          <div>
            <p className="text-white text-sm md:text-base mb-3">
            {t("home.Location.airport.distance")} <br />
            </p>
            <p className="text-white text-sm md:text-base">
              Phone Number: +8801831-335222
            </p>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader
          className="flex text-white  border-gold  hover:text-gold "
          onClick={() => handleOpen(2)}
        >
          <p className="flex justify-start  text-sm md:text-base gap-2">
            <TbCar className="my-auto text-white" />
            {t("home.Location.transport.title")}
          </p>
        </AccordionHeader>
        <AccordionBody>
          <div>
            <p className="text-white text-sm md:text-base mb-3">
            {t("home.Location.transport.meridien")}
            </p>
            {/* <p className="text-white text-sm md:text-base mb-2">
              Train Station
            </p>

            <a href="www.railway.gov.bd" className="text-white text-base">
              <p className="text-white text-sm md:text-base underline flex gap-1">
                Kamlapur Railway Station{" "}
                <FaArrowUpRightFromSquare className="my-auto" />
              </p>
            </a> */}
          </div>
        </AccordionBody>
      </Accordion>
    </>
  );
}
