export default function Orders() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Commandes (simulées)</h2>
      </div>

      {/* desktop */}
      <div className="hidden md:block bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto">
            <thead className="text-left text-slate-500 bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Montant</th>
                <th className="px-4 py-3">Articles</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => {
                const id = 1000 + i;
                const total = ((i + 1) * 23.5).toFixed(2);
                const items = Math.max(1, 1 + i);
                const date = new Date(Date.now() - i * 1000 * 60 * 60 * 24).toLocaleDateString();
                const status = i % 3 === 0 ? "Livré" : i % 3 === 1 ? "En cours" : "Annulé";
                return (
                  <tr key={id} className="border-t border-gray-50 dark:border-slate-800">
                    <td className="px-4 py-3">{id}</td>
                    <td className="px-4 py-3">{total} DH</td>
                    <td className="px-4 py-3">{items}</td>
                    <td className="px-4 py-3">{date}</td>
                    <td className="px-4 py-3">{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* mobile */}
      <div className="md:hidden space-y-3">
        {Array.from({ length: 6 }).map((_, i) => {
          const id = 1000 + i;
          const total = ((i + 1) * 23.5).toFixed(2);
          const items = Math.max(1, 1 + i);
          const date = new Date(Date.now() - i * 1000 * 60 * 60 * 24).toLocaleDateString();
          const status = i % 3 === 0 ? "Livré" : i % 3 === 1 ? "En cours" : "Annulé";
          return (
            <div key={id} className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">Commande #{id}</div>
                  <div className="mt-1 text-sm text-slate-500">{date}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{total} DH</div>
                  <div className="text-sm text-slate-500">{items} articles</div>
                  <div className="mt-2 text-xs">{status}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
