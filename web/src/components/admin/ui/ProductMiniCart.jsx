import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCategoryById } from "@/features/categories/categoriesSelectors";
import { Button } from "@/components";

function ProductMiniCart({ product }) {
    const navigate = useNavigate();
    const category = useSelector((s) => selectCategoryById(s, product.category_id));


    return (
        <div
            className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm p-3 flex flex-col sm:flex-row gap-3"
        >
            <img
                src={product.image}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-md object-cover bg-slate-100 shrink-0"
            />

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

                <div className="mt-2 flex items-center justify-between">
                    <Button
                        variant="success"
                        onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                    >
                        Modifier
                    </Button>

                    <div className="text-xs text-slate-400">{new Date(product.created_at).toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    );
}

export default ProductMiniCart;