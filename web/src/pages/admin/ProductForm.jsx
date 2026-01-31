import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProductById } from "@/features/products/productsSelectors";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector(selectProductById(id));
  const isEdit = Boolean(id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">{isEdit ? "Modifier le produit" : "Ajouter un produit"}</h2>
        <div />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm p-6 max-w-2xl">
        <p className="text-sm text-slate-500 mb-4">Formulaire {isEdit ? "d'édition" : "de création"} (simulé). Les changements ne sont pas persistés dans cet exercice.</p>

        <label className="block text-sm font-medium mb-1">Nom</label>
        <input className="w-full mb-3 p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-800" defaultValue={product?.name || ""} />

        <label className="block text-sm font-medium mb-1">Prix (€)</label>
        <input className="w-40 mb-3 p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-800" defaultValue={product?.price || ""} />

        <div className="flex gap-2 mt-4">
          <button onClick={() => navigate(-1)} className="px-3 py-2 rounded-md border">Annuler</button>
          <button onClick={() => alert('Simulé — pas de sauvegarde')} className="px-3 py-2 bg-blue-600 text-white rounded-md">{isEdit ? "Enregistrer" : "Créer"}</button>
        </div>
      </div>
    </div>
  );
}
