import useFetch from "@/hooks/useFetch";
import { Spinner, ProductCard, Error, Button } from "@/components";

function ProductList() {
  const {
    data: products,
    getData: getProducts,
    loading,
    error,
  } = useFetch("/products", "Failed to load products");

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error retry={getProducts}>{error}</Error>;
  }

  return (
    <div className="flex flex-col gap-4 items-end">
      <Button onClick={getProducts}>Refresh</Button>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
