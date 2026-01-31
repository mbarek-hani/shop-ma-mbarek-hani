import { Button } from "@/components";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import { selectIsInWishlist } from "@/features/wishlist/wishlistSelectors";
import { Heart } from "lucide-react";
import { TITLE_LIMIT, DESC_LIMIT } from "@/utils/constants";
import { truncate } from "@/utils/helpers";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInWishlist = useSelector((s) => selectIsInWishlist(s, product.id));

  const title = truncate(product.name, TITLE_LIMIT);
  const description = truncate(product.description, DESC_LIMIT);

  return (
    <article className="h-full bg-white dark:bg-slate-900 rounded-lg flex flex-col p-3 sm:p-4 shadow-sm dark:shadow-none hover:shadow-md hover:scale-[1.01] transition-shadow border border-transparent dark:border-slate-800">
      <div className="relative w-full h-44 xs:h-48 sm:h-56 md:h-64 overflow-hidden rounded-md bg-slate-50 dark:bg-slate-800 shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        />

        <div className="absolute left-2 top-2 sm:left-3 sm:top-3 inline-flex items-center gap-2 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-md px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium border border-slate-100 dark:border-slate-800">
          <span className="text-slate-800 dark:text-slate-100">{typeof product.price === 'number' ? product.price.toFixed(2) : product.price} DH</span>
        </div>

        <div className="absolute right-2 top-2 sm:right-3 sm:top-3 flex items-start gap-2">
          <div>
            <span className={`inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-md ${product.in_stock ? 'bg-green-600 text-white dark:bg-green-500' : 'bg-orange-600 text-white dark:bg-orange-500'}`}>
              {product.in_stock ? 'Disponible' : 'Indisponible'}
            </span>
          </div>

          <button
            title={isInWishlist ? 'Retirer des favoris' : "Ajouter aux favoris"}
            onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist({ id: product.id, name: product.name, image: product.image, price: product.price })); }}
            className={`ml-1 cursor-pointer rounded-full p-1 shadow-sm hover:scale-105 transition-transform ${isInWishlist ? 'bg-red-50 dark:bg-red-900/30' : 'bg-white/70 dark:bg-slate-800'}`}>
            <Heart className={`${isInWishlist ? 'text-red-600' : 'text-slate-400 dark:text-slate-300'} w-4 h-4`} />
          </button>
        </div>
      </div>

      <div className="mt-3 flex-1 flex flex-col">
        <h3 title={product.name} className="text-sm sm:text-base font-medium text-gray-800 dark:text-slate-100 leading-tight">
          {title}
        </h3>

        {product.description && (
          <p title={product.description} className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 w-full overflow-hidden max-h-18 leading-5">
            {description}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-3 sm:gap-4 flex-1 justify-end">
          <div className="flex items-center gap-3 min-h-5">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.567L18.835 24 12 19.897 5.165 24l1.135-8.683L.6 9.75l7.732-1.732L12 .587z" />
              </svg>
              <span className="font-semibold text-slate-800 dark:text-slate-100">{product.rating_rate ? (Number(product.rating_rate).toFixed(1)) : '—'}</span>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">({product.rating_count ?? 0})</span>
            </div>

            <div className="hidden xs:inline text-xs sm:text-sm text-slate-500 dark:text-slate-400">·</div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate max-w-32">{product.category || ''}</div>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-2 min-h-12 flex-col sm:flex-row">
            <Button
              disabled={!product.in_stock}
              variant={product.in_stock ? "success" : "ghost"}
              className="px-3 py-1 text-xs sm:text-sm h-8 sm:h-9"
              onClick={() => dispatch(addToCart({ id: product.id, price: product.price, quantity: 1, name: product.name, image: product.image }))}
            >
              Ajouter
            </Button>

            <Link
              to={`/products/${product.id}`}
              className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 border-b border-blue-600 dark:border-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              Voir détails
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;