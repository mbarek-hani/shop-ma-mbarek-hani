export default function Orders() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Commandes (simulées)</h2>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-lg shadow-sm p-6 overflow-x-auto">
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
