import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroLanding = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      
      {/* Background Gradient & Particles */}
      <motion.div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, #050505 0%, #1a0000 50%, #050505 100%)',
          zIndex: -2,
          y: y1,
          opacity
        }}
      />
      
      {/* Cinematic Red glow overlay */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vh',
        background: 'radial-gradient(ellipse, rgba(139,0,0,0.15) 0%, rgba(5,5,5,0) 70%)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      {/* Content */}
      <div className="container" style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ 
            fontSize: 'clamp(3rem, 6vw, 6rem)', 
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            color: '#fff',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          We turn vision into<br />
          <span style={{ color: 'var(--color-primary)', fontStyle: 'italic', fontFamily: 'var(--font-heading)' }}>cinematic reality.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontSize: '1.2rem',
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            marginBottom: '3rem',
            letterSpacing: '0.5px'
          }}
        >
          Professional video production for brands, creators and businesses.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a href="#portfolio">
            <button className="btn-primary">View our work</button>
          </a>
          <a href="#contact">
            <button className="btn-outline">Contact us</button>
          </a>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroLanding;
