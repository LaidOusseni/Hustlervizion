import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const showcaseItems = [
  { id: 1, src: '/assets/show 2.mp4', title: 'Live Performance', type: 'video' },
  { id: 2, src: '/assets/zily 1.jpeg', title: 'Portraits', type: 'image' },
  { id: 3, src: '/assets/Infinity yacht.mp4', title: 'Yacht Experience', type: 'video' },
  { id: 4, src: '/assets/hustler vizion.jpeg', title: 'Behind The Scenes', type: 'image' },
];

const VisualShowcase = () => {
  const scrollRef = useRef(null);

  const scrollAction = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 1.5 : clientWidth / 1.5;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section style={{ position: 'relative', backgroundColor: '#000', padding: '6rem 0', overflow: 'hidden', borderTop: '2px solid rgba(139,0,0,0.5)', borderBottom: '2px solid rgba(139,0,0,0.5)' }}>
      <div className="container" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Visual <span style={{ color: 'var(--color-primary)' }}>Showcase</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '400px' }}>
            A cinematic journey through our lens. Use the arrows or swipe to explore.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => scrollAction('left')} className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', padding: 0, borderRadius: '50%', border: '1px solid #333' }}>
            <ChevronLeft size={24} color="#fff" />
          </button>
          <button onClick={() => scrollAction('right')} className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', padding: 0, borderRadius: '50%', border: '1px solid #333' }}>
            <ChevronRight size={24} color="#fff" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef} 
        style={{ 
          display: 'flex', 
          gap: '2rem', 
          overflowX: 'auto', 
          padding: '0 5% 2rem 5%', 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none' 
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {showcaseItems.map((item, i) => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            style={{ 
              width: '85vw', 
              maxWidth: '600px',
              height: '60vh', 
              maxHeight: '500px',
              flexShrink: 0, 
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 0 30px rgba(139,0,0,0.2)'
            }}
          >
            {item.type === 'video' ? (
              <video src={item.src} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '4rem 2rem 2rem 2rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
              color: '#fff',
            }}>
              <h3 style={{ fontSize: '1.8rem', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VisualShowcase;
