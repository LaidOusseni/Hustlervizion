import React from 'react';
import { motion } from 'framer-motion';
import { Video, Film, Camera, Music, Trophy, Palette, Building2 } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: Video,
    title: 'Production audiovisuelle',
    desc: 'Clips musicaux, clips lifestyle, teasers et contenus cinématographiques. Direction artistique, tournage et montage au plus haut niveau.',
    keyword: 'Clips · Lifestyle · Montage',
  },
  {
    id: 2,
    icon: Camera,
    title: 'Captation événementielle',
    desc: 'Élections, cérémonies, galas et événements culturels. Nous captons chaque moment fort avec précision et esthétique.',
    keyword: 'Événements · Reportages · Multi-caméras',
  },
  {
    id: 3,
    icon: Building2,
    title: 'Vidéo institutionnelle',
    desc: 'Films institutionnels, inaugurations et reportages d\'entreprise. Un regard professionnel pour valoriser votre image de marque.',
    keyword: 'Institutions · Entreprises · Marques',
  },
  {
    id: 4,
    icon: Music,
    title: 'Production musicale & lifestyle',
    desc: 'Clips d\'artistes, vidéos de mode et productions lifestyle. Nous créons des univers visuels uniques autour de chaque talent.',
    keyword: 'Artistes · Mode · Culture',
  },
  {
    id: 5,
    icon: Trophy,
    title: 'Contenus sportifs',
    desc: 'Couverture de compétitions, lancements de saison et portraits d\'athlètes. L\'énergie du sport capturée avec intensité.',
    keyword: 'Sport · Compétitions · Athlètes',
  },
  {
    id: 6,
    icon: Film,
    title: 'Photographie',
    desc: 'Portraits artistiques, photographies événementielles et visuels pour les réseaux sociaux. Un œil affûté pour chaque image.',
    keyword: 'Portraits · Événements · Éditorial',
  },
  {
    id: 7,
    icon: Palette,
    title: 'Direction artistique & graphisme',
    desc: 'Identités visuelles, affiches, covers d\'artistes et supports de communication. Un design fort au service de votre image.',
    keyword: 'Identité · Affiches · Design',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Services = () => {
  return (
    <section id="services" className="section-padding" style={{ background: 'var(--color-bg-light)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
            <div style={{ width: '2rem', height: '1px', background: 'var(--color-primary)' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: '500' }}>
              Ce que nous faisons
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: 'var(--font-heading)', maxWidth: '600px' }}>
              Des prestations<br />
              <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>sur mesure.</span>
            </h2>
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ flexShrink: 0 }}
            >
              Démarrer un projet
            </a>
          </div>
        </motion.div>

        {/* Grille de services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '1px',
            background: 'rgba(243,240,234,0.05)',
            border: '1px solid rgba(243,240,234,0.05)',
          }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                style={{
                  background: 'var(--color-bg-light)',
                  padding: '2.5rem 2rem',
                  transition: 'background 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(215,38,56,0.04)';
                  e.currentTarget.querySelector('.service-icon').style.color = 'var(--color-primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--color-bg-light)';
                  e.currentTarget.querySelector('.service-icon').style.color = 'rgba(243,240,234,0.15)';
                }}
              >
                <Icon
                  className="service-icon"
                  size={36}
                  style={{ color: 'rgba(243,240,234,0.15)', marginBottom: '1.2rem', transition: 'color 0.3s ease' }}
                />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '0.8rem', color: 'var(--color-text)' }}>
                  {service.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: '1.2rem' }}>
                  {service.desc}
                </p>
                <p style={{ fontSize: '0.65rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.7 }}>
                  {service.keyword}
                </p>

                {/* Ligne d'accentuation au survol */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0,
                  width: '0%',
                  height: '2px',
                  background: 'var(--color-primary)',
                  transition: 'width 0.4s ease',
                }}
                  className="service-line"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Note de bas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            textAlign: 'center',
            marginTop: '4rem',
            paddingTop: '3rem',
            borderTop: '1px solid rgba(243,240,234,0.05)',
          }}
        >
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Chaque projet est unique. Parlons du vôtre.
          </p>
          <a
            href="#contact"
            className="btn-outline"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Nous contacter
          </a>
        </motion.div>
      </div>

      <style>{`
        .service-card:hover .service-line {
          width: 100% !important;
        }
      `}</style>
    </section>
  );
};

export default Services;
