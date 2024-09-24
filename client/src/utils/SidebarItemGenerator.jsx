import { NavLink } from "react-router-dom";

export const SidebarItemsGenerator = (items, role) => {
  const sidebarItems = items.reduce((acc, item) => {
    if (item.path && item.label) {
      acc.push({
        key: item.path,
        label: (
          <NavLink
            to={`/${role}/${item.path}`}
            className={({ isActive }) =>
              `my-5 flex  w-full px-4 py-2 mt-5 hover:bg-[#ece07f]  hover:text-black transition-colors duration-300 transform ${
                isActive ? "bg-[#ece07f] text-black " : "text-white"
              }`
            }
          >
            <span className="font-medium rounded-lg">
              {item.label}
            </span>
          </NavLink>
        ),
      });
    }
    return acc;
  }, []);

  return sidebarItems;
};

