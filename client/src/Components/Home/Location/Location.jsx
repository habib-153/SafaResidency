import { AccordionCustomIcon } from "./Accordian";

const Location = () => {
    return (
        <div className=" bg-[#4F2E1D] text-white" >
              <div className="lg:flex justify-between max-w-screen-3xl ">

                <div className="lg:max-w-[40%] mb-3  p-4 md:p-6 lg:p-8 2xl:p-16  ">
                <h1 className="text-sm md:text-base">
                    OUR LOCATION
                </h1>
                <h2 className="text-xl md:text-2xl ">
                    Getting Here
                </h2>
                <p className="text-sm md:text-base">
                    Safa Residency
                </p>
                <p className="text-sm md:text-base">
                     Commercial Area, Airport Road, Nikunja 2, Khilkhet, Dhaka, Bangladesh, 1229
                </p>
                <p className="text-sm md:text-base">
                    Tel: 01234567899
                </p>
                    <AccordionCustomIcon/>
            </div>
            <div className="lg:w-[60%]">

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d271.25272878390996!2d90.41710944547559!3d23.835407624958904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70009b1b5f9%3A0xe85ebc5748258109!2sSafa%20Residency!5e0!3m2!1sen!2sbd!4v1726406157604!5m2!1sen!2sbd" width="100%" height="450"  allowFullScreen={true} loading="lazy"></iframe>
            </div>
        </div>
        </div>
      
    );
};

export default Location;