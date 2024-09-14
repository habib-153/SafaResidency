import { PiForkKnifeBold } from "react-icons/pi";
import { TiLeaf, TiWiFi } from "react-icons/ti";
import { FaPeopleGroup, FaTurnDown } from "react-icons/fa6";
import { GiCoffeeCup } from "react-icons/gi";
import { MdOutlineRoomService } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineDone } from "react-icons/md";
import { TbClock24 } from "react-icons/tb";
const Features = () => {
    const features = [
        {
            name: 'Sustainability',
            icon:< TiLeaf/>
        },
        {
            name: 'Restaurant',
            icon: <PiForkKnifeBold />
        },
        {
            name: 'Meeting Space',
            icon:<FaPeopleGroup />
        },
        {
            name: 'Free WiFi',
            icon:<TiWiFi />
        },
        {
            name: 'Free Tea/Coffee',
            icon: < GiCoffeeCup />
        },
        {
            name: 'Room Service',
            icon:<MdOutlineRoomService />
        },
        {
            name: 'Wake up calls',
            icon:< LuPhoneCall/>
        },
        {
            name: 'Daily Housekeeping',
            icon:< MdOutlineDone/>
        },
        {
            name: 'Service Request',
            icon:< MdOutlineDone/>
        },
        {
            name: 'OTT Accessability',
            icon:< MdOutlineDone/>
        },
        {
            name: '24 Hours Room Service',
            icon:< TbClock24/>
        },
        {
            name: 'Turndown Service',
            icon: < FaTurnDown/>
        },
       
       
    ]
    return (
        <div className="mt-4 md:mt-6 p-4 md:p-8 lg:p-16">
            <h1 className="text-2xl my-4">
                Features that makes you comfortable
            </h1>
            <div className="grid text-lg lg:text-xl grid-cols-1 md:grid-cols-2  lg:grid-cols-3 ">
                 {
                features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gold">
                            {feature.icon}
                           
                        </div>
                        <p>{feature.name}</p>
                    </div>
                ))
            }
            </div>
           
        </div>
    );
};

export default Features;