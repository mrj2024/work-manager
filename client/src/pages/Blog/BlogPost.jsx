import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import api from '../../utils/api.js';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get(`/blog/${id}`);
      setPost(data);
    };
    load();
  }, [id]);

  if (!post) return <DashboardLayout>Loading...</DashboardLayout>;

  return (
    <DashboardLayout>
      <article className="prose max-w-none rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-policing-blue">
          {new Date(post.createdAt).toLocaleDateString()} • {post.author}
        </p>
        <h1>{post.title}</h1>
        {post.coverImage && <img src={post.coverImage} alt={post.title} className="rounded-lg" />}
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>
    </DashboardLayout>
  );
};

export default BlogPost;
