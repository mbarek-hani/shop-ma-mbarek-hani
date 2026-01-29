import { Button } from "@/components";
import { useNavigate, Link } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <article className="bg-white dark:bg-slate-900 rounded-lg flex flex-col justify-between p-4 shadow-sm dark:shadow-none hover:shadow-md transition-shadow border border-transparent dark:border-slate-800">
      <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-md bg-slate-50 dark:bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        />
      </div>

      <div className="mt-3 flex-1">
        {product.in_stock ? (
          <span className="inline-block text-xs text-white bg-green-600 dark:bg-green-500 px-2 py-1 rounded-md">
            Disponible
          </span>
        ) : (
          <span className="inline-block text-xs text-white bg-orange-600 dark:bg-orange-500 px-2 py-1 rounded-md">
            Indisponible
          </span>
        )}

        <h3 className="mt-2 text-sm md:text-base font-medium text-gray-800 dark:text-slate-100">
          {product.name}{" "}
        </h3>
        <span className="text-green-600 dark:text-green-400 font-semibold">{product.price} DH</span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Button disabled={!product.in_stock} variant={product.in_stock ? "success": "ghost"}>Ajouter</Button>
        <Link
          to={`/products/${product.id}`}
          className="text-sm text-blue-600 dark:text-blue-400 border-b border-blue-600 dark:border-blue-400">Void détails</Link>
      </div>
    </article>
  );
}

export default ProductCard;
