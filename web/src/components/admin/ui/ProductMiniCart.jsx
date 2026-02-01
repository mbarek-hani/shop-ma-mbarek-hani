import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCategoryById } from "@/features/categories/categoriesSelectors";
import { fetchProducts } from "@/features/products/productsSlice";
import { BASE_URL } from "@/utils/constants";
import { Eye, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";

function ProductMiniCart({ product }) {
  const navigate = useNavigate();
  const category = useSelector((s) => selectCategoryById(s, product.category_id));
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);

  const handleView = () => navigate(`/products/${product.id}`);
  const handleEdit = () => navigate(`/admin/products/${product.id}/edit`);
  const handleDelete = async () => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      setDeleting(true);
      const res = await fetch(`${BASE_URL}/products/${product.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      dispatch(fetchProducts());
    } catch (err) {
      console.error(err);
      window.alert("Impossible de supprimer le produit");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm p-3 flex flex-col sm:flex-row gap-3">
      <img src={product.image} className="w-12 h-12 sm:w-16 sm:h-16 rounded-md object-cover bg-slate-100 shrink-0" />

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-medium truncate">{product.name}</div>
            <div className="text-xs text-slate-400">ID: {product.id}</div>
          </div>

          <div className="text-sm text-right shrink-0">
            <div className="font-medium">{product.price.toFixed(2)} DH</div>
            <div className={`text-xs ${product.in_stock ? "text-green-600" : "text-rose-600"}`}>{product.in_stock ? "En stock" : "Rupture"}</div>
          </div>
        </div>

        <div className="text-sm text-slate-500 whitespace-normal">{category?.name || ""}</div>

        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleView}
              title="Voir"
              className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-1"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleEdit}
              title="Modifier"
              className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-sky-50 text-sky-600 hover:bg-sky-100 dark:bg-sky-900/30 dark:text-sky-300 focus:outline-none focus:ring-2 focus:ring-offset-1"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              title="Supprimer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-400">{new Date(product.created_at).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductMiniCart;
