
import { TbReportAnalytics } from "react-icons/tb";
import MenuItem from "../MenuItem.jsx/MenuItem";
import { BsHouseGear } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { RiReservedFill } from "react-icons/ri";
const AdminMenu = () => {
    const route = [
        {
            icon: HiUsers,
            label: 'Users',
            address: 'users'
        },
        {
            icon: RiReservedFill,
            label: 'Reservation Management',
            address: '/reservation'
        },
        {
            icon: BsHouseGear,
            label: 'Room Management',
            address: '/room-management'
        },
        {
            icon: TbReportAnalytics,
            label: 'Report and Analytics',
            address: '/see-report'
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

export default AdminMenu