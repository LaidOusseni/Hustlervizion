import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Délai avant de lancer l'aperçu : la souris qui ne fait que passer ne déclenche rien.
const HOVER_DELAY_MS = 250;

// Aperçu seulement avec une vraie souris (pas sur mobile/tactile)
// et si l'utilisateur n'a pas demandé à réduire les animations.
const canPreview = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Carte de projet. Si le projet a une vidéo, elle se lance en sourdine au survol
 * (comme sur YouTube) et disparaît dès que la souris quitte la carte.
 * La vidéo n'est chargée qu'au premier survol : la page ne télécharge rien d'avance.
 */
function MediaCard({ card, to }) {
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const startAtRef = useRef(0);
  const [hovering, setHovering] = useState(false);
  const [src, setSrc] = useState(null);
  const [visible, setVisible] = useState(false);

  const cover = card.image ?? card.poster;
  const hasPreview = Boolean(card.video);

  // Lance la lecture dès que la vidéo est attachée et que la souris est toujours là.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || !hovering) return;
    video.play().catch(() => {
      // lecture refusée ou interrompue par la sortie de la souris : on reste sur l'image
    });
  }, [src, hovering]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const handleEnter = () => {
    if (!hasPreview || !canPreview()) return;
    timerRef.current = window.setTimeout(() => {
      setHovering(true);
      setSrc(card.video);
    }, HOVER_DELAY_MS);
  };

  const handleLeave = () => {
    window.clearTimeout(timerRef.current);
    setHovering(false);
    setVisible(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      if (video.readyState > 0) video.currentTime = startAtRef.current;
    }
  };

  // Démarre au même moment que l'image d'aperçu (générée à 10 % de la vidéo, 3 s max)
  // pour que le passage image → vidéo soit fluide.
  const handleLoadedMetadata = (event) => {
    const video = event.currentTarget;
    startAtRef.current = Math.min(3, (video.duration || 0) * 0.1);
    video.currentTime = startAtRef.current;
  };

  return (
    <Link
      to={to}
      className={`media-card${cover ? '' : ' image-placeholder'}${visible ? ' is-previewing' : ''}`}
      style={cover ? { backgroundImage: `linear-gradient(180deg, rgba(15, 9, 9, 0.05), rgba(15, 9, 9, 0.82)), url('${cover}')` } : undefined}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {hasPreview && (
        <>
          <video
            ref={videoRef}
            className="media-card-preview"
            src={src ?? undefined}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            onLoadedMetadata={handleLoadedMetadata}
            onPlaying={() => hovering && setVisible(true)}
          />
          <span className="media-card-shade" aria-hidden="true" />
        </>
      )}
      <div className="media-card-caption">
        <strong>{card.title}</strong>
        {card.tag && <span>{card.tag}</span>}
      </div>
      <span className="media-card-arrow" aria-hidden="true">→</span>
    </Link>
  );
}

export default MediaCard;
