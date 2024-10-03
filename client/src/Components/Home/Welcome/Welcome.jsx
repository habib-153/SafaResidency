import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import {  useRef } from 'react';
import { motion, useInView } from 'framer-motion';
const Welcome = () => {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <section className="md:text-center mx-auto p-2">
            <motion.div
                ref={ref}
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                 transition={{ duration: 1.4, ease: "easeOut" }}
                className=" text-center"
            >
                <h1 className="text-base md:text-2xl mb-3 title">
                Welcome to Safa Residency
            </h1>
            <p className="line"></p>
            <h2 className="text-xl md:text-3xl mb-4 title">
                Experience Unmatched Luxury at Safa Residency
            </h2>
            </motion.div>
           
            <p className="max-w-[700px] mx-auto text-sm md:text-lg text-wrap">
                Your gateway to world-class hospitality in the heart of Dhaka. Just minutes away from the airport and train station, Safa Residency Residency offers a blend of comfort, luxury, and unforgettable experiences.
            </p>

            <div className="p-3 md:p-6 lg:p-12 2xl:p-16 text-start border border-gold rounded-xl mt-4 md:mt-6 lg:mt-8">
                <h1 className="text-xl md:text-2xl mb-4">
                    Find benefits of joining Safa Residency
                </h1>
                <p className="text-sm md:text-lg">
                    Experience exclusive benefits, earn points, access member rates and enjoy more with Safa Residency
                </p>
                <Link to={'/benefits'}>
                   <p className="p-0 text-sm md:text-lg flex gap-1 text-gold">
                        Learn More <AiOutlineArrowRight className="mt-1" />
                </p>  
                </Link>
               
            </div>
        </section>
    );
};

export default Welcome;