import { Link } from "react-router-dom";
import { Button } from "@/components";
import { Minus, Plus, Trash } from "lucide-react";

export default function CartItem({ item, onInc, onDec, onRemove }) {
  const price = Number(item.price) || 0;
  const qty = Number(item.quantity) || 0;

  return (
    <li className="py-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 sm:w-20 sm:h-20 object-cover rounded-md bg-slate-50 dark:bg-slate-800 shrink-0"
        />

        <div className="flex-1 min-w-0">
          <Link to={`/products/${item.id}`} className="font-medium text-slate-900 dark:text-slate-100 hover:underline line-clamp-2">
            {item.name}
          </Link>

          <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center border rounded-md overflow-hidden bg-slate-50 dark:bg-slate-800">
                <button
                  className="p-2 disabled:opacity-50"
                  onClick={() => onDec(item.id, qty)}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="px-3 font-medium" aria-live="polite">{qty}</div>
                <button
                  className="p-2"
                  onClick={() => onInc(item.id, qty)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button variant="danger" className="flex items-center gap-2" onClick={() => onRemove(item.id)}>
                <Trash className="w-4 h-4" /> <span className="hidden sm:inline">Supprimer</span>
              </Button>
            </div>

            <div className="text-right mt-2 md:mt-0">
              <div className="text-sm text-slate-500">Prix unitaire</div>
              <div className="font-semibold text-slate-900 dark:text-slate-100">{price.toFixed(2)} DH</div>
              <div className="text-xs text-slate-500 mt-1">Sous-total <span className="font-medium">{(price * qty).toFixed(2)} DH</span></div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
