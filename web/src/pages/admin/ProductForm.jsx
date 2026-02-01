import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "@/features/products/productsSelectors";
import { Button } from "@/components";
import { useEffect, useState } from "react";
import { selectCategoryById } from "../../features/categories/categoriesSelectors";
import { fetchProducts, addProduct } from "../../features/products/productsSlice";
import { fetchCategories } from "../../features/categories/categoriesSlice";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById(id));
  const categories = useSelector((s) => s.categories.items || []);
  const category = useSelector((s) => selectCategoryById(s, product?.category_id || 0));
  const isEdit = Boolean(id);

  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [description, setDescription] = useState(product?.description || "");
  const [categoryInput, setCategoryInput] = useState(product ? (category?.name || "") : "");
  const [image, setImage] = useState(product?.image || "");
  const [inStock, setInStock] = useState(Boolean(product?.inStock ?? product?.in_stock));

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && !product) {
      dispatch(fetchProducts());
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [isEdit, dispatch, categories.length, product]);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price ?? "");
      setDescription(product.description || "");
      setImage(product.image || "");
      setInStock(Boolean(product?.inStock ?? product?.in_stock));
      const cat = categories.find((c) => c.id === product.category_id);
      setCategoryInput(cat?.name || "");
    }
  }, [product, categories]);

  const validate = () => {
    const e = {};
    if (!name || !name.trim()) e.name = "Le nom est requis";
    if (!description || !description.trim()) e.description = "Description est requis";
    if (!categoryInput || !categoryInput.trim()) e.categoryInput = "Categorie est requis";
    const num = Number(price);
    if (Number.isNaN(num) || num <= 0) e.price = "Le prix doit être > 0";
    if (!/^https?:\/\/.+/.test(image)) e.image = "L'URL de l'image semble invalide";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const matched = categories.find((c) => c.name.toLowerCase() === (categoryInput || "").trim().toLowerCase());
    const payload = {
      name: name.trim(),
      price: Number(price),
      description: description || "",
      category_id: matched ? matched.id : null,
      image: image || "",
      in_stock: Boolean(inStock),
    };

    try {
      setSubmitting(true);
      const res = await dispatch(addProduct(payload)).unwrap();
      navigate('/admin/products', { state: { success: 'Produit créé avec succès' } });
    } catch (err) {
      alert("Couldn't create product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">{isEdit ? "Modifier le produit" : "Ajouter un produit"}</h2>
      </div>

      <form onSubmit={submit} className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm p-4 md:p-6 max-w-3xl">
        <p className="text-sm text-slate-500 mb-4">Formulaire {isEdit ? "d'édition" : "de création"}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom <span className="text-rose-600">*</span></label>
            <input name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
            {errors.name && <div className="text-rose-600 text-xs mt-1">{errors.name}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prix (DH) <span className="text-rose-600">*</span></label>
            <input name="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
            {errors.price && <div className="text-rose-600 text-xs mt-1">{errors.price}</div>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description <span className="text-rose-600">*</span></label>
            <textarea name="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
            {errors.description && <div className="text-rose-600 text-xs mt-1">{errors.description}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Catégorie <span className="text-rose-600">*</span></label>
            <input name="category" value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} list="cats" className="w-full p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
            <datalist id="cats">
              {categories.map((c) => <option key={c.id} value={c.name} />)}
            </datalist>
            {errors.categoryInput && <div className="text-rose-600 text-xs mt-1">{errors.categoryInput}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image (URL) <span className="text-rose-600">*</span></label>
            <input name="image" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
            {errors.image && <div className="text-rose-600 text-xs mt-1">{errors.image}</div>}
          </div>

          <div className="flex items-center gap-3">
            <input id="in_stock" name="in_stock" type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="in_stock" className="text-sm">En stock</label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>Annuler</Button>
          <Button variant="success" type="submit" disabled={submitting}>{submitting ? (isEdit ? 'Enregistrement...' : 'Création...') : (isEdit ? 'Enregistrer' : 'Créer')}</Button>
        </div>
      </form>
    </div>
  );
}
