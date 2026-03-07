import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        padding: scrolled ? '1rem 5%' : '2rem 5%',
        background: scrolled ? 'rgba(5, 5, 5, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Left Links */}
      <div style={{ display: 'flex', gap: '2rem', display: window.innerWidth < 768 ? 'none' : 'flex' }}>
        <a href="#home" style={{ fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Home</a>
        <a href="#portfolio" style={{ fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Portfolio</a>
      </div>

      {/* Centered Logo Text */}
      <a href="#home" style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: '1.8rem', 
        fontWeight: 'bold', 
        letterSpacing: '2px',
        color: 'var(--color-primary)',
        margin: window.innerWidth < 768 ? '0 auto' : '0'
      }}>
        HV.
      </a>

      {/* Right Links */}
      <div style={{ display: 'flex', gap: '2rem', display: window.innerWidth < 768 ? 'none' : 'flex' }}>
        <a href="#services" style={{ fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Services</a>
        <a href="#about" style={{ fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>About</a>
        <a href="#contact" style={{ fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Contact</a>
      </div>
    </motion.nav>
  );
};

export default Navigation;
