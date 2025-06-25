import React, { useEffect, useState } from 'react';
import { getPostsApi, createPostApi } from '../api';

function PostPage({ user }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPostsApi();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await createPostApi(content);
      setContent('');
      fetchPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">Community Posts</h1>
      {user && (
        <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-2">
          <textarea
            className="border rounded p-2 w-full"
            maxLength={280}
            rows={3}
            placeholder="What's on your mind?"
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={submitting}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
            disabled={submitting || !content.trim()}
          >
            {submitting ? 'Posting...' : 'Post'}
          </button>
          {error && <div className="text-red-600">{error}</div>}
        </form>
      )}
      {!user && (
        <div className="mb-8 text-center text-gray-500">Login to post a message.</div>
      )}
      {loading ? (
        <div className="text-center text-gray-500">Loading posts...</div>
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.id} className="bg-white rounded-lg shadow p-4">
              <div className="font-semibold text-blue-900">{post.username || 'User'} <span className="text-xs text-gray-400">{new Date(post.created_at).toLocaleString()}</span></div>
              <div className="text-gray-800 mt-1">{post.content}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostPage;