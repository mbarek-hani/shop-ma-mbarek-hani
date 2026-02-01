import { Link, useLocation } from "react-router-dom";
import { ProductRow } from "@/components";
import { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "@/features/products/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectAllProducts } from "@/features/products/productsSelectors";
import { ProductMiniCart } from "@/components";
import { fetchCategories } from "@/features/categories/categoriesSlice";
import { selectAllCategories } from "@/features/categories/categoriesSelectors";

export default function ProductsList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);
  const { state } = useLocation();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [flash, setFlash] = useState(state?.success || "");

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (flash) {
      const t = setTimeout(() => setFlash(""), 3500);
      return () => clearTimeout(t);
    }
  }, [flash]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (category && p.category_id != category) return false;
      return true;
    });
  }, [products, query, category]);

  return (
    <>
      {flash && (
        <div className="mb-4 max-w-3xl">
          <div className="rounded-md bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 px-4 py-2 text-sm text-emerald-700 dark:text-emerald-300">
            {flash}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium">Produits</h2>
          <div className="text-sm text-slate-400">{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 shadow-sm">
            <input
              className="appearance-none bg-transparent placeholder-slate-400 text-sm w-full text-slate-700 dark:text-slate-100 focus:outline-none"
              placeholder="Rechercher par nom..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                title="Effacer"
                onClick={() => setQuery("")}
                className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>

          <div className="w-full sm:w-48">
            <label className="sr-only">Filtrer par catégorie</label>
            <select
              aria-label="Filtrer par catégorie"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-md px-3 py-2 text-slate-700 dark:text-slate-100"
            >
              <option value="">Toutes catégories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <Link to="/admin/products/new" className="inline-flex items-center justify-center bg-blue-600 text-white rounded-md text-sm px-3 py-2 hover:bg-blue-700">Ajouter</Link>
        </div>
      </div>

      {/* desktop */}
      <div className="hidden md:block bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead className="text-left text-slate-500 bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3">Produit</th>
                <th className="px-4 py-3">Prix</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <ProductRow key={p.id} product={p} />
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-400">
                    Aucun produit correspondant. Réessayez avec d'autres critères.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* mobile */}
      <div className="md:hidden space-y-3">
        {filtered.map((p) => (
          <ProductMiniCart key={p.id} product={p} />
        ))}

        {filtered.length === 0 && <div className="text-sm text-slate-400">Aucun produit</div>}
      </div>
    </>
  );
}
