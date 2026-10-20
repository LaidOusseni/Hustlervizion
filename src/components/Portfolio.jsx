import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Image as ImageIcon } from 'lucide-react';
import { PROJECTS, CATEGORIES, getProjectsByCategory } from '../data/projects';
import DriveVideoPlayer from './ui/DriveVideoPlayer';

// ── Carte de projet ───────────────────────────────────────────────
const ProjectCard = ({ project, onOpen, size }) => {
  const hasVideo = !!(project.driveVideoId || project.localVideoSrc);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="portfolio-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '3px',
        background: '#0f0f0f',
        cursor: 'pointer',
        aspectRatio: size === 'small' ? '1/1' : '16/9',
        border: '1px solid rgba(243,240,234,0.04)',
      }}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
      tabIndex={0}
      role="button"
      aria-label={`Voir le projet : ${project.title}`}
    >
      {/* Media */}
      {project.coverImage && (
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
          }}
        />
      )}
      
      {/* Overlay gradient */}
      <div
        className="portfolio-overlay"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
          opacity: 0,
          transition: 'opacity 0.35s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '1.5rem',
        }}
      >
        {/* Icône */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {hasVideo ? (
            <div style={{
              width: '56px', height: '56px',
              border: '1px solid rgba(243,240,234,0.3)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(8,8,8,0.5)',
              backdropFilter: 'blur(4px)',
            }}>
              <Play size={22} style={{ color: '#fff', marginLeft: '3px' }} />
            </div>
          ) : (
            <div style={{
              width: '48px', height: '48px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ImageIcon size={24} style={{ color: 'rgba(243,240,234,0.6)' }} />
            </div>
          )}
        </div>

        {/* Infos texte */}
        <div>
          {project.artists && project.artists.length > 0 && (
            <p style={{ color: 'var(--color-primary)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              {project.artists.slice(0, 3).join(' · ')}
            </p>
          )}
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: size === 'small' ? '1.2rem' : '1.6rem',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '0.25rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}>
            {project.title}
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            {project.serviceType}
          </p>
        </div>
      </div>

      {/* Catégorie badge */}
      <div style={{
        position: 'absolute',
        top: '1rem', left: '1rem',
        fontSize: '0.6rem',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--color-primary)',
        background: 'rgba(8,8,8,0.75)',
        backdropFilter: 'blur(4px)',
        padding: '4px 10px',
        borderRadius: '2px',
        border: '1px solid rgba(215,38,56,0.2)',
      }}>
        {project.category}
      </div>

      {/* Featured badge */}
      {project.featured && (
        <div style={{
          position: 'absolute',
          top: '1rem', right: '1rem',
          fontSize: '0.55rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'rgba(243,240,234,0.5)',
          background: 'rgba(8,8,8,0.7)',
          backdropFilter: 'blur(4px)',
          padding: '4px 10px',
          borderRadius: '2px',
        }}>
          ★ Mis en avant
        </div>
      )}
    </motion.article>
  );
};

// ── Layout éditorial ─────────────────────────────────────────────
const EditorialGrid = ({ projects, onOpen }) => {
  if (projects.length === 0) return (
    <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--color-text-muted)' }}>
      <p>Aucun projet dans cette catégorie pour le moment.</p>
    </div>
  );

  // Séparer les projets Featured des autres pour une mise en page asymétrique
  const featured = projects.filter(p => p.size === 'hero');
  const large    = projects.filter(p => p.size === 'large' && !p.featured);
  const medium   = projects.filter(p => p.size === 'medium');
  const small    = projects.filter(p => p.size === 'small');
  const rest     = projects.filter(p => !p.size || (p.size !== 'hero' && !featured.includes(p) && !large.includes(p) && !medium.includes(p) && !small.includes(p)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero items — pleine largeur */}
      {featured.map(p => (
        <div key={p.id} style={{ width: '100%', maxHeight: '70vh' }}>
          <ProjectCard project={p} onOpen={onOpen} size="hero" />
        </div>
      ))}

      {/* Grille large — 2 colonnes */}
      {large.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '2rem',
        }}>
          {large.map(p => (
            <ProjectCard key={p.id} project={p} onOpen={onOpen} size="large" />
          ))}
        </div>
      )}

      {/* Grille mixte — 3 colonnes medium + small */}
      {(medium.length > 0 || small.length > 0) && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: '1.5rem',
        }}>
          {[...medium, ...small].map(p => (
            <ProjectCard key={p.id} project={p} onOpen={onOpen} size={p.size || 'medium'} />
          ))}
        </div>
      )}

      {/* Reste */}
      {rest.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
          gap: '1.5rem',
        }}>
          {rest.map(p => (
            <ProjectCard key={p.id} project={p} onOpen={onOpen} size="medium" />
          ))}
        </div>
      )}
    </div>
  );
};

// ── Section Portfolio ────────────────────────────────────────────
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = getProjectsByCategory(activeCategory);

  return (
    <section id="portfolio" className="section-padding" style={{ background: 'var(--color-bg)' }}>
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
              Nos réalisations
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
            Un regard<br />
            <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>sur chaque<br />histoire.</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', lineHeight: 1.7 }}>
            Événementiel, institutionnel, lifestyle, sport et graphisme — chaque projet est une nouvelle vision à raconter.
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginBottom: '3.5rem',
          }}
          role="group"
          aria-label="Filtrer par catégorie"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grille de projets */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EditorialGrid
              projects={filteredProjects}
              onOpen={setSelectedProject}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal lecteur vidéo */}
      <AnimatePresence>
        {selectedProject && (
          <DriveVideoPlayer
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
