import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components";
import { ShoppingCart, Plus, Minus, Trash } from "lucide-react";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/features/cart/cartSlice";
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
} from "@/features/cart/cartSelectors";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);

  const onInc = (id, current) => dispatch(updateQuantity({ id, quantity: current + 1 }));
  const onDec = (id, current) => dispatch(updateQuantity({ id, quantity: Math.max(0, current - 1) }));
  const onRemove = (id) => dispatch(removeFromCart(id));
  const onClear = () => dispatch(clearCart());

  if (!items || items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm dark:shadow-none p-8">
          <div className="flex items-center justify-center mb-4">
            <ShoppingCart className="w-12 h-12 text-slate-700 dark:text-slate-200" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Panier vide</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Vous n'avez ajouté aucun produit pour le moment.</p>
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
          <h1 className="text-2xl font-semibold">Votre panier</h1>
          <div className="text-sm text-slate-600 dark:text-slate-400">{count} article{count > 1 ? 's' : ''}</div>
        </div>

        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((it) => (
            <li key={it.id} className="flex items-center gap-4 py-4">
              <img src={it.image} alt={it.name} className="w-20 h-20 object-cover rounded-md bg-slate-50 dark:bg-slate-800" />

              <div className="flex-1 min-w-0">
                <Link to={`/products/${it.id}`} className="font-medium text-slate-900 dark:text-slate-100 hover:underline">
                  {it.name}
                </Link>
                <div className="mt-2 flex items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center border rounded-md overflow-hidden bg-slate-50 dark:bg-slate-800">
                      <button className="p-2" onClick={() => onDec(it.id, it.quantity)}>
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="px-3 font-medium">{it.quantity}</div>
                      <button className="p-2" onClick={() => onInc(it.id, it.quantity)}>
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <Button variant="danger" className="flex items-center gap-1" onClick={() => onRemove(it.id)}>
                      <Trash className="w-4 h-4" /> Supprimer
                    </Button>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-slate-500">Prix unitaire</div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{(Number(it.price) || 0).toFixed(2)} DH</div>
                    <div className="text-xs text-slate-500 mt-1">Sous-total <span className="font-medium">{(Number(it.price) * Number(it.quantity)).toFixed(2)} DH</span></div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onClear}>Vider le panier</Button>
            <Link to="/products">
              <Button variant="success">Continuer vos achats</Button>
            </Link>
          </div>

          <div className="ml-auto bg-slate-50 dark:bg-slate-800 rounded-md p-4 text-right">
            <div className="text-sm text-slate-500">Total</div>
            <div className="text-2xl font-bold">{(Number(total) || 0).toFixed(2)} DH</div>
            <div className="mt-2 text-sm text-slate-600">Taxes et livraison calculées lors du paiement</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;