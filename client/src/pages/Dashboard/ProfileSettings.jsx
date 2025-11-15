import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import useAuth from '../../hooks/useAuth.js';

const ProfileSettings = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', bio: user?.bio || '' });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <DashboardLayout>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">Profile Settings</h2>
        <p className="text-sm text-slate-500">Update your personal details (admin updates stored server-side).</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Name</label>
            <input
              type="text"
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input type="email" className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.email} disabled />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Bio</label>
            <textarea
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              rows={4}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>
          <button type="submit" className="rounded bg-policing-blue px-4 py-2 font-semibold text-white">
            Save Preferences
          </button>
          {saved && <p className="text-sm text-emerald-600">Preferences saved locally.</p>}
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProfileSettings;
