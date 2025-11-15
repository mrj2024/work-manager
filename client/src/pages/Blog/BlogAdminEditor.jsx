import { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import RichTextEditor from '../../components/RichTextEditor.jsx';
import api from '../../utils/api.js';

const baseForm = { title: '', coverImage: '', author: '', body: '<p></p>', published: false, draft: true };

const BlogAdminEditor = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(baseForm);
  const [editingId, setEditingId] = useState(null);

  const loadPosts = async () => {
    const { data } = await api.get('/admin/blog');
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/admin/blog/${editingId}`, form);
    } else {
      await api.post('/admin/blog', form);
    }
    setForm(baseForm);
    setEditingId(null);
    loadPosts();
  };

  const editPost = (post) => {
    setForm({ ...post });
    setEditingId(post._id);
  };

  const removePost = async (id) => {
    await api.delete(`/admin/blog/${id}`);
    loadPosts();
  };

  return (
    <DashboardLayout>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">{editingId ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full rounded border border-slate-300 px-3 py-2"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Cover image URL"
              className="w-full rounded border border-slate-300 px-3 py-2"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              className="w-full rounded border border-slate-300 px-3 py-2"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
            <RichTextEditor value={form.body} onChange={(body) => setForm({ ...form, body })} />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked, draft: !e.target.checked })}
                />
                Published
              </label>
              <button type="submit" className="rounded bg-policing-blue px-4 py-2 text-sm font-semibold text-white">
                {editingId ? 'Update' : 'Publish'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(baseForm);
                  }}
                  className="text-sm text-slate-500"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">All Posts</h2>
          <div className="mt-4 space-y-4">
            {posts.map((post) => (
              <div key={post._id} className="rounded border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">{post.title}</h3>
                    <p className="text-xs text-slate-500">
                      {post.published ? 'Published' : 'Draft'} • {new Date(post.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <button onClick={() => editPost(post)} className="text-policing-blue">
                      Edit
                    </button>
                    <button onClick={() => removePost(post._id)} className="text-rose-500">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {!posts.length && <p className="text-sm text-slate-500">No posts available.</p>}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default BlogAdminEditor;
