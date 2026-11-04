import * as React from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Galerie 3D « parallax unfurling » (adaptée de 21st.dev) utilisée comme calque d'arrière-plan.
 *
 * - Elle remplit son parent positionné (position: relative) et ne le dépasse jamais :
 *   toutes les tailles sont en % du parent, et le cadre est rogné (overflow: hidden).
 * - La progression est liée au scroll de la fenêtre, mesuré sur le parent de la galerie.
 * - `grow` : le cadre grossit (88 % → 100 %) et perd ses coins arrondis pendant le scroll.
 *   Sans `grow`, le cadre occupe tout le parent et seul l'effet 3D / parallaxe réagit au scroll.
 *
 * Styles en ligne volontairement : le projet n'utilise pas les classes utilitaires Tailwind.
 */

const COLUMN_COUNT = 4;
const SPRING = { stiffness: 100, damping: 20, mass: 0.5 };
const GOLD_BORDER = 'rgba(245, 215, 158, 0.22)';
const EDGE_MASK =
  'linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent), linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)';

function splitColumns(images) {
  const columns = Array.from({ length: COLUMN_COUNT }, (_, col) => images.filter((_, i) => i % COLUMN_COUNT === col));
  // Chaque colonne est doublée pour que le défilement vertical ne laisse jamais de vide.
  return columns.map((column) => [...column, ...column]);
}

function ImageCard({ src }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(160px, 24vw, 340px)',
        flexShrink: 0,
        overflow: 'hidden',
        background: '#111',
        backfaceVisibility: 'hidden',
      }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

export function ParallaxUnfurlingGallery({
  images,
  grow = true,
  offset = ['start start', 'end start'],
  growEnd = 0.5,
  unfurlEnd = 0.7,
  imageOpacity = 0.6,
  ambient = false,
  ambientDuration = 16,
  className,
  style,
}) {
  const rootRef = React.useRef(null);
  const columns = React.useMemo(() => splitColumns(images), [images]);

  const { scrollYProgress } = useScroll({ target: rootRef, offset });
  const progress = useSpring(scrollYProgress, SPRING);

  // Mode ambiant : va-et-vient automatique (0 → 1 → 0) pour garder du mouvement sans scroll.
  const reduceMotion = useReducedMotion();
  const ambientValue = useMotionValue(0);
  React.useEffect(() => {
    if (!ambient || reduceMotion) return undefined;
    const controls = animate(ambientValue, 1, {
      duration: ambientDuration,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    });
    return () => controls.stop();
  }, [ambient, ambientDuration, reduceMotion, ambientValue]);
  const columnProgress = useTransform([progress, ambientValue], ([p, a]) => (ambient ? a * 0.8 + p * 0.2 : p));

  // Cadre : grossit au scroll mais reste en % du parent, donc jamais plus grand que lui.
  const bannerWidth = useTransform(progress, [0, growEnd], grow ? ['88%', '100%'] : ['100%', '100%']);
  const bannerHeight = useTransform(progress, [0, growEnd], grow ? ['84%', '100%'] : ['100%', '100%']);
  const bannerRadius = useTransform(progress, [0, growEnd], grow ? ['48px', '0px'] : ['0px', '0px']);
  const bannerBorder = useTransform(progress, [0, growEnd], grow ? ['4px', '0px'] : ['0px', '0px']);

  // Matrice 3D : se « déplie » à mesure que l'on scrolle.
  const rotateY = useTransform(progress, [0, unfurlEnd], [-30, -8]);
  const rotateX = useTransform(progress, [0, unfurlEnd], [18, 4]);
  const rotateZ = useTransform(progress, [0, unfurlEnd], [10, 2]);
  const translateZ = useTransform(progress, [0, unfurlEnd], [-450, 0]);

  // Parallaxe des colonnes.
  const yCol1 = useTransform(columnProgress, [0, 1], ['0%', '-40%']);
  const yCol2 = useTransform(columnProgress, [0, 1], ['-40%', '10%']);
  const yCol3 = useTransform(columnProgress, [0, 1], ['0%', '-40%']);
  const yCol4 = useTransform(columnProgress, [0, 1], ['-30%', '20%']);
  const columnY = [yCol1, yCol2, yCol3, yCol4];

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <motion.div
        style={{
          position: 'relative',
          width: bannerWidth,
          height: bannerHeight,
          borderRadius: bannerRadius,
          borderWidth: bannerBorder,
          borderStyle: 'solid',
          borderColor: GOLD_BORDER,
          boxSizing: 'border-box',
          overflow: 'hidden',
          // Fond transparent : le shader animé du site reste visible derrière les photos.
          background: 'transparent',
          willChange: 'width, height',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1000px',
            // Fondu des bords par masque (transparence) plutôt que par vignette noire opaque.
            WebkitMaskImage: EDGE_MASK,
            maskImage: EDGE_MASK,
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect',
          }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              rotateZ,
              z: translateZ,
              transformStyle: 'preserve-3d',
              display: 'flex',
              gap: 'clamp(16px, 1.6vw, 24px)',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              width: '120vw',
              height: '150%',
              opacity: imageOpacity,
              willChange: 'transform',
            }}
          >
            {columns.map((column, c) => (
              <motion.div
                key={c}
                style={{
                  y: columnY[c],
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(16px, 1.6vw, 24px)',
                  width: 'clamp(200px, 22vw, 420px)',
                  flexShrink: 0,
                }}
              >
                {column.map((src, i) => (
                  <ImageCard key={`${c}-${i}`} src={src} />
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default ParallaxUnfurlingGallery;
