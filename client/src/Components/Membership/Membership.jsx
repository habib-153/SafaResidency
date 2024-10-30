
import { Card, Divider } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineCheckCircle } from "react-icons/ai";



const MembershipBenefits = () => {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('./membership.json')
      .then(response => response.json())
      .then(data => setBenefits(data.membership));
  }, []);

  return (
    <section>
      <Helmet>
<title>Membership Benefits | Safa Residency</title>
      </Helmet>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 text-center">
          Safa Residency Membership Benefits
        </h2>
       <div className="flex flex-col items-center p-4 space-y-4 md:space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
      
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full md:w-1/2 lg:w-1/4 p-4  rounded-lg shadow-lg`}
        >
          <Card
            title={benefit.tier}
            bordered={false}
            className={`text-center text-xl ${benefit.bgColor} bg-opacity-35 font-semibold text-black h-[430px]`}
            style={{ borderRadius: "8px" }}
          >
            <Divider />
            <ul className="space-y-2">
              {benefit.benefits.map((item, i) => (
                <li key={i} className="flex items-center space-x-2 text-gray-600 text-start">
                  <AiOutlineCheckCircle className="text-green-500 text-xl" />
                  <span className="text-xl font-normal">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      ))}
    </div>
    </section>
   
  );
};

export default MembershipBenefits;
