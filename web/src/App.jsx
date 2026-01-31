import { Header, Footer, AdminLayout } from "@/components";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Wishlist from "@/pages/Wishlist";
import Contact from "@/pages/Contact";

import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProducts from "@/pages/admin/ProductsList";
import AdminProductForm from "@/pages/admin/ProductForm";
import AdminOrders from "@/pages/admin/Orders";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen text-slate-900 dark:text-slate-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          {/* admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/:id/edit" element={<AdminProductForm />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
