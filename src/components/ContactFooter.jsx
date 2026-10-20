import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const PROJECT_TYPES = [
  'Production audiovisuelle',
  'Captation événementielle',
  'Vidéo institutionnelle',
  'Clip musical / Lifestyle',
  'Contenus sportifs',
  'Photographie',
  'Direction artistique & graphisme',
  'Autre',
];

const NAV_LINKS = [
  { href: '#home', label: 'Accueil' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'À propos' },
];

const ContactFooter = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', projectType: '', message: '',
  });
  const [formState, setFormState] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Votre nom est requis.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = 'Adresse e-mail invalide.';
    if (!formData.projectType) e.projectType = 'Veuillez choisir un type de projet.';
    if (!formData.message.trim() || formData.message.length < 20)
      e.message = 'Le message doit comporter au moins 20 caractères.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setFormState('loading');

    /*
     * ╔══════════════════════════════════════════════════════╗
     * ║  ⚠ CONFIGURATION REQUISE : envoi d'e-mail          ║
     * ║                                                      ║
     * ║  Pour activer l'envoi réel, choisir une option :    ║
     * ║  A) Resend (recommandé) : resend.com                ║
     * ║     → Créer un compte, ajouter RESEND_API_KEY       ║
     * ║       dans les variables d'environnement Vercel     ║
     * ║     → Créer /api/contact.js côté serveur            ║
     * ║                                                      ║
     * ║  B) EmailJS (no-backend) : emailjs.com              ║
     * ║     → npm install @emailjs/browser                  ║
     * ║     → Remplacer le setTimeout ci-dessous par        ║
     * ║       emailjs.send(SERVICE_ID, TEMPLATE_ID, data)   ║
     * ╚══════════════════════════════════════════════════════╝
     */

    // Simulation d'envoi — à remplacer par l'intégration Resend ou EmailJS
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      setFormState('success');
      setFormData({ name: '', email: '', projectType: '', message: '' });
    } catch {
      setFormState('error');
    }
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '1rem 1.2rem',
    background: 'rgba(255,255,255,0.03)',
    border: hasError ? '1px solid #ef4444' : '1px solid rgba(243,240,234,0.1)',
    borderRadius: '2px',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-content)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.3s ease, background 0.3s ease',
    width: '100%',
  });

  return (
    <footer id="contact" style={{ background: '#000', borderTop: '1px solid rgba(243,240,234,0.05)' }}>

      {/* Section Contact */}
      <div className="container section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
            <div style={{ width: '2rem', height: '1px', background: 'var(--color-primary)' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: '500' }}>
              Parlons de votre projet
            </span>
            <div style={{ width: '2rem', height: '1px', background: 'var(--color-primary)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
            Donnons vie à<br />
            <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>votre vision.</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Décrivez-nous votre projet. Nous reviendrons vers vous rapidement pour en discuter.
          </p>
        </motion.div>

        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ maxWidth: '680px', margin: '0 auto' }}
        >
          {formState === 'success' ? (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '1.2rem', padding: '4rem 2rem',
              textAlign: 'center',
              border: '1px solid rgba(215,38,56,0.2)',
              borderRadius: '3px',
              background: 'rgba(215,38,56,0.03)',
            }}>
              <CheckCircle size={48} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem' }}>Message envoyé !</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>
                Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
              </p>
              <button
                className="btn-outline"
                onClick={() => setFormState('idle')}
                style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Nom + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                    Nom *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle(errors.name)}
                    onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.background = 'rgba(215,38,56,0.03)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(243,240,234,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                  />
                  {errors.name && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.4rem' }}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                    E-mail *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle(errors.email)}
                    onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.background = 'rgba(215,38,56,0.03)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(243,240,234,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                  />
                  {errors.email && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.4rem' }}>{errors.email}</p>}
                </div>
              </div>

              {/* Type de projet */}
              <div>
                <label htmlFor="projectType" style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                  Type de projet *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  style={{
                    ...inputStyle(errors.projectType),
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.background = 'rgba(215,38,56,0.03)'; }}
                  onBlur={e => { e.target.style.borderColor = errors.projectType ? '#ef4444' : 'rgba(243,240,234,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                >
                  <option value="" disabled style={{ background: '#111' }}>Choisir un type de projet…</option>
                  {PROJECT_TYPES.map(type => (
                    <option key={type} value={type} style={{ background: '#111' }}>{type}</option>
                  ))}
                </select>
                {errors.projectType && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.4rem' }}>{errors.projectType}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                  Votre projet *
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Décrivez votre projet, vos besoins, votre calendrier, votre budget approximatif…"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  style={{ ...inputStyle(errors.message), resize: 'vertical', minHeight: '140px' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.background = 'rgba(215,38,56,0.03)'; }}
                  onBlur={e => { e.target.style.borderColor = errors.message ? '#ef4444' : 'rgba(243,240,234,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                />
                {errors.message && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.4rem' }}>{errors.message}</p>}
              </div>

              {/* Erreur serveur */}
              {formState === 'error' && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.8rem 1rem',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: '2px',
                  color: '#ef4444',
                  fontSize: '0.85rem',
                }}>
                  <AlertCircle size={16} />
                  Une erreur est survenue. Réessayez ou contactez-nous directement par e-mail.
                </div>
              )}

              {/* Note service email */}
              <p style={{ color: 'rgba(243,240,234,0.25)', fontSize: '0.7rem', marginTop: '-0.3rem' }}>
                ⚠ L'envoi automatique nécessite une configuration (Resend ou EmailJS). Voir la documentation dans le code.
              </p>

              {/* Submit */}
              <button
                type="submit"
                className="btn-primary"
                disabled={formState === 'loading'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.6rem',
                  minWidth: '220px',
                  alignSelf: 'flex-start',
                  opacity: formState === 'loading' ? 0.7 : 1,
                  cursor: formState === 'loading' ? 'not-allowed' : 'pointer',
                }}
              >
                {formState === 'loading' ? (
                  <>
                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Coordonnées */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2.5rem',
            marginTop: '5rem',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="mailto:contact@hustlervizion.com"
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.85rem', transition: 'color 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
          >
            <Mail size={18} style={{ color: 'var(--color-primary)' }} />
            contact@hustlervizion.com
          </a>
          <a
            href="https://www.instagram.com/hustlervizion"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.85rem', transition: 'color 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
          >
            <Instagram size={18} style={{ color: 'var(--color-primary)' }} />
            @hustlervizion
          </a>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div style={{
        borderTop: '1px solid rgba(243,240,234,0.05)',
        padding: '2rem 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <a
          href="#home"
          style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '700', letterSpacing: '3px', color: 'var(--color-primary)' }}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          HV.
        </a>

        <nav aria-label="Footer navigation" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{ fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-text-muted)', transition: 'color 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} Hustler Vision. Tous droits réservés.
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </footer>
  );
};

export default ContactFooter;
