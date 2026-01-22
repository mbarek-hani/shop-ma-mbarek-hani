import { Header, Footer, ProductCard } from "@/components";

import products from "@/data/products";

function App() {
  return (
    <>
      <Header />
      <main className="pt-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
