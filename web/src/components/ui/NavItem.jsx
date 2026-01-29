import { NavLink } from "react-router-dom";

function NavItem({ to, onClick, children }) {
  const defaultClasses = "block py-3 px-4 rounded-md md:rounded-none text-sm md:text-base hover:bg-gray-100 dark:hover:bg-slate-800 transition focus:outline-none focus-visible:ring focus-visible:ring-blue-300";
  const inactiveClasses = `text-gray-700 dark:text-gray-100 hover:text-blue-600 ${defaultClasses}`;
  const activeClasses = `text-blue-600 md:border-b-2 md:border-blue-600 ${defaultClasses}`;
  return (
    <NavLink
      to={to}
      className={({ isActive}) => isActive ? activeClasses : inactiveClasses }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}

export default NavItem;
