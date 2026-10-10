import React, { useState } from 'react';
import { DollarSign, MessageSquare, Plus, ThumbsUp } from 'lucide-react';
import './ToolViews.css';

const getForumName = (vehicleId) => ({
  splendor: 'Splendor owners',
  activa: 'Activa maintenance',
  pulsar: 'Pulsar DIY',
}[vehicleId] || 'Enthusiast zone');

const STARTER_POSTS = [
  {
    id: 1,
    author: 'Rajesh Kumar',
    avatar: 'RK',
    vehicle: 'Hero Splendor Plus',
    time: '2h ago',
    title: 'Cleaned carburetor jets in 30 minutes',
    content: 'The bike was stuttering at mid-RPM. I cleaned the main and pilot jets at home and the pickup feels much better. Sharing the careful steps so another owner can compare symptoms.',
    likes: 18,
    costSaved: '₹250',
    commentsCount: 3,
  },
  {
    id: 2,
    author: 'Amit Sharma',
    avatar: 'AS',
    vehicle: 'Honda Activa 6G',
    time: '1d ago',
    title: 'Viscous paper air filter change tip',
    content: 'The Activa filter is viscous and should not be cleaned with compressed air. Mine took five minutes to replace with a Philips screwdriver.',
    likes: 24,
    costSaved: '₹100',
    commentsCount: 6,
  },
];

export default function CommunityView({ selectedVehicle, showAddForm, setShowAddForm }) {
  const [activeForum, setActiveForum] = useState(getForumName(selectedVehicle.id));
  const [posts, setPosts] = useState(STARTER_POSTS);
  const [likedPostIds, setLikedPostIds] = useState(new Set());
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSavedCost, setNewSavedCost] = useState('');

  const handleSubmitPost = (event) => {
    event.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    const newPost = {
      id: Date.now(),
      author: 'You · local demo',
      avatar: 'ME',
      vehicle: selectedVehicle.name,
      time: 'Just now',
      title: newTitle.trim(),
      content: newContent.trim(),
      likes: 0,
      costSaved: newSavedCost ? `₹${newSavedCost}` : '₹0',
      commentsCount: 0,
    };
    setPosts((previous) => [newPost, ...previous]);
    setNewTitle('');
    setNewContent('');
    setNewSavedCost('');
    setShowAddForm(false);
  };

  const handleLike = (id) => {
    setLikedPostIds((previous) => {
      const next = new Set(previous);
      const isLiked = next.has(id);
      if (isLiked) next.delete(id);
      else next.add(id);
      setPosts((currentPosts) => currentPosts.map((post) => (post.id === id ? { ...post, likes: Math.max(0, post.likes + (isLiked ? -1 : 1)) } : post)));
      return next;
    });
  };

  return (
    <main className="tool-view">
      <div className="tool-page">
        <header className="community-hero">
          <div>
            <span className="ui-eyebrow">Community · local demo feed</span>
            <h1 className="ui-title">Practical stories from the garage</h1>
            <p className="ui-muted">Share what you learned while caring for {selectedVehicle.name}. Posts stay in this browser session; no account or backend is connected.</p>
          </div>
          <button type="button" className="ui-btn ui-btn-primary" onClick={() => setShowAddForm(!showAddForm)}><Plus size={16} aria-hidden="true" /> {showAddForm ? 'Close composer' : 'Share a tip'}</button>
        </header>

        <div className="ui-card" style={{ marginBottom: 16 }}>
          <div className="tool-meta" style={{ justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div><span className="ui-label">Browse a local room</span><strong>{activeForum}</strong></div>
            <div className="tool-inline" role="group" aria-label="Community rooms">
              {['splendor', 'activa', 'all'].map((forumId) => {
                const forum = forumId === 'all' ? 'Enthusiast zone' : getForumName(forumId);
                return <button type="button" key={forumId} className={`ui-btn ${activeForum === forum ? 'ui-btn-primary' : ''}`} onClick={() => setActiveForum(forum)}>{forum}</button>;
              })}
            </div>
          </div>
        </div>

        {showAddForm && (
          <form className="ui-card community-compose" onSubmit={handleSubmitPost}>
            <div><span className="ui-eyebrow">Compose a local post</span><h2 className="ui-title" style={{ fontSize: '1.3rem' }}>Share a repair lesson</h2></div>
            <label className="ui-label" htmlFor="community-title">Title<input id="community-title" className="ui-input" type="text" placeholder="What did you learn?" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} required /></label>
            <label className="ui-label" htmlFor="community-content">Story<textarea id="community-content" className="ui-input" placeholder="Describe the symptom, steps, and what you would recommend." value={newContent} onChange={(event) => setNewContent(event.target.value)} required /></label>
            <div className="tool-inline" style={{ alignItems: 'flex-end' }}>
              <label className="ui-label" style={{ flex: 1 }} htmlFor="community-cost">Estimated saving (optional)<input id="community-cost" className="ui-input" type="number" min="0" placeholder="INR" value={newSavedCost} onChange={(event) => setNewSavedCost(event.target.value)} /></label>
              <button type="submit" className="ui-btn ui-btn-primary">Publish locally</button>
            </div>
          </form>
        )}

        <div className="community-feed">
          {posts.map((post) => {
            const liked = likedPostIds.has(post.id);
            return (
              <article key={post.id} className="ui-card community-post">
                <div className="community-post-header">
                  <div className="community-author"><div className="community-avatar" aria-hidden="true">{post.avatar}</div><div><strong>{post.author}</strong><span>{post.vehicle} · {post.time}</span></div></div>
                  {post.costSaved !== '₹0' && <span className="ui-tag ui-tag-success"><DollarSign size={13} aria-hidden="true" /> Saved {post.costSaved}</span>}
                </div>
                <div><h3>{post.title}</h3><p className="community-post-copy">{post.content}</p></div>
                <div className="community-action-row">
                  <button type="button" className={`ui-btn ${liked ? 'ui-btn-primary' : 'ui-btn-quiet'}`} aria-pressed={liked} onClick={() => handleLike(post.id)}><ThumbsUp size={15} aria-hidden="true" /> {post.likes} {post.likes === 1 ? 'like' : 'likes'}</button>
                  <span className="community-comments-note"><MessageSquare size={14} aria-hidden="true" /> {post.commentsCount} comments · replies unavailable in local demo</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
