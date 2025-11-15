import BlogPost from '../models/BlogPost.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sanitizeRichText } from '../utils/sanitize.js';

export const listPosts = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const query = { published: true };
  if (search) {
    query.$text = { $search: search };
  }
  const posts = await BlogPost.find(query).sort({ createdAt: -1 });
  res.json(posts);
});

export const listAllPosts = asyncHandler(async (req, res) => {
  const posts = await BlogPost.find().sort({ createdAt: -1 });
  res.json(posts);
});

export const getPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post || (!post.published && req.user?.role !== 'admin')) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});

export const createPost = asyncHandler(async (req, res) => {
  const body = sanitizeRichText(req.body.body);
  const post = await BlogPost.create({
    title: req.body.title,
    coverImage: req.body.coverImage,
    author: req.body.author || 'Admin',
    body,
    published: req.body.published ?? false,
    draft: req.body.draft ?? true,
    tags: req.body.tags || []
  });
  res.status(201).json(post);
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  post.title = req.body.title ?? post.title;
  post.coverImage = req.body.coverImage ?? post.coverImage;
  post.author = req.body.author ?? post.author;
  post.body = req.body.body ? sanitizeRichText(req.body.body) : post.body;
  post.published = req.body.published ?? post.published;
  post.draft = req.body.draft ?? post.draft;
  post.tags = req.body.tags ?? post.tags;
  await post.save();
  res.json(post);
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  await post.deleteOne();
  res.json({ message: 'Post deleted' });
});
