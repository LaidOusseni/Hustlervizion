import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Layers, Globe } from 'lucide-react';

const pillars = [
  {
    icon: Eye,
    title: 'Une vision cinématographique',
    desc: 'Chaque image est pensée comme un plan de cinéma. Nous ne filmons pas des événements — nous construisons des récits visuels.',
  },
  {
    icon: Layers,
    title: 'Une approche multidisciplinaire',
    desc: 'Production audiovisuelle, photographie, direction artistique, graphisme. Hustler Vision maîtrise l\'ensemble de la chaîne créative.',
  },
  {
    icon: Globe,
    title: 'Ancré à Mayotte, ouvert au monde',
    desc: 'Né à Mayotte, nourri par nos cultures et notre territoire, rayonnant vers l\'international. Notre identité est notre force.',
  },
];

const About = () => {
  return (
    <section id="about" className="section-padding" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        {/* Layout principal — éditorial 2 colonnes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(3rem, 8vw, 8rem)',
          alignItems: 'center',
          marginBottom: '7rem',
        }}>
          {/* Colonne texte */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '2rem', height: '1px', background: 'var(--color-primary)' }} />
              <span style={{ fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: '500' }}>
                Notre studio
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1.05,
              marginBottom: '2rem',
              color: 'var(--color-text)',
            }}>
              Hustler Vision,<br />
              <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>l'image comme<br />langage.</span>
            </h2>

            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1rem' }}>
              Hustler Vision est un studio de production audiovisuelle basé à Mayotte. Nos caméras saisissent ce que les mots ne peuvent pas dire : l'émotion d'une finale sportive, la beauté d'un moment culturel, la puissance d'une marque qui se déploie.
            </p>

            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
              Nous croyons que chaque histoire mérite d'être racontée avec ambition. Que le cadre d'un clan de foot mérite autant d'attention artistique qu'un clip international. Que la beauté de Mayotte mérite d'être montrée au monde.
            </p>

            <div style={{
              marginTop: '2.5rem',
              padding: '1.5rem',
              borderLeft: '2px solid var(--color-primary)',
              background: 'rgba(215,38,56,0.04)',
            }}>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontSize: '1.2rem',
                color: 'var(--color-text)',
                lineHeight: 1.5,
              }}>
                « Transformer la vision en réalité cinématographique, c'est notre raison d'être. »
              </p>
            </div>
          </motion.div>

          {/* Colonne visuelle */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            {/* Image principale */}
            <div style={{
              aspectRatio: '4/5',
              overflow: 'hidden',
              borderRadius: '3px',
              position: 'relative',
            }}>
              <img
                src="/assets/Gemini_Generated_Image_q9o9qmq9o9qmq9o9.png"
                alt="Hustler Vision — Studio"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.05) brightness(0.9)' }}
                onError={(e) => {
                  e.currentTarget.src = '/assets/hustler vizion.jpeg';
                }}
              />
              {/* Overlay dégradé */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(8,8,8,0) 50%, rgba(8,8,8,0.6) 100%)',
              }} />
            </div>

            {/* Badge flottant */}
            <div style={{
              position: 'absolute',
              bottom: '-1.5rem',
              right: '-1.5rem',
              background: 'var(--color-primary)',
              padding: '1.5rem',
              minWidth: '160px',
              textAlign: 'center',
              borderRadius: '2px',
              boxShadow: '0 20px 60px rgba(215,38,56,0.3)',
            }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '700', color: '#fff', lineHeight: 1 }}>HV.</p>
              <p style={{ fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginTop: '0.4rem' }}>Hustler Vision</p>
            </div>
          </motion.div>
        </div>

        {/* 3 piliers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '3rem',
            paddingTop: '4rem',
            borderTop: '1px solid rgba(243,240,234,0.06)',
          }}
        >
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <Icon size={28} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '0.8rem' }}>
                  {p.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
