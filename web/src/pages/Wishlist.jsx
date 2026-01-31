import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components";
import { ShoppingBag, Trash } from "lucide-react";
import WishlistItem from "@/components/wishlist/WishlistItem";
import { selectWishlistItems, selectWishlistCount } from "@/features/wishlist/wishlistSelectors";
import { removeFromWishlist } from "@/features/wishlist/wishlistSlice";
import { addToCart } from "@/features/cart/cartSlice";

function Wishlist() {
  const items = useSelector(selectWishlistItems);
  const count = useSelector(selectWishlistCount);
  const dispatch = useDispatch();

  const handleAdd = (it) => dispatch(addToCart({ id: it.id, price: it.price, quantity: 1, name: it.name, image: it.image }));
  const handleRemove = (id) => dispatch(removeFromWishlist(id));

  if (!items || items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm dark:shadow-none p-8">
          <div className="flex items-center justify-center mb-4">
            <ShoppingBag className="w-12 h-12 text-slate-700 dark:text-slate-200" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Aucun favori</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Ajoutez des produits à vos favoris pour les retrouver facilement plus tard.</p>
          <Link to="/products">
            <Button variant="success">Voir les produits</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 min-h-[60vh]">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm dark:shadow-none p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Vos favoris</h1>
          <div className="text-sm text-slate-600 dark:text-slate-400">{count} item{count > 1 ? 's' : ''}</div>
        </div>

        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((it) => (
            <WishlistItem
              key={it.id}
              item={it}
              onAddToCart={handleAdd}
              onRemove={handleRemove}
            />
          ))}
        </ul>

      </div>
    </div>
  );
}

export default Wishlist;
