/**
 * HUSTLER VISION — Catalogue de projets centralisé
 * 
 * ═══════════════════════════════════════════════════════════════
 * COMMENT AJOUTER UNE NOUVELLE VIDÉO GOOGLE DRIVE
 * ═══════════════════════════════════════════════════════════════
 * 
 * 1. Ouvrir la vidéo dans Google Drive
 * 2. S'assurer que le partage est "Toute personne avec le lien peut voir"
 * 3. L'URL de partage ressemble à :
 *    https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * 4. Copier FILE_ID (la longue suite de caractères entre /d/ et /view)
 * 5. Ajouter une entrée dans le catalogue ci-dessous avec driveVideoId: 'FILE_ID'
 * 
 * Exemple d'URL → ID :
 * https://drive.google.com/file/d/1ABC123XYZ/view  →  driveVideoId: '1ABC123XYZ'
 * 
 * Le lecteur utilisera automatiquement :
 * https://drive.google.com/file/d/1ABC123XYZ/preview
 * ═══════════════════════════════════════════════════════════════
 */

export const CATEGORIES = [
  { id: 'all',            label: 'Tous les projets' },
  { id: 'evenementiel',   label: 'Événementiel' },
  { id: 'institutionnel', label: 'Institutionnel' },
  { id: 'lifestyle',      label: 'Lifestyle' },
  { id: 'sport',          label: 'Sport' },
  { id: 'graphisme',      label: 'Graphisme' },
  { id: 'autres',         label: 'Autres' },
];

/**
 * @type {Array<{
 *   id: number,
 *   title: string,
 *   category: string,
 *   description: string,
 *   coverImage?: string,
 *   driveVideoId?: string,
 *   localVideoSrc?: string,
 *   artists?: string[],
 *   serviceType?: string,
 *   year?: number,
 *   featured?: boolean,
 *   size?: 'hero' | 'large' | 'medium' | 'small'
 * }>}
 */
