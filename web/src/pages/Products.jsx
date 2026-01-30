import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, ProductCard, Error, ProductFilters } from "@/components";
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
    return (
      <div className="flex flex-col gap-4 w-full text-slate-900 dark:text-slate-100">
        <ProductFilters />
        <Spinner />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col gap-4 w-full text-slate-900 dark:text-slate-100">
        <ProductFilters />
        <Error retry={() => dispatch(fetchProducts())}>{error}</Error>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full text-slate-900 dark:text-slate-100">

      <ProductFilters />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.length > 0 ? products.map((product) => (
          <ProductCard key={product.id} product={product} />
        )): (
          <div>There are no available products</div>
        )}
      </div>

    </div>
  );
}

export default Products;
