import React from 'react';
import { Instagram, Mail } from 'lucide-react';

const ContactFooter = () => {
  return (
    <footer id="contact" style={{ backgroundColor: '#000', borderTop: '1px solid #111' }}>
      <div className="container section-padding" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Let's bring your <span style={{ color: 'var(--color-primary)' }}>vision</span> to life.
        </h2>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', marginBottom: '3rem' }}>
          Ready to create something cinematic? Get in touch with us for your next project.
        </p>

        <form style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }} onSubmit={(e) => e.preventDefault()}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <input 
              type="text" 
              placeholder="Name" 
              style={{ flex: 1, padding: '1rem', background: '#111', border: '1px solid #222', color: '#fff', borderRadius: '4px', outline: 'none' }} 
            />
            <input 
              type="email" 
              placeholder="Email" 
              style={{ flex: 1, padding: '1rem', background: '#111', border: '1px solid #222', color: '#fff', borderRadius: '4px', outline: 'none' }} 
            />
          </div>
          <textarea 
            placeholder="Tell us about your project" 
            rows="5"
            style={{ width: '100%', padding: '1rem', background: '#111', border: '1px solid #222', color: '#fff', borderRadius: '4px', outline: 'none', resize: 'vertical' }} 
          />
          <button type="submit" className="btn-primary" style={{ alignSelf: 'center', minWidth: '200px' }}>
            Send Message
          </button>
        </form>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem' }}>
          <a href="mailto:contact@hustlervizion.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Mail size={20} /> Email Us
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Instagram size={20} /> DM Us
          </a>
        </div>

      </div>

      <div style={{ padding: '2rem 5%', borderTop: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
          HV.
        </div>
        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Hustler Vizion. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
