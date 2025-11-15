import { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import api from '../../utils/api.js';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [documents, setDocuments] = useState([]);

  const loadData = async () => {
    const [{ data: users }, { data: docs }] = await Promise.all([api.get('/admin/users/pending'), api.get('/admin/documents')]);
    setPendingUsers(users);
    setDocuments(docs);
  };

  useEffect(() => {
    loadData();
  }, []);

  const approve = async (id) => {
    await api.put(`/admin/users/${id}/approve`);
    loadData();
  };

  const reject = async (id) => {
    await api.put(`/admin/users/${id}/reject`);
    loadData();
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-semibold text-slate-900">Admin Panel</h1>
          <p className="text-sm text-slate-500">Approve accounts, oversee documents, and manage blog posts.</p>
          <Link to="/admin/blog" className="mt-3 inline-block rounded bg-policing-blue px-4 py-2 text-sm font-semibold text-white">
            Manage Blog
          </Link>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">Pending Users</h2>
          <div className="mt-4 space-y-4">
            {pendingUsers.map((user) => (
              <div key={user._id} className="flex items-center justify-between rounded border border-slate-200 p-4">
                <div>
                  <p className="font-semibold text-slate-800">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => approve(user._id)} className="rounded bg-emerald-100 px-3 py-1 text-emerald-700">
                    Approve
                  </button>
                  <button onClick={() => reject(user._id)} className="rounded bg-rose-100 px-3 py-1 text-rose-600">
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {!pendingUsers.length && <p className="text-sm text-slate-500">No pending users.</p>}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">Documents Overview</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Owner</th>
                  <th className="px-4 py-2">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc._id}>
                    <td className="px-4 py-2">{doc.title}</td>
                    <td className="px-4 py-2">{doc.user?.name}</td>
                    <td className="px-4 py-2">{new Date(doc.updatedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {!documents.length && (
                  <tr>
                    <td colSpan="3" className="px-4 py-4 text-center text-slate-500">
                      No documents yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
