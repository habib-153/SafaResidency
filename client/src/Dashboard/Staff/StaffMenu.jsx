import {FaUserPlus } from "react-icons/fa6"
import { VscRequestChanges } from "react-icons/vsc"
import { SiStatuspage } from "react-icons/si";
import { TbReportAnalytics } from "react-icons/tb";

import MenuItem from "../MenuItem.jsx/MenuItem"
import { RiReservedFill } from "react-icons/ri";

const StaffMenu = () => {
    const route = [
          {
            icon: FaUserPlus,
            label: 'Guest User',
            address: '/guest-user'
        },
        {
            icon: VscRequestChanges,
            label: 'Service Requests',
            address: '/user-request'
        },
        {
            icon: RiReservedFill,
            label: 'Reservation Management',
            address: '/reservation'
        },
        {
            icon: SiStatuspage ,
            label: 'Housekeeping and Maintenance',
            address: '/housekeeping'
        },
        {
            icon: TbReportAnalytics ,
            label: 'Report and Analytics',
            address: '/report'
        },
     
    ]
    return (
        <>

            {
                route.map((item, i) => <MenuItem key={i} icon={item.icon} label={item.label} address={item.address} />)
            }

        </>
    )
}

export default StaffMenu