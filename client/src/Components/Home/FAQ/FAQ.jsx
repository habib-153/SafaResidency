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
const features = [
    {
        name: 'Sustainability',
       
    },
    {
        name: 'Restaurant',
    
    },
    {
        name: 'Meeting Space',
      
    },
    {
        name: 'Free WiFi',
       
    },
    {
        name: 'Free Tea/Coffee',
       
    },
    {
        name: 'Room Service',
       
    },
    {
        name: 'Wake up calls',
       
    },
    {
        name: 'Daily Housekeeping',
     
    },
    {
        name: 'Service Request',
       
    },
    {
        name: 'OTT Accessability',
       
    },
    {
        name: '24 Hours Room Service',
      
    },
    {
        name: 'Turndown Service',
      
    },


]

export function FAQ() {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <section className="mt-5 mb-8 mx-auto px-3 md:px-0">
            <div className="max-w-screen-lg mx-auto">
               <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(1)}>What are the check-in and check-out times at Safa Residency?</AccordionHeader>
                <AccordionBody>
                    The check-in time at Safa Residency is 3:00 pm and the check-out time is 12:00 pm.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                    Does Safa Residency allow pets?
                </AccordionHeader>
                <AccordionBody>
                    The pet policy at Safa Residency is:

                    Pets Not Allowed (Pets are not allowed.)
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(3)}>
                    What are the parking options at Safa Residency?
                </AccordionHeader>
                <AccordionBody>
                    The parking options at Safa Residency are:
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(4)}>
                    What property amenities are available at Safa Residency?
                </AccordionHeader>
                <AccordionBody>
                    <div className="grid text-lg lg:text-xl grid-cols-1 md:grid-cols-2  ">
                        {
                            features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-black">
                                        {feature.icon}

                                    </div>
                                    <p>{feature.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(5)}>
                    Does Safa Residency have free Wi-Fi?
                </AccordionHeader>
                <AccordionBody>
                    Yes, Safa Residency has free Wi-Fi available to hotel guests.
                </AccordionBody>
            </Accordion> 
            </div>
            
        </section>
    );
}