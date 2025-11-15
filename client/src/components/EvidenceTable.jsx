const EvidenceTable = ({ entries = [] }) => (
  <div className="overflow-auto rounded-lg border border-slate-200 bg-white">
    <table className="min-w-full divide-y divide-slate-200 text-sm">
      <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
        <tr>
          <th className="px-4 py-3">Item</th>
          <th className="px-4 py-3">Time</th>
          <th className="px-4 py-3">Officer</th>
          <th className="px-4 py-3">Location</th>
          <th className="px-4 py-3">Signature</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 text-slate-700">
        {entries.map((entry) => (
          <tr key={entry._id}>
            <td className="px-4 py-3">{entry.itemName}</td>
            <td className="px-4 py-3">{entry.time}</td>
            <td className="px-4 py-3">{entry.officer}</td>
            <td className="px-4 py-3">{entry.location}</td>
            <td className="px-4 py-3">{entry.signature}</td>
          </tr>
        ))}
        {!entries.length && (
          <tr>
            <td colSpan="5" className="px-4 py-5 text-center text-slate-400">
              No entries logged yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default EvidenceTable;
