function NavItem({ to, children }) {
  return (
    <a
      href={to}
      className="block py-3 px-4 rounded-md md:rounded-none text-sm md:text-base text-gray-700 hover:bg-gray-100 hover:text-blue-600 active:bg-gray-200 transition focus:outline-none focus-visible:ring focus-visible:ring-blue-300"
    >
      {children}
    </a>
  );
}

export default NavItem;
