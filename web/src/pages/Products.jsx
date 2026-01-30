import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, ProductCard, Error, Button } from "@/components";
import { fetchProducts } from "@/features/products/productsSlice";
import {
  selectFilteredProducts,
  selectProductsStatus,
  selectProductsError,
} from "@/features/products/productsSelectors";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading" && products.length === 0) {
    return <Spinner />;
  }

  if (status === "failed") {
    return <Error retry={() => dispatch(fetchProducts())}>{error}</Error>;
  }

  return (
    <div className="flex flex-col gap-4 items-end text-slate-900 dark:text-slate-100">
      <Button onClick={() => dispatch(fetchProducts())}>Refraîchir</Button>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {(products || []).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
