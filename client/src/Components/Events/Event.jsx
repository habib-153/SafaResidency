import ParallaxSection from "../../Shared/Parallax";
import { useRef } from 'react';
import { FcOk } from "react-icons/fc";
import { motion, useInView } from 'framer-motion';

const Event = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const features = [
        "High-speed Wi-Fi",
        "Video conferencing equipment",
        "Whiteboard and markers",
        "Catering services available",
        "Natural lighting"
    ]
    return (
        <section className="p-2 ">
            <ParallaxSection backgroundImage={'https://th.bing.com/th/id/R.124cb862812ee486fa646d39df61624b?rik=z4h1pFITurWx1g&pid=ImgRaw&r=0'} />
            <div className="max-w-screen-3xl text-center my-4 md:mt-6">
                <motion.div
                    ref={ref}
                    initial={{ y: 50, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                     transition={{ duration: 2, ease: "easeOut" }}
                    className=""
                >
                    <h1>Events</h1>
                    <p className="line"></p>
                    <h1 className="text-xl md:text-3xl">
                        Start Planning Your Meetings or Events Here
                    </h1>
                    <p className="text-base my-3">
                        Tell us about your event, and we&apos;ll plan it together
                    </p>

                </motion.div>
             
                <div className="flex flex-col md:flex-row  justify-center gap-6">
                    <div>
                        <p className="line max-w-48"></p>
                        <p className="text-sm md:text-3xl">
                            1000 SQ MT
                        </p>
                        <p>
                            Event Space
                        </p>
                    </div>
                    <div>
                        <p className="line max-w-48"></p>
                        <p className="text-sm md:text-3xl">
                            50
                        </p>
                        <p>
                            Capacity Space
                        </p>
                    </div>


                </div>

                <div className="flex flex-col gap-4 lg:flex-row rounded-xl p-4 my-4">
                    <div className="max-h-[60vh] object-cover">
                        <img className="max-h-[60vh] object-cover rounded-l-xl " src="https://th.bing.com/th/id/R.124cb862812ee486fa646d39df61624b?rik=z4h1pFITurWx1g&pid=ImgRaw&r=0" alt="" />
                    </div>
                    <div className="lg:w-1/2 text-start flex flex-col gap-3 p-4">
                        <h1 className="text-xl md:text-2xl">
                            Plan your perfect meeting
                        </h1>
                        <p>
                            A high-level strategic meeting for company executives to discuss quarterly performance, future plans, and key decision-making. The venue offers a professional and confidential environment suitable for sensitive business discussions.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 flex-wrap">
                            {
                                features.map((feature,index) => 
                                    <div className="flex gap-2 my-auto" key={index}>
                                        <FcOk />
                                         <p>{feature} </p>
                                    </div>
                                   
                                )
}
                        </div>
                        <p className="text-base md:text-xl">
                            Call to book your meetings: <span className="font-bold">
                            +8801831-335222
                            </span> 
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Event;