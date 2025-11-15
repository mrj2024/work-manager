import { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import BlogCard from '../../components/BlogCard.jsx';
import api from '../../utils/api.js';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  const loadPosts = async () => {
    const { data } = await api.get('/blog', { params: { search } });
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadPosts();
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Blog</h1>
          <p className="text-sm text-slate-500">Insights curated by policing academics.</p>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts"
            className="rounded border border-slate-300 px-3 py-2 text-sm"
          />
          <button type="submit" className="rounded bg-policing-blue px-4 py-2 text-sm font-semibold text-white">
            Search
          </button>
        </form>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
        {!posts.length && <p className="text-sm text-slate-500">No posts.</p>}
      </div>
    </DashboardLayout>
  );
};

export default BlogList;
