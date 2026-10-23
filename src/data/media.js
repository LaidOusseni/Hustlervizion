// Vidéos et images servies par Cloudflare : bucket R2 « hustlervizion », lu par le Worker hustlervizion-cdn.
// Les fichiers s'envoient depuis le projet hustlervizion-cdn (npm run convertir, puis npm run envoyer).
// Le jour où le site a son propre domaine, définir VITE_CDN_URL (ex. https://media.hustlervizion.com)
// au lieu de modifier ce fichier.
export const CDN_URL = (import.meta.env.VITE_CDN_URL || 'https://hustlervizion-cdn.zaher-5hc.workers.dev').replace(/\/$/, '');

export const cdn = (file) => `${CDN_URL}/${encodeURIComponent(file)}`;

/**
 * Vidéo convertie par hustlervizion-cdn : le MP4 et son image d'aperçu portent le même nom.
 *   cdnVideo('ayte', { portrait: true })
 *   → { video: '…/ayte.mp4', poster: '…/ayte.jpg', portrait: true }
 *
 * Sur une carte, `image` (si présente) sert de fond ; sinon c'est `poster`.
 */
export const cdnVideo = (name, { portrait = false } = {}) => ({
  video: cdn(`${name}.mp4`),
  poster: cdn(`${name}.jpg`),
  portrait,
});
