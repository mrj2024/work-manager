const StatCard = ({ label, value, icon }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      {icon}
    </div>
    <p className="mt-4 text-3xl font-semibold text-policing-blue">{value}</p>
  </div>
);

export default StatCard;
