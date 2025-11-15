const StatusBadge = ({ saved }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        saved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
      }`}
    >
      {saved ? 'Saved' : 'Unsaved changes'}
    </span>
  );
};

export default StatusBadge;
