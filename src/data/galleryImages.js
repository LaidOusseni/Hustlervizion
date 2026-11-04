import { cdn } from './media';

// Visuels du fond « galerie 3D » (hero de l'accueil + page Contact).
// Mélange d'images locales et d'aperçus de vidéos servis par le CDN (poster = <nom>.jpg).
export const GALLERY_IMAGES = [
  '/assets/Zily 2.jpeg',
  cdn('miss-may.jpg'),
  cdn('msl-final.jpg'),
  '/assets/Joe 1.jpeg',
  cdn('inauguration-t-e.jpg'),
  cdn('clip-ila.jpg'),
  '/assets/hustler vizion.jpeg',
  cdn('terre-et-eau.jpg'),
  cdn('clip.jpg'),
  '/assets/zily 1.jpeg',
  cdn('evenementiel.jpg'),
  cdn('msl-draft.jpg'),
  cdn('institu.jpg'),
  cdn('msl-1.jpg'),
];
