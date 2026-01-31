import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "@/features/products/productsSelectors";
import { Button } from "@/components";
import { useEffect } from "react";
import { selectCategoryById } from "../../features/categories/categoriesSelectors";
import { fetchProducts } from "../../features/products/productsSlice";
import { fetchCategories } from "../../features/categories/categoriesSlice";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById(id));
  const category = useSelector((s) => selectCategoryById(s, product?.category_id || 0));
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit && !product) {
        dispatch(fetchProducts());
    }
    if (isEdit && !category) {
        dispatch(fetchCategories());
    }
  }, [isEdit]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">{isEdit ? "Modifier le produit" : "Ajouter un produit"}</h2>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm p-4 md:p-6 max-w-3xl">
        <p className="text-sm text-slate-500 mb-4">Formulaire {isEdit ? "d'édition" : "de création"}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input name="name" className="w-full p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" defaultValue={product?.name || ""} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prix (€)</label>
            <input name="price" type="number" step="0.01" className="w-full p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" defaultValue={product?.price || ""} />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" rows={4} className="w-full p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" defaultValue={product?.description || ""} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <input name="category" className="w-full p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" defaultValue={category?.name || ""} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image (URL)</label>
            <input name="image" className="w-full p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" defaultValue={product?.image || ""} />
          </div>

          <div className="flex items-center gap-3">
            <input id="in_stock" name="in_stock" type="checkbox" defaultChecked={Boolean(product?.inStock ?? product?.in_stock)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="in_stock" className="text-sm">En stock</label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>Annuler</Button>
          <Button variant="success">{isEdit ? "Enregistrer" : "Créer"}</Button>
        </div>
      </div>
    </div>
  );
}
