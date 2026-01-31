import { useSelector, useDispatch } from "react-redux";
import { selectCategoryById } from "@/features/categories/categoriesSelectors";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "@/features/categories/categoriesSlice";

function ProductRow({ product }) {
    const dispatch = useDispatch();
    const category = useSelector((s) => selectCategoryById(s, product.category_id))

    useEffect(() => {
        if(!category) {
            dispatch(fetchCategories());
        }
    }, []);
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
            <td className="px-4 py-3">{product.in_stock ? "En stock" : "Rupture"}</td>
            <td className="px-4 py-3">
                <Link to={`/admin/products/${product.id}/edit`} className="text-sm text-blue-600">Modifier</Link>
            </td>
        </tr>
    );
}

export default ProductRow;