import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, DollarSign, Plus, Share2 } from 'lucide-react';

export default function CommunityView({ selectedVehicle, showAddForm, setShowAddForm }) {
  const [activeForum, setActiveForum] = useState(selectedVehicle.id === 'splendor' ? 'Splendor Owners' : 
                                                selectedVehicle.id === 'activa' ? 'Activa Maintenance' : 
                                                selectedVehicle.id === 'pulsar' ? 'Pulsar DIY' : 'Enthusiast Zone');
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Rajesh Kumar",
      avatar: "RK",
      vehicle: "Hero Splendor Plus",
      time: "2h ago",
      title: "Cleaned carburetor jets in 30 mins!",
      content: "Bike was stuttering at mid-RPM range. Unbolted intake manifold, opened carburetor bowl, and blew carbon out of the main/pilot jets. Pickup is back to perfect. Cleaned at home for ₹0 compared to ₹250 at local shop.",
      likes: 18,
      costSaved: "₹250",
      commentsCount: 3
    },
    {
      id: 2,
      author: "Amit Sharma",
      avatar: "AS",
      vehicle: "Honda Activa 6G",
      time: "1d ago",
      title: "Viscous paper air filter change tip",
      content: "Reminder that Honda Activa 6G uses a viscous oil coated filter. Do not clean with compressed air, it ruins it! Just swap it, it is only ₹250 and took me 5 minutes using a single Philips screwdriver.",
      likes: 24,
      costSaved: "₹100",
      commentsCount: 6
    }
  ]);

  // Input states for writing a new post
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSavedCost, setNewSavedCost] = useState('');

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost = {
      id: Date.now(),
      author: "You (DIY Mechanic)",
      avatar: "ME",
      vehicle: selectedVehicle.name,
      time: "Just now",
      title: newTitle,
      content: newContent,
      likes: 1,
      costSaved: newSavedCost ? `₹${newSavedCost}` : "₹0",
      commentsCount: 0
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setNewSavedCost('');
    setShowAddForm(false);
  };

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-28 text-white space-y-4">
      
      {/* Forum selection header */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
        <div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Community Forum</span>
          <h3 className="text-sm font-black text-accent">{activeForum} Forum</h3>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs bg-accent hover:bg-accent-dark text-white px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 shadow-md shadow-accent/20"
        >
          <Plus className="w-3.5 h-3.5" /> Share Tip
        </button>
      </div>

      {/* Post tip form */}
      {showAddForm && (
        <form onSubmit={handleSubmitPost} className="bg-[#1A1A22] border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-2xl">
          <h4 className="text-xs font-bold text-zinc-200">Share Your Repair Tip</h4>
          <input 
            type="text"
            placeholder="Post Title (e.g. Cleared chain rust)..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-steel-dark border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
            required
          />
          <textarea 
            placeholder="Describe what you repaired, the problem, steps, and recommendations..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full bg-steel-dark border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent min-h-[70px]"
            required
          />
          <div className="flex gap-2">
            <input 
              type="number"
              placeholder="Est. Cost Saved (INR)..."
              value={newSavedCost}
              onChange={(e) => setNewSavedCost(e.target.value)}
              className="flex-1 bg-steel-dark border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent"
            />
            <button type="submit" className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-xl text-xs font-extrabold transition-colors">
              Publish Tip
            </button>
          </div>
        </form>
      )}

      {/* Feed list */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-[#1A1A22] border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-lg">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center font-bold text-accent">
                  {post.avatar}
                </div>
                <div>
                  <h5 className="font-bold text-zinc-200">{post.author}</h5>
                  <p className="text-[9px] text-zinc-500">{post.vehicle} • {post.time}</p>
                </div>
              </div>
              
              {post.costSaved !== "₹0" && (
                <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                  <DollarSign className="w-3 h-3" /> Saved {post.costSaved}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h4 className="font-extrabold text-xs text-zinc-100">{post.title}</h4>
              <p className="text-[11px] text-zinc-400 leading-normal">{post.content}</p>
            </div>

            <div className="flex items-center gap-4 text-zinc-500 border-t border-zinc-800/60 pt-3">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1 hover:text-accent transition-colors text-[10px] font-bold"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{post.likes} Likes</span>
              </button>
              
              <div className="flex items-center gap-1 text-[10px] font-bold">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{post.commentsCount} Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
