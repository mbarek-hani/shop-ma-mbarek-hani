import { useSelector } from "react-redux";
import { selectCategoryById } from "@/features/categories/categoriesSelectors";

function ProductItem({ product }) {
    const category = useSelector((s) => selectCategoryById(s, product.category_id));

    return (
        <li className="flex items-center gap-4">
            <img src={product.image} className="w-14 h-14 rounded-md object-cover bg-slate-100" />
            <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{product.name}</div>
                <div className="text-sm text-slate-500 truncate">cat:{category.name}</div>
            </div>
            <div className="text-right text-sm">
                <div className="font-medium">{product.price.toFixed(2)} DH</div>
                <div className={`text-xs ${product.in_stock ? "text-green-600" : "text-rose-600"}`}>{product.in_stock ? "En stock" : "Rupture"}</div>
            </div>
        </li>
    );
}

export default ProductItem;