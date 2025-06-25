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
      setError('Gagal memuat postingan komunitas.');
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
      setError(err.message || 'Gagal membuat postingan.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] py-12 px-4 relative overflow-hidden">
      {/* Futuristic glowing lines */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-blue-500/10 blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-1 h-full bg-fuchsia-500/10 blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-cyan-400/10 blur-2xl animate-pulse" style={{ transform: 'translateY(-50%)' }} />
        <div className="absolute top-1/3 left-0 w-full h-1 bg-purple-400/10 blur-2xl animate-pulse" />
      </div>
      <div className="max-w-2xl mx-auto bg-base-100/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 z-10 border border-fuchsia-700/40 relative">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-primary drop-shadow font-futuristic">
          Komunitas <span className="block text-lg font-normal text-base-content/70">Bagikan pengalaman & diskusi!</span>
        </h1>
        {user ? (
          <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-2">
            <textarea
              className="textarea textarea-bordered w-full bg-[#232142] text-white placeholder:text-violet-300"
              maxLength={280}
              rows={3}
              placeholder="Apa yang ingin kamu bagikan hari ini?"
              value={content}
              onChange={e => setContent(e.target.value)}
              disabled={submitting}
            />
            <button
              type="submit"
              className="btn btn-primary w-full font-semibold font-futuristic shadow-lg transition hover:scale-105"
              disabled={submitting || !content.trim()}
            >
              {submitting ? 'Posting...' : 'Post'}
            </button>
            {error && <div className="text-error text-center">{error}</div>}
          </form>
        ) : (
          <div className="mb-8 text-center text-base-content/60 font-futuristic">
            Login untuk membuat postingan komunitas.
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <ul className="space-y-4">
            {posts.map(post => (
              <li key={post.id} className="bg-gradient-to-br from-blue-900/70 to-fuchsia-900/70 rounded-xl shadow p-4 border border-fuchsia-700/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-primary font-futuristic">{post.username || 'User'}</span>
                  <span className="text-xs text-base-content/50">{new Date(post.created_at).toLocaleString()}</span>
                </div>
                <div className="text-base-content text-blue-100">{post.content}</div>
              </li>
            ))}
            {posts.length === 0 && (
              <li className="text-center text-base-content/60 font-futuristic">Belum ada postingan.</li>
            )}
          </ul>
        )}
      </div>
      <style>{`
        .font-futuristic {
          font-family: 'Orbitron', 'Montserrat', 'Segoe UI', Arial, sans-serif;
          letter-spacing: 2px;
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet" />
    </div>
  );
}

export default PostPage;