export const PROJECTS = [
  // ─── LIFESTYLE ───────────────────────────────────────────────────
  {
    id: 1,
    title: 'INFINITY',
    category: 'lifestyle',
    description: 'Un clip lifestyle cinématographique à l\'unicité rare — captation immersive, atmosphères lumineuses et direction artistique soignée.',
    coverImage: '/assets/Design sans titre (1).png',
    driveVideoId: '100hsLEkoYUIq_HBEwugNQxb1KHMOsrjB', // Copy of ayte.mov
    artists: ['MHD', 'Roubaba', 'Joe Dwet Filet', 'Bridge', 'Jayanay King'],
    serviceType: 'Production lifestyle',
    featured: true,
    size: 'hero',
  },
  {
    id: 2,
    title: 'SAMANI Mode',
    category: 'lifestyle',
    description: 'Captation mode et lifestyle pour la marque SAMANI. Visuels élégants et atmosphère contemporaine.',
    coverImage: '/assets/hustler vizion.jpeg',
    serviceType: 'Production mode',
    featured: false,
    size: 'large',
  },
  
  // ─── ÉVÉNEMENTIEL ────────────────────────────────────────────────
  {
    id: 3,
    title: 'Élection Miss Mayotte',
    category: 'evenementiel',
    description: 'Couverture complète de l\'élection Miss Mayotte. Captation multi-caméras, montage dynamique et final émotionnel.',
    coverImage: '/assets/zily 1.jpeg',
    localVideoSrc: '/assets/show 2.mp4',
    serviceType: 'Captation événementielle',
    featured: true,
    size: 'large',
  },
  {
    id: 4,
    title: 'Photo Zily',
    category: 'evenementiel',
    description: 'Session photo et vidéo artistique pour une beauté mahoraise exceptionnelle.',
    coverImage: '/assets/Zily 2.jpeg',
    serviceType: 'Photographie & vidéo',
    size: 'medium',
  },
  {
    id: 5,
    title: 'Manzaraka Bole',
    category: 'evenementiel',
    description: 'Événement culturel mahorais. Captation authentique et ambiance festive.',
    coverImage: '/assets/hustler vizion.jpeg',
    serviceType: 'Captation événementielle',
    size: 'small',
  },
  {
    id: 6,
    title: 'Journée Maore Jet',
    category: 'evenementiel',
    description: 'Journée nautique et lifestyle à Mayotte. Images aériennes et aquatiques immersives.',
    coverImage: '/assets/Design sans titre (1).png',
    localVideoSrc: '/assets/Infinity yacht.mp4',
    serviceType: 'Captation événementielle & lifestyle',
    size: 'medium',
  },
  {
    id: 7,
    title: 'Sortie Bateau',
    category: 'evenementiel',
    description: 'Adventure nautique filmée avec une esthétique cinématographique entre mer turquoise et horizon.',
    coverImage: '/assets/Design sans titre (1).png',
    serviceType: 'Captation événementielle',
    size: 'small',
  },
  {
    id: 8,
    title: 'Aéroport',
    category: 'evenementiel',
    description: 'Reportage institutionnel à l\'aéroport de Mayotte. Ambiance professionnelle et captation dynamique.',
    coverImage: '/assets/hustler vizion.jpeg',
    serviceType: 'Reportage & captation',
    size: 'small',
  },
  
  // ─── INSTITUTIONNEL ──────────────────────────────────────────────
  {
    id: 9,
    title: 'Inauguration Terre et Eau',
    category: 'institutionnel',
    description: 'Film institutionnel pour l\'inauguration de Terre et Eau. Captation officielle et montage institutionnel premium.',
    coverImage: '/assets/Joe 1.jpeg',
    serviceType: 'Vidéo institutionnelle',
    featured: true,
    size: 'large',
  },
  {
    id: 10,
    title: 'Visite 3CA BTP sur chantier',
    category: 'institutionnel',
    description: 'Reportage sur chantier pour 3CA BTP. Documentation professionnelle d\'un projet de construction.',
    coverImage: '/assets/hustler vizion.jpeg',
    serviceType: 'Reportage institutionnel',
    size: 'medium',
  },
  
  // ─── SPORT ───────────────────────────────────────────────────────
  {
    id: 11,
    title: 'Finale Maore Summer League',
    category: 'sport',
    description: 'La finale de la Maore Summer League filmée avec une énergie brute et une mise en scène sportive percutante.',
    coverImage: '/assets/hustler vizion.jpeg',
    localVideoSrc: '/assets/Show 1.mp4',
    serviceType: 'Captation sport',
    featured: true,
    size: 'hero',
  },
  {
    id: 12,
    title: 'Lancement MSL 2026',
    category: 'sport',
    description: 'Clip de lancement pour la Maore Summer League 2026. Teaser dynamique et montage impactant.',
    coverImage: '/assets/zily 1.jpeg',
    serviceType: 'Production sport & communication',
    size: 'large',
  },
  {
    id: 13,
    title: 'Entraînement AS Mayotte FOOT',
    category: 'sport',
    description: 'Session d\'entraînement de l\'AS Mayotte Football captée avec une approche documentaire immersive.',
    coverImage: '/assets/hustler vizion.jpeg',
    serviceType: 'Captation sport',
    size: 'medium',
  },
  {
    id: 14,
    title: 'Fête des sports',
    category: 'sport',
    description: 'Couverture complète de la fête des sports à Mayotte. Énergie festive et captation multi-disciplines.',
    coverImage: '/assets/hustler vizion.jpeg',
    serviceType: 'Captation événementielle & sport',
    size: 'medium',
  },
  
  // ─── GRAPHISME ───────────────────────────────────────────────────
  {
    id: 15,
    title: 'Affiches Fête des sports',
    category: 'graphisme',
    description: 'Direction artistique et création des affiches officielles pour la Fête des sports.',
    coverImage: '/assets/Design sans titre (1).png',
    serviceType: 'Direction artistique & graphisme',
    size: 'medium',
  },
  {
    id: 16,
    title: 'Visuels Terre et Eau',
    category: 'graphisme',
    description: 'Identité visuelle et supports de communication pour Terre et Eau.',
    coverImage: '/assets/Joe 1.jpeg',
    serviceType: 'Identité visuelle & graphisme',
    size: 'small',
  },
  {
    id: 17,
    title: 'Cover MHD',
    category: 'graphisme',
    description: 'Direction artistique et création de la cover pour l\'artiste MHD.',
    coverImage: '/assets/hustler vizion.jpeg',
    artists: ['MHD'],
    serviceType: 'Direction artistique',
    size: 'small',
  },
  {
    id: 18,
    title: 'Affiche Red Cup',
    category: 'graphisme',
    description: 'Création graphique pour l\'événement Red Cup. Design percutant et identité forte.',
    coverImage: '/assets/Design sans titre (1).png',
    serviceType: 'Graphisme événementiel',
    size: 'small',
  },
  
  // ─── AUTRES ──────────────────────────────────────────────────────
  {
    id: 19,
    title: 'Reportage MSL',
    category: 'autres',
    description: 'Reportage documentaire sur la Maore Summer League. Interviews, coulisses et moments forts.',
    coverImage: '/assets/hustler vizion.jpeg',
    localVideoSrc: '/assets/Wedding 1.mp4',
    serviceType: 'Reportage documentaire',
    featured: false,
    size: 'medium',
  },
];

/**
 * Retourne les projets filtrés par catégorie.
 * @param {string} category - ID de catégorie ou 'all'
 * @returns {Array}
 */
export function getProjectsByCategory(category) {
  if (category === 'all') return PROJECTS;
  return PROJECTS.filter(p => p.category === category);
}

/**
 * Retourne les projets mis en avant.
 * @returns {Array}
 */
export function getFeaturedProjects() {
  return PROJECTS.filter(p => p.featured);
}
