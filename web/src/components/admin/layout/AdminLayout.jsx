import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavItem from "@/components/admin/ui/NavItem";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/products", label: "Produits" },
    { to: "/admin/products/new", label: "Ajouter produit" },
    { to: "/admin/orders", label: "Commandes" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md bg-white dark:bg-slate-800 border border-transparent dark:border-slate-800 shadow-sm"
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm dark:shadow-none overflow-hidden">
          <div className="md:flex">
            <aside
              className={`md:w-64 border-r border-transparent dark:border-slate-800 p-4 md:p-6 ${open ? "block" : "hidden"} md:block bg-white dark:bg-slate-900`}
            >
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavItem key={item.label} to={item.to} onClick={() => setOpen(false)}>{item.label}</NavItem>
                ))}
              </nav>
            </aside>

            <section className="flex-1 p-4 md:p-6">
              <Outlet />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
