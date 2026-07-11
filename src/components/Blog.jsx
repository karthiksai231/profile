import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMedium } from 'react-icons/fa';
import '../styles/Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kartheeksaip');
        const data = await res.json();
        const items = data.items.slice(0, 3); // Get top 3 posts
        
        // Extract better thumbnails if possible or use default
        const processedPosts = items.map(post => {
           // Basic regex to find first image in content if thumbnail is missing
           const imgMatch = post.description.match(/<img[^>]+src="([^">]+)"/);
           const thumbnail = post.thumbnail || (imgMatch ? imgMatch[1] : 'https://via.placeholder.com/400x250?text=Medium+Article');
           
           // Clean up description
           const cleanDesc = post.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';
           
           return { ...post, thumbnail, cleanDesc };
        });

        setPosts(processedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Medium posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return null; // Don't show section if loading or empty

  return (
    <section id="blog" className="section blog">
      <div className="container">
        <h2 className="section-title">Latest Articles</h2>
        <div className="blog-grid">
          {posts.map((post, index) => (
            <motion.a 
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="blog-card"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="blog-image" style={{ backgroundImage: `url(${post.thumbnail})` }}></div>
              <div className="blog-content">
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.cleanDesc}</p>
                <span className="blog-link">Read on Medium <FaMedium /></span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
