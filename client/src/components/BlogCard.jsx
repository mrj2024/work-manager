import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const BlogCard = ({ post }) => (
  <article className="rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    {post.coverImage && <img src={post.coverImage} alt={post.title} className="h-40 w-full rounded-t-xl object-cover" />}
    <div className="p-5">
      <p className="text-xs uppercase tracking-wide text-policing-blue">{dayjs(post.createdAt).format('DD MMM YYYY')}</p>
      <h3 className="mt-2 text-lg font-semibold text-slate-800">{post.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: post.body.slice(0, 160) }} />
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>By {post.author}</span>
        <Link to={`/blog/${post._id}`} className="font-semibold text-policing-blue">
          Read
        </Link>
      </div>
    </div>
  </article>
);

export default BlogCard;
