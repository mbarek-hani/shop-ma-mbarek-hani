import { NavLink } from "react-router-dom";

function NavItem({ to, onClick, children }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `block px-4 py-2 rounded-md text-sm md:text-base transition-colors whitespace-nowrap ${
          isActive
            ? "bg-blue-50 dark:bg-slate-800 text-blue-600 md:border-r-4 md:border-blue-600"
            : "text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
        }`
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}

export default NavItem;