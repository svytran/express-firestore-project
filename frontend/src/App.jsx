import React, { useEffect, useState } from 'react';
import { getPosts, createPost, updatePost, deletePost } from './api';

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [editingId, setEditingId] = useState(null);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await getPosts();
    setPosts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updatePost(editingId, form);
      setEditingId(null);
    } else {
      await createPost(form);
    }
    setForm({ name: '', message: '' });
    fetchPosts();
  };

  const handleEdit = (post) => {
    setForm({ name: post.name, message: post.message });
    setEditingId(post.id);
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    fetchPosts();
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Simple Message Board</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Post'}</button>
        {editingId && <button onClick={() => { setEditingId(null); setForm({ name: '', message: '' }); }}>Cancel</button>}
      </form>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <b>{post.name}:</b> {post.message}
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;