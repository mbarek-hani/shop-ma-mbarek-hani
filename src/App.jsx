import { Header, Footer, ProductCard } from "./components";

import products from "@/data/products";

function App() {

  return (
    <>
      <Header />
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          inStock={product.inStock}
        />
      ))}
      <Footer />
    </>
  );
}

export default App;
