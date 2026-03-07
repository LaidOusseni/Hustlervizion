import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Tv } from 'lucide-react'; // Tv for TikTok equivalent

const posts = [
  { id: 1, src: '/assets/zily 1.jpeg' },
  { id: 2, src: '/assets/Joe 1.jpeg' },
  { id: 3, src: '/assets/Zily 2.jpeg' },
  { id: 4, src: '/assets/hustler vizion.jpeg' },
  { id: 5, src: '/assets/Design sans titre (1).png' },
  { id: 6, src: '/assets/Design_sans_titre__1_-removebg-preview.png' }
];

const SocialProof = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: '#050505' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Follow <span style={{ color: 'var(--color-primary)' }}>Hustler Vizion</span>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
              <Instagram className="hover-icon" /> <span style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Instagram</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
              <Tv className="hover-icon" /> <span style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>TikTok</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
              <Youtube className="hover-icon" /> <span style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>YouTube</span>
            </a>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              style={{
                aspectRatio: '1/1',
                backgroundColor: '#111',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <img src={post.src} alt="Social post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(139,0,0,0.5)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              >
                <Instagram color="#fff" size={32} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
