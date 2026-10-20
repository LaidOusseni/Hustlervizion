import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#home',      label: 'Accueil' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#services',  label: 'Services' },
  { href: '#about',     label: 'À propos' },
  { href: '#contact',   label: 'Contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Track active section
      const sections = ['home', 'portfolio', 'services', 'about', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: scrolled ? '1rem 5%' : '1.8rem 5%',
          background: scrolled ? 'rgba(8, 8, 8, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(243,240,234,0.05)' : 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: '700',
            letterSpacing: '3px',
            color: 'var(--color-primary)',
            flexShrink: 0,
          }}
          aria-label="Hustler Vision — Accueil"
        >
          HV.
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="hidden md:flex">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              style={{
                fontSize: '0.72rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: '500',
                color: activeSection === link.href.slice(1)
                  ? 'var(--color-text)'
                  : 'var(--color-text-muted)',
                transition: 'color 0.3s ease',
                position: 'relative',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.currentTarget.style.color = activeSection === link.href.slice(1) ? 'var(--color-text)' : 'var(--color-text-muted)'}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.div
                  layoutId="nav-active"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0, right: 0,
                    height: '1px',
                    background: 'var(--color-primary)',
                  }}
                />
              )}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="btn-primary"
            style={{ padding: '10px 24px', fontSize: '0.7rem' }}
          >
            Démarrer un projet
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          style={{ color: 'var(--color-text)', padding: '0.5rem', zIndex: 201 }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(8,8,8,0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 150,
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        style={{ zIndex: 200 }}
        aria-hidden={!menuOpen}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : 20 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: '600',
                color: activeSection === link.href.slice(1) ? 'var(--color-primary)' : 'var(--color-text)',
                padding: '0.6rem 0',
                borderBottom: '1px solid rgba(243,240,234,0.05)',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="btn-primary"
            style={{ display: 'block', textAlign: 'center' }}
          >
            Démarrer un projet
          </a>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '1.5rem', letterSpacing: '1px' }}>
            HUSTLER VISION
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) { .hidden { display: none !important; } }
        .md\\:flex { }
        @media (max-width: 767px) { .md\\:hidden { } }
        @media (min-width: 768px) { .md\\:hidden { display: none !important; } }
      `}</style>
    </>
  );
};

export default Navigation;
