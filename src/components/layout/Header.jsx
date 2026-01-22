import { useState } from "react";
import logo from "@/assets/logo.png";

import NavItem from "@/components/ui/NavItem";
import BurgerIcon from "@/components/ui/BugerIcon";

function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "#", label: "Acceuil" },
    { to: "#", label: "Produits" },
    { to: "#", label: "Panier" },
    { to: "#", label: "Contact" },
  ];

  return (
    <header className="relative flex items-center justify-between px-4 md:px-0 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <img src={logo} alt="shop.ma logo" className="w-24 md:w-28" />
      </div>

      <button
        className="md:hidden p-2 rounded-md focus:outline-none focus:ring"
        onClick={() => setOpen((v) => !v)}
      >
        <BurgerIcon open={open} />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        className={`md:flex md:items-center md:gap-8 ${open ? "block" : "hidden"} absolute md:static z-50 md:z-auto left-0 right-0 top-full bg-white md:bg-transparent shadow md:shadow-none rounded-b-md md:rounded-none p-4 md:p-0`}
      >
        <div className="max-w-6xl mx-auto md:mx-0 flex flex-col md:flex-row md:items-center md:gap-8">
          {navItems.map((item) => (
            <NavItem key={item.label} to={item.to}>
              {item.label}
            </NavItem>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
