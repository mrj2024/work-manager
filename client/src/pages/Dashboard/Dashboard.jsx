import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import StatCard from '../../components/StatCard.jsx';
import api from '../../utils/api.js';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [{ data: docs }, { data: blog }] = await Promise.all([api.get('/documents'), api.get('/blog')]);
        setDocuments(docs);
        setPosts(blog.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <DashboardLayout>Loading...</DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard label="Documents" value={documents.length} />
          <StatCard label="Published Blogs" value={posts.length} />
          <StatCard label="Tools Available" value="5" />
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Recent Documents</h3>
            <Link to="/documents" className="text-sm font-semibold text-policing-blue">
              View all
            </Link>
          </div>
          <div className="mt-4 divide-y divide-slate-100">
            {documents.slice(0, 5).map((doc) => (
              <div key={doc._id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-slate-800">{doc.title}</p>
                  <p className="text-xs text-slate-500">{new Date(doc.updatedAt).toLocaleString()}</p>
                </div>
                <Link to={`/documents/${doc._id}`} className="text-sm text-policing-blue">
                  Edit
                </Link>
              </div>
            ))}
            {!documents.length && <p className="py-4 text-sm text-slate-500">No documents yet. Create your first one.</p>}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Latest Blog Posts</h3>
            <Link to="/blog" className="text-sm font-semibold text-policing-blue">
              Explore blog
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            {posts.map((post) => (
              <article key={post._id}>
                <h4 className="text-base font-semibold text-slate-800">{post.title}</h4>
                <p className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: post.body.slice(0, 120) }} />
              </article>
            ))}
            {!posts.length && <p className="text-sm text-slate-500">No blog posts have been published yet.</p>}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
