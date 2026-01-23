import { Header, Footer, ProductList } from "@/components";

function App() {
  return (
    <>
      <Header />
      <main className="pt-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default App;
