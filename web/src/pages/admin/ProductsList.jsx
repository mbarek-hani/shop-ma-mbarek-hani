import { Link } from "react-router-dom";
import { ProductRow } from "@/components";
import { useEffect } from "react";
import { fetchProducts } from "@/features/products/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectAllProducts } from "@/features/products/productsSelectors";
import { ProductMiniCart } from "@/components";
import { fetchCategories } from "@/features/categories/categoriesSlice";

export default function ProductsList() {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
            dispatch(fetchCategories());
        }
    }, []);

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Produits</h2>
                <Link to="/admin/products/new" className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">Ajouter</Link>
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
                            {products.map((p) => (
                                <ProductRow key={p.id} product={p} />
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-400">Aucun produit</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* mobile */}
            <div className="md:hidden space-y-3">
                {products.map((p) => (
                    <ProductMiniCart key={p.id} product={p} />
                ))}

                {products.length === 0 && <div className="text-sm text-slate-400">Aucun produit</div>}
            </div>
        </>
    );
}
