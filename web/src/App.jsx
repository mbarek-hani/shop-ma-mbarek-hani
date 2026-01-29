import { Header, Footer } from "@/components";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Contact from "@/pages/Contact";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="pt-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen text-slate-900 dark:text-slate-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
