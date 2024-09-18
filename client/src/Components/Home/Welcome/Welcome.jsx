import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
const Welcome = () => {
    return (
        <section className="text-center mx-auto">
            <h1 className="text-2xl mb-3">
                Welcome to Safa Residency
            </h1>
            <p className="line"></p>
            <h2 className="text-3xl mb-4">
                Experience Unmatched Luxury at Safa Residency
            </h2>
            <p className="max-w-[700px] mx-auto text-lg">
                Your gateway to world-class hospitality in the heart of Dhaka. Just minutes away from the airport and train station, Safa Residency Residency offers a blend of comfort, luxury, and unforgettable experiences.
            </p>

            <div className="p-3 md:p-6 lg:p-12 2xl:p-16 text-start border border-gold rounded-xl mt-4 md:mt-6 lg:mt-8">
                <h1 className="text-2xl mb-4">
                    Find benefits of joining Safa Residency
                </h1>
                <p className="text-lg">
                    Experience exclusive benefits, earn points, access member rates and enjoy more with Safa Residency
                </p>
                <Link to={'/benefits'}>
                   <p className="p-0 text-lg flex gap-1 text-gold">
                        Learn More <AiOutlineArrowRight className="mt-1" />
                </p>  
                </Link>
               
            </div>
        </section>
    );
};

export default Welcome;