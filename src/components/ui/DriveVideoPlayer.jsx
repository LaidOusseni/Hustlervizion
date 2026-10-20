import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, AlertTriangle, Loader2 } from 'lucide-react';

/**
 * Lecteur vidéo Google Drive avec chargement différé.
 * 
 * Charge uniquement l'iframe lorsque l'utilisateur clique "Lire la vidéo".
 * URL utilisée : https://drive.google.com/file/d/{driveId}/preview
 */
const DriveVideoPlayer = ({ project, onClose }) => {
  const [iframeState, setIframeState] = useState('idle'); // idle | loading | loaded | error

  const drivePreviewUrl = project.driveVideoId
    ? `https://drive.google.com/file/d/${project.driveVideoId}/preview`
    : null;

  const driveViewUrl = project.driveVideoId
    ? `https://drive.google.com/file/d/${project.driveVideoId}/view`
    : null;

  const handlePlay = () => {
    setIframeState('loading');
  };

  const handleIframeLoad = () => {
    setIframeState('loaded');
  };

  const handleIframeError = () => {
    setIframeState('error');
  };

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-5xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1.5rem',
        }}>
          <div>
            <p style={{ color: 'var(--color-primary)', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {project.category?.toUpperCase()}
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--color-text)' }}>
              {project.title}
            </h2>
            {project.artists && project.artists.length > 0 && (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
                Avec : {project.artists.join(', ')}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer le lecteur"
            style={{
              color: 'var(--color-text-muted)',
              transition: 'color 0.2s ease',
              padding: '0.5rem',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
          >
            <X size={24} />
          </button>
        </div>

        {/* Video Area */}
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0a0a0a', borderRadius: '4px', overflow: 'hidden' }}>
          
          {/* État idle : poster + bouton play */}
          {iframeState === 'idle' && (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {project.coverImage && (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                />
              )}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '1rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3))',
              }}>
                {drivePreviewUrl ? (
                  <button
                    onClick={handlePlay}
                    className="btn-primary"
                    style={{ fontSize: '0.8rem' }}
                  >
                    ▶ Lire la vidéo
                  </button>
                ) : project.localVideoSrc ? (
                  <video
                    src={project.localVideoSrc}
                    controls
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Vidéo non disponible
                  </p>
                )}
                {project.description && (
                  <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', textAlign: 'center', fontSize: '0.9rem', padding: '0 1rem' }}>
                    {project.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* État loading */}
          {iframeState === 'loading' && (
            <>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '1rem',
              }}>
                <Loader2 size={40} style={{ color: 'var(--color-primary)', animation: 'spin 1s linear infinite' }} />
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Chargement du lecteur…</p>
              </div>
              <iframe
                src={drivePreviewUrl}
                title={project.title}
                allow="autoplay; fullscreen"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  border: 'none',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              />
            </>
          )}

          {/* État loaded */}
          {iframeState === 'loaded' && (
            <iframe
              src={drivePreviewUrl}
              title={project.title}
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          )}

          {/* État error */}
          {iframeState === 'error' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '1rem', padding: '2rem', textAlign: 'center',
            }}>
              <AlertTriangle size={40} style={{ color: '#f59e0b' }} />
              <p style={{ color: 'var(--color-text)' }}>
                La vidéo ne peut pas être chargée pour le moment.
              </p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', maxWidth: '400px' }}>
                Vérifiez que la vidéo est partagée en mode "Toute personne avec le lien peut voir" sur Google Drive.
              </p>
              {driveViewUrl && (
                <a
                  href={driveViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}
                >
                  <ExternalLink size={16} /> Ouvrir sur Google Drive
                </a>
              )}
            </div>
          )}
        </div>

        {/* Infos projet */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '1.5rem',
          flexWrap: 'wrap',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(243,240,234,0.06)',
        }}>
          {project.serviceType && (
            <div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Prestation</p>
              <p style={{ color: 'var(--color-text)', fontSize: '0.9rem' }}>{project.serviceType}</p>
            </div>
          )}
          {project.year && (
            <div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Année</p>
              <p style={{ color: 'var(--color-text)', fontSize: '0.9rem' }}>{project.year}</p>
            </div>
          )}
          {project.driveVideoId && (
            <div style={{ marginLeft: 'auto' }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Source</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Google Drive</p>
            </div>
          )}
          {project.localVideoSrc && !project.driveVideoId && (
            <div style={{ marginLeft: 'auto' }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Source</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Local</p>
            </div>
          )}
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
};

export default DriveVideoPlayer;
