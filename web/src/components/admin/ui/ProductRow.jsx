import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategoryById } from "@/features/categories/categoriesSelectors";
import { Button } from "@/components";

function ProductRow({ product }) {
    const category = useSelector((s) => selectCategoryById(s, product.category_id))
    const navigate = useNavigate();

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
            <td className={`px-4 py-3 ${product.in_stock ? "text-green-600": "text-rose-600"}`}>{product.in_stock ? "En stock" : "Rupture"}</td>
            <td className="px-4 py-3">
                <Button variant="success" onClick={() => navigate(`/admin/products/${product.id}/edit`)}>Modifier</Button>
            </td>
        </tr>
    );
}

export default ProductRow;