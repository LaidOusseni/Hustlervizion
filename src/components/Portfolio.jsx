import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const portfolioItems = [
  { id: 1, title: 'Neon Nights', category: 'Music Video', type: 'video', src: '/assets/Show 1.mp4', thumb: '/assets/zily 1.jpeg' },
  { id: 2, title: 'Urban Elegance', category: 'Brand Content', type: 'image', src: '/assets/Joe 1.jpeg', thumb: '/assets/Joe 1.jpeg' },
  { id: 3, title: 'The Grand Event', category: 'Event Coverage', type: 'video', src: '/assets/Wedding 1.mp4', thumb: '/assets/Zily 2.jpeg' },
  { id: 4, title: 'Ocean Vibe', category: 'Cinematic Clip', type: 'video', src: '/assets/Infinity yacht.mp4', thumb: '/assets/Design sans titre (1).png' },
  { id: 5, title: 'Summer Fest', category: 'Event Coverage', type: 'video', src: '/assets/show 2.mp4', thumb: '/assets/hustler vizion.jpeg' },
  { id: 6, title: 'Studio Session', category: 'Music Video', type: 'image', src: '/assets/Zily 2.jpeg', thumb: '/assets/Zily 2.jpeg' },
];

const PortfolioItem = ({ item }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(e => console.log(e));
    }
  };

  const handleMouseLeave = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="portfolio-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        aspectRatio: '16/9',
        backgroundColor: '#111',
        cursor: 'pointer'
      }}
    >
      {item.type === 'video' ? (
        <>
          <img src={item.thumb} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
          <video 
            ref={videoRef}
            src={item.src} 
            muted 
            loop 
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 2, opacity: 0, transition: 'opacity 0.3s' }}
            onPlay={(e) => { e.target.style.opacity = 1; e.target.previousSibling.style.opacity = 0; }}
            onPause={(e) => { e.target.style.opacity = 0; e.target.previousSibling.style.opacity = 1; }}
          />
        </>
      ) : (
        <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
      
      <div className="portfolio-overlay" style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1.5rem',
        opacity: 0,
        transition: 'opacity 0.3s ease'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.2rem', color: '#fff' }}>{item.title}</h3>
        <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.category}</p>
      </div>

      <style>{`
        .portfolio-item:hover .portfolio-overlay {
          opacity: 1 !important;
        }
        .portfolio-item img {
          transition: transform 0.5s ease;
        }
        .portfolio-item:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="section-padding container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our <span style={{ color: 'var(--color-primary)' }}>Work</span></h2>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Explore our latest cinematic projects, music videos and brand campaigns.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {portfolioItems.map(item => (
          <PortfolioItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
