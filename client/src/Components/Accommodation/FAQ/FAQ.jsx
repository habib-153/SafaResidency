/* eslint-disable react/prop-types */
import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}


export function FAQ() {
    const [open, setOpen] = React.useState(0); 

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <section className=" mx-auto">
            <div className="max-w-screen-lg mx-auto text-start">
                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(1)}>What are Do the rooms at Safa Residency Dhaka have a work space?
                         
                    </AccordionHeader>
                    <AccordionBody>
                        No, the rooms at Safa Residency Dhaka do not have a work space.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(2)}>
                        Are rollaway beds permitted in any of the rooms at Safa Residency Dhaka?
                    </AccordionHeader>
                    <AccordionBody>
                        No, the rooms at Safa Residency Dhaka do not permit rollaway beds.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(3)}>
                        Do the rooms at Safa Residency Dhaka have fridges?
                    </AccordionHeader>
                    <AccordionBody>
                        No, rooms at Safa Residency Dhaka do not have a fridge.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(4)}>
                        Do the rooms at Safa Residency Dhaka have coffee/tea makers?
                    </AccordionHeader>
                    <AccordionBody>
                        No, rooms at Safa Residency Dhaka do not have a coffee/tea maker.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(5)}>
                        Does Safa Residency have free Wi-Fi?Do the rooms at Safa Residency Dhaka have hair dryers?
                        </AccordionHeader>
                            <AccordionBody>
                                No, rooms at Safa Residency Dhaka do not have hair dryers.
                            </AccordionBody>
                        

                </Accordion>
            </div>

        </section>
    );
}