import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts, selectProductsStatus, selectProductsError } from "@/features/products/productsSelectors";
import { fetchProducts } from "@/features/products/productsSlice";
import { selectAllCategories, selectCategoriesStatus, selectCategoriesError } from "@/features/categories/categoriesSelectors";
import { fetchCategories } from "@/features/categories/categoriesSlice";
import { StatCard, Spinner, Error, ProductItem } from "@/components";

export default function Dashboard() {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const productsStatus = useSelector(selectProductsStatus);
    const productsError = useSelector(selectProductsError);
    const categories = useSelector(selectAllCategories);
    const categoriesStatus = useSelector(selectCategoriesStatus);
    const categoriesError = useSelector(selectCategoriesError);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories())
        }
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, []);

    const stats = useMemo(() => {
        const total = products.length;

        const inStockProductsLength = products.filter((p) => p.in_stock).length;

        const outOfStockProductsLength = Math.max(0, total - inStockProductsLength);

        // deterministic simulated orders & revenue (not real)
        const orders = Math.max(0, Math.floor(total * 0.27));
        const revenue = products.reduce((sum, p) => {
            const price = Number(p.price || 0);
            return sum + price * (p.inStock ? 3 : 1);
        }, 0);

        const latestFiveProducts = products
            .filter((p) => p && p.created_at)
            .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);

        return { total, inStock: inStockProductsLength, outOfStock: outOfStockProductsLength, orders, revenue, latest: latestFiveProducts };
    }, [products]);

    if(
        (productsStatus === "loading" && products.length === 0)
        || (categoriesStatus === "loading" && categories.length === 0)
    ) {
        return <Spinner />;
    }

    if (categoriesError) {
        return <Error retry={() => dispatch(fetchCategories())}>{categoriesError}</Error>;
    }

    if (productsError) {
        return <Error retry={() => dispatch(fetchProducts())}>{productsError}</Error>;
    }

    return (
        <>
            <h2 className="text-lg font-medium mb-4">Tableau de bord</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 auto-rows-fr">
                <StatCard title="Produits au total" value={stats.total} />
                <StatCard title="En stock" value={stats.inStock} className="text-green-600" />
                <StatCard title="Ruptures" value={stats.outOfStock} className="text-rose-600" />
                <StatCard title="Commandes (simulées)" value={stats.orders} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm p-4 md:p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-sm text-slate-500">Chiffre d'affaires (simulé)</h3>
                            <div className="mt-2 text-2xl font-semibold">{stats.revenue.toFixed(2)} DH</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h4 className="text-sm font-medium mb-3">Derniers produits ajoutés</h4>

                        <div className="-mx-4 px-4 md:mx-0 md:px-0">
                          <ul className="flex gap-3 overflow-x-auto md:overflow-visible md:block py-2 md:py-0 md:space-y-3">
                            {stats.latest.length === 0 && <li className="text-sm text-slate-400">Aucun produit</li>}
                            {stats.latest.map((p) => (
                                <ProductItem key={p.id} product={p} />
                            ))}
                          </ul>
                        </div>

                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm p-6">
                    <h4 className="text-sm font-medium mb-3">Raccourcis</h4>
                    <div className="flex flex-col gap-3">
                        <Link className="text-sm text-blue-600" to="/admin/products">Voir tous les produits</Link>
                        <Link className="text-sm text-blue-600" to="/admin/products/new">Ajouter un produit</Link>
                        <Link className="text-sm text-blue-600" to="/admin/orders">Voir les commandes</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
