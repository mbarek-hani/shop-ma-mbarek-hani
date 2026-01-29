import { Link } from "react-router-dom";
import { Button } from "@/components";
import { ShoppingCart } from "lucide-react";

function Cart() {
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

export default Cart;