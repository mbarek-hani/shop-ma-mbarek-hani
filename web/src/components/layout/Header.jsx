import { useState } from "react";
import logo from "@/assets/logo.png";
import { NavItem, BurgerIcon } from "@/components";
import useTheme from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const navItems = [
    { to: "/", label: "Acceuil" },
    { to: "/products", label: "Produits" },
    { to: "/cart", label: "Panier" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="relative flex items-center justify-between px-4 md:px-0 max-w-6xl mx-auto text-slate-900 dark:text-slate-100">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="shop.ma logo" className="w-20 md:w-24" />
      </div>

      <button
        className="md:hidden p-2 rounded-md focus:outline-none focus:ring focus:ring-slate-300 dark:focus:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50"
        onClick={() => setOpen((v) => !v)}
      >
        <BurgerIcon open={open} />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )} 

      <nav
        className={`md:flex md:items-center md:gap-8 ${open ? "block" : "hidden"} absolute md:static z-50 md:z-auto left-0 right-0 top-full bg-white dark:bg-slate-900 md:bg-transparent shadow dark:shadow-none md:shadow-none rounded-b-md md:rounded-none p-4 md:p-0 text-slate-900 dark:text-slate-100`}
      >
        <div className="max-w-6xl mx-auto md:mx-0 flex flex-col md:flex-row md:items-center md:gap-8">
          {navItems.map((item) => (
            <NavItem key={item.label} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </NavItem>
          ))}
          <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Activer thème clair" : "Activer thème sombre"}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus:outline-none focus:ring focus:ring-slate-300 dark:focus:ring-slate-600"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
