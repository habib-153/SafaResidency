import { FaHouseUser } from "react-icons/fa6";
import { VscRequestChanges } from "react-icons/vsc";
import MenuItem from "../MenuItem.jsx/MenuItem";
const CustomerMenu = () => {
  const route = [
    {
      icon: FaHouseUser,
      label: "My Bookings",
      address: "/my-bookings",
    },
    {
      icon: VscRequestChanges,
      label: "Service Requests",
      address: "/my-request",
    },
  ];
  return (
    <>
      {route.map((item, i) => (
        <MenuItem
          key={i}
          icon={item.icon}
          label={item.label}
          address={item.address}
        />
      ))}
    </>
  );
};

export default CustomerMenu;
