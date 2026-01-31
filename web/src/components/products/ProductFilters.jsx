import { setFilter, setSortBy, resetFilters } from "@/features/products/productsSlice";
import { selectAllCategories } from "@/features/categories/categoriesSelectors";
import { fetchCategories } from "@/features/categories/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "@/components";

function ProductFilters() {
    const dispatch = useDispatch();
    const filters = useSelector((s) => s.products.filters);
    const categories = useSelector(selectAllCategories);

    useEffect(() => {
      if (!categories || categories.length === 0) {
        dispatch(fetchCategories());
      }
    }, []);

    return (
      <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-end bg-transparent">
        <div className="flex-1 min-w-0">
          <label htmlFor="products-search" className="sr-only">Rechercher</label>
          <input
            id="products-search"
            className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600"
            placeholder="Rechercher (nom, description)…"
            value={filters.query || ""}
            onChange={(e) => dispatch(setFilter({ query: e.target.value }))}
          />
        </div>

        <div className="flex w-full sm:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <label htmlFor="products-category" className="sr-only sm:visible text-sm text-slate-600 dark:text-slate-400">Catégorie</label>
          <select
            id="products-category"
            className="w-full sm:w-auto rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 min-w-0"
            onChange={(e) => dispatch(setFilter({ category: e.target.value || null }))}
            value={filters.category || ""}
          >
            <option value="">Toutes</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>

          <label htmlFor="products-sort" className="sr-only sm:visible text-sm text-slate-600 dark:text-slate-400">Trier</label>
          <select
            id="products-sort"
            className="w-full sm:w-auto rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 min-w-0"
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            value={filters.sortBy || "none"}
          >
            <option value="none">Par défaut</option>
            <option value="price-asc">Prix — bas → haut</option>
            <option value="price-desc">Prix — haut → bas</option>
            <option value="rating-desc">Note — plus haute</option>
            <option value="rating-asc">Note — plus basse</option>
          </select>

          <Button size="lg" variant="ghost" className="w-full sm:w-auto" onClick={() => dispatch(resetFilters())}>Réinitialiser</Button>
        </div>
      </div>
    );
}

export default ProductFilters;