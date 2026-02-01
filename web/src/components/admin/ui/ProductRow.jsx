import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCategoryById } from "@/features/categories/categoriesSelectors";
import { deleteProduct } from "@/features/products/productsSlice";
import { Eye, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";

function ProductRow({ product }) {
  const category = useSelector((s) => selectCategoryById(s, product.category_id));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);

  const handleView = () => navigate(`/products/${product.id}`);
  const handleEdit = () => navigate(`/admin/products/${product.id}/edit`);

  const handleDelete = async () => {
    if (!window.confirm(`Supprimer « ${product.name} » ?`)) return;
    try {
      setDeleting(true);
      await dispatch(deleteProduct(product.id)).unwrap();
      navigate('/admin/products', { replace: true, state: { success: 'Produit supprimé' } });
    } catch (err) {
      window.alert('Échec de la suppression — réessayez.');
    } finally {
      setDeleting(false);
    }
  };

  const iconBtn = (props) => (
    <button
      type="button"
      {...props}
      className={`cursor-pointer inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${props.className}`}
    />
  );

  return (
    <tr className="border-t border-gray-50 dark:border-slate-800">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={product.image} className="w-12 h-12 rounded-md object-cover bg-slate-100" />
          <div className="min-w-0">
            <div className="font-medium truncate">{product.name}</div>
            <div className="text-xs text-slate-400 truncate">ID: {product.id}</div>
          </div>
        </div>
      </td>

      <td className="px-4 py-3">{product.price.toFixed(2)} DH</td>
      <td className="px-4 py-3">{category?.name}</td>
      <td className={`px-4 py-3 ${product.in_stock ? "text-green-600" : "text-rose-600"}`}>{product.in_stock ? "En stock" : "Rupture"}</td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {iconBtn({
            onClick: handleView,
            title: "Voir",
            className: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300",
            children: <Eye className="w-4 h-4" />,
          })}

          {iconBtn({
            onClick: handleEdit,
            title: "Modifier",
            className: "bg-sky-50 text-sky-600 hover:bg-sky-100 dark:bg-sky-900/30 dark:text-sky-300",
            children: <Edit3 className="w-4 h-4" />,
          })}

          {iconBtn({
            onClick: handleDelete,
            title: "Supprimer",
            disabled: deleting,
            className: "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300",
            children: <Trash2 className="w-4 h-4" />,
          })}
        </div>
      </td>
    </tr>
  );
}

export default ProductRow;
