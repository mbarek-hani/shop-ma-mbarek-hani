import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button, Spinner, Error } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/features/cart/cartSlice';
import {
    selectProductById,
    selectProductsError,
    selectProductsStatus
} from '@/features/products/productsSelectors';
import { fetchProductById } from '../features/products/productsSlice';
import { useEffect } from 'react';
import { selectCategoryById } from '@/features/categories/categoriesSelectors';
import { fetchCategories } from '@/features/categories/categoriesSlice';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const product = useSelector(selectProductById(id));
    const status = useSelector(selectProductsStatus);
    const error = useSelector(selectProductsError);
    const categoryFromStore = useSelector((s) => (product?.category_id ? selectCategoryById(s, product.category_id) : null));
    const category = categoryFromStore?.name || '';

    useEffect(() => {
        if (category == "") {
            dispatch(fetchCategories());
        }
        if (!product) {
            dispatch(fetchProductById(id));
        }
    }, [id])

    if (error) {
        return <Error retry={() => dispatch(fetchProductById(id))}>{error}</Error>;
    }

    if (status === "loading" || !product) {
        return <Spinner />;
    }


    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition cursor-pointer"
                >
                    <ArrowLeft size={20} /> Retour
                </button>

                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg dark:shadow-none overflow-hidden border border-transparent dark:border-slate-800">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
                        <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-96 object-contain"
                            />
                        </div>

                        <div className="flex flex-col gap-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-4">
                                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm font-semibold px-3 py-1 rounded-full">
                                        {category}
                                    </span>
                                    {product.in_stock ? (
                                        <span className="inline-block text-xs text-white bg-green-600 dark:bg-green-500 px-2 py-1 rounded-md">
                                            Disponible
                                        </span>
                                    ) : (
                                        <span className="inline-block text-xs text-white bg-orange-600 px-2 py-1 rounded-md">
                                            Indisponible
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                        {product.rating_rate}
                                    </span>
                                    <span className="ml-2 text-yellow-500 dark:text-yellow-400 text-xl">★</span>
                                </div>
                                <span className="text-slate-600 dark:text-slate-400">
                                    ({product.rating_count} avis)
                                </span>
                            </div>

                            <div className="border-t-2 border-b-2 border-slate-200 dark:border-slate-700 py-4">
                                <span className="text-slate-600 text-sm">Prix</span>
                                <p className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                                    {product.price} DH
                                </p>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                                    Description
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 mt-4">
                                <Button
                                  variant="success"
                                  onClick={() => dispatch(addToCart({ id: product.id, price: product.price, quantity: 1, name: product.name, image: product.image }))}
                                >
                                  Ajouter au panier
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => navigate(-1)}
                                >
                                    Retour
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;