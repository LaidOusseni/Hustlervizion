import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import IntroSection from './components/IntroSection';
import HeroLanding from './components/HeroLanding';
import ShaderBackground from './components/ui/ShaderBackground';
import TiltedGridHero from './components/ui/TiltedGridHero';
import MediaCard from './components/MediaCard';
import { cdn, cdnVideo } from './data/media';

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/evenementiel', label: 'Événementiel' },
  { to: '/clips', label: 'Clips' },
  { to: '/immobilier', label: 'Immobilier' },
  { to: '/contact', label: 'Contact' },
];

const universCards = [
  { title: 'ÉVÉNEMENTIEL', to: '/evenementiel', image: '/assets/Zily 2.jpeg' },
  { title: 'CLIPS', to: '/clips', image: '/assets/Joe 1.jpeg' },
  { title: 'IMMOBILIER', to: '/immobilier', image: cdn('immo-sejour-cuisine.jpg') },
];

const realizationImages = [
  { src: '/assets/Zily 2.jpeg', alt: 'Photographie événementielle' },
  { src: '/assets/hustler vizion.jpeg', alt: 'Production audiovisuelle' },
  { src: '/assets/Joe 1.jpeg', alt: 'Production artistique' },
  { src: '/assets/zily 1.jpeg', alt: 'Portrait artistique' },
];

// Photos du même appartement : chaque fiche affiche les autres en dessous.
const IMMO_PHOTOS = ['immo-chambre.jpg', 'immo-salon.jpg', 'immo-sejour-cuisine.jpg', 'immo-salle-a-manger.jpg'];
const immoPhotos = (current) => IMMO_PHOTOS.filter((file) => file !== current).map((file) => ({ image: cdn(file) }));

const categoryPages = {
  evenementiel: {
    breadcrumb: 'Événementiel',
    title: 'Événementiel',
    intro: 'Des événements uniques, des images qui marquent.',
    description: "Nous capturons l'énergie, l'émotion et le mouvement des événements pour en faire des souvenirs visuels puissants et durables.",
    accents: ['MUSIQUE', 'ÉVÉNEMENT', 'ART DIRECTION', 'CAPTURE'],
    previous: { to: '/', label: 'Accueil' },
    next: { to: '/clips', label: 'Clips' },
    showreel: cdnVideo('evenementiel'),
    cards: [
      { slug: 'miss-mayotte', title: 'Miss Mayotte', tag: 'Élection · Captation événementielle', ...cdnVideo('miss-may'), image: '/assets/zily 1.jpeg', gallery: [cdnVideo('33-miss', { portrait: true })], description: "Couverture de l'élection Miss Mayotte, avec captation événementielle et un montage qui restitue l'émotion de la soirée." },
      { slug: 'maore-summer-league', title: 'Maore Summer League', tag: 'Basket · Captation événementielle', ...cdnVideo('msl-final'), gallery: [cdnVideo('msl-1'), cdnVideo('msl-draft')], description: "Captation de la Maore Summer League : l'énergie des matchs, le public et les temps forts de la compétition." },
      { slug: 'inauguration-terre-et-eau', title: 'Inauguration Terre et Eau', tag: 'Inauguration · Film institutionnel', ...cdnVideo('inauguration-t-e'), gallery: [cdnVideo('terre-et-eau'), cdnVideo('institu')], description: "Film institutionnel pour l'inauguration de Terre et Eau. Captation officielle et montage institutionnel premium." },
      { slug: 'miss-grand-nord', title: 'Miss Grand Nord', tag: 'Élection · Tournage', ...cdnVideo('miss-grand-nord-2'), description: 'Tournage autour de l’élection Miss Grand Nord.' },
      { slug: 'manzaraka-bole', title: 'Manzaraka Bole', tag: 'Événement culturel · Live', ...cdnVideo('terrel'), description: 'Captation événementielle et mise en images d’un événement culturel.' },
      { slug: 'journee-maore-jet', title: 'Journée Maore Jet', tag: 'Sortie · Captation', video: '/assets/Infinity yacht.mp4', description: 'Images de la journée Maore Jet, entre ambiance nautique et moments partagés.' },
      { slug: 'photo-zily', title: 'Photo Zily', tag: 'Couverture événementielle', image: '/assets/Zily 2.jpeg', description: 'Portrait et couverture photographique autour de Zily.' },
    ],
  },
  clips: {
    breadcrumb: 'Clips',
    title: 'Clips & musique',
    intro: 'Des univers artistiques, des images qui font vivre la musique.',
    description: 'Clips, performances, making-of et contenus pour artistes : nous créons des visuels puissants qui racontent une histoire et révèlent une identité.',
    accents: ['CLIP', 'DIRECTION ARTISTIQUE', 'MAKING OF', 'CONTENT CREATION'],
    previous: { to: '/evenementiel', label: 'Événementiel' },
    next: { to: '/immobilier', label: 'Immobilier' },
    showreel: cdnVideo('clip'),
    cards: [
      { slug: 'infinity', title: 'INFINITY', tag: 'MHD · Roubaba · Joe Dwet Filet · Bridge · Jayanay King', image: '/assets/Design sans titre (1).png', description: 'Un clip lifestyle cinématographique, porté par une direction artistique soignée et plusieurs artistes.' },
      { slug: 'la-maison-samani', title: 'La Maison SAMANI', ...cdnVideo('chambre', { portrait: true }), gallery: [cdnVideo('table', { portrait: true }), cdnVideo('samaani-salon', { portrait: true })], description: 'Production audiovisuelle et univers visuel pour La Maison SAMANI.' },
      { slug: 'tereza', title: 'Tereza', tag: 'Clip officiel', ...cdnVideo('tereza-off'), description: 'Clip officiel réalisé par Hustler Vision.' },
      { slug: 'ila', title: 'Ila', tag: 'Clip', ...cdnVideo('clip-ila'), description: 'Clip musical réalisé par Hustler Vision.' },
      { slug: 'nassrane', title: 'Nassrane', tag: 'Clip', ...cdnVideo('nassrane', { portrait: true }), description: 'Projet de clip musical.' },
      { slug: 'aye', title: 'Aye', tag: 'Clip', ...cdnVideo('ayte', { portrait: true }), description: 'Projet de clip musical.' },
      { slug: 'autres-productions', title: 'Autres productions', tag: 'Podcast · Réseaux sociaux · Making-of', ...cdnVideo('podcast-contenenu-reseua', { portrait: true }), description: 'Autres projets : podcast, contenus pour les réseaux sociaux, tournages et making-of.' },
    ],
  },
  immobilier: {
    breadcrumb: 'Immobilier',
    title: 'Immobilier',
    intro: 'Mettez en valeur vos espaces, racontez leur potentiel.',
    description: "Vidéos et photos immobilières pour agences, promoteurs et propriétaires. Nous révélons l'âme des lieux à travers des images soignées et cinématiques.",
    accents: ['FILM IMMOBILIER', 'PHOTOGRAPHIE', 'DRONE', 'MISE EN VALEUR'],
    previous: { to: '/clips', label: 'Clips' },
    next: { to: '/evenementiel', label: 'Événementiel' },
    cards: [
      { slug: 'chambre', title: 'Chambre', tag: 'Photographie immobilière', image: cdn('immo-chambre.jpg'), gallery: immoPhotos('immo-chambre.jpg'), description: 'Photographie d’intérieur : la chambre, mise en valeur de la lumière et de la décoration.' },
      { slug: 'salon', title: 'Salon', tag: 'Photographie immobilière', image: cdn('immo-salon.jpg'), gallery: immoPhotos('immo-salon.jpg'), description: 'Photographie d’intérieur : le salon et son coin télévision.' },
      { slug: 'sejour-cuisine', title: 'Séjour & cuisine', tag: 'Photographie immobilière', image: cdn('immo-sejour-cuisine.jpg'), gallery: immoPhotos('immo-sejour-cuisine.jpg'), description: 'Photographie d’intérieur : le séjour ouvert sur la cuisine.' },
      { slug: 'salle-a-manger', title: 'Salle à manger', tag: 'Photographie immobilière', image: cdn('immo-salle-a-manger.jpg'), gallery: immoPhotos('immo-salle-a-manger.jpg'), description: 'Photographie d’intérieur : la salle à manger.' },
    ],
  },
};

function BackgroundShell() {
  return (
    <div className="shader-backdrop" aria-hidden="true">
      <ShaderBackground className="shader-canvas" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <NavLink to="/" end className="brand-mark" aria-label="Hustler Vision — Accueil" onClick={() => setMenuOpen(false)}>
          HV.
        </NavLink>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navigation principale">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            className="menu-button"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid container">
        <div className="footer-identity">
          <Link to="/" className="footer-brand-mark" aria-label="Hustler Vision — Accueil">HV.</Link>
          <h2>Hustler Vision</h2>
          <p>Création audiovisuelle, direction artistique et contenus visuels.</p>
        </div>
        <div className="footer-column">
          <h3>Navigation</h3>
          <nav aria-label="Navigation de pied de page">
            <Link to="/">Accueil</Link>
            <Link to="/evenementiel">Événementiel</Link>
            <Link to="/clips">Clips &amp; musique</Link>
            <Link to="/immobilier">Immobilier</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
        <div className="footer-column">
          <h3>Contact</h3>
          <a href="mailto:hello@hustlervizion.com">hello@hustlervizion.com</a>
          <a href="https://www.instagram.com/hustlervizion" target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
        <div className="footer-column">
          <h3>Informations légales</h3>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/confidentialite">Politique de confidentialité</Link>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} Hustler Vision. Tous droits réservés.</span>
        <span>Mayotte · International</span>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="home-page">
      <HeroLanding />

      <section id="univers" className="univers-section container">
        <div className="section-heading">
          <span className="eyebrow">Nos domaines de création</span>
          <h2>NOS UNIVERS</h2>
        </div>
        <div className="universe-grid">
          {universCards.map((card) => (
            <NavLink
              key={card.title}
              to={card.to}
              className={`universe-card${card.image ? '' : ' image-placeholder'}`}
              style={card.image ? { backgroundImage: `linear-gradient(180deg, rgba(10, 6, 6, 0.12), rgba(10, 6, 6, 0.72)), url('${card.image}')` } : undefined}
            >
              <span className="card-tag">{card.title}</span>
              <span className="card-arrow" aria-hidden="true">→</span>
            </NavLink>
          ))}
        </div>
      </section>

      <section className="realizations-section container">
        <div className="section-heading">
          <span className="eyebrow">Une sélection de projets</span>
          <h2>QUELQUES RÉALISATIONS</h2>
        </div>
        <div className="tilted-grid-wrap">
          <TiltedGridHero images={realizationImages} speed={7} tileHeight={44} aspectRatio={16 / 9} gap={5} axis={62} curve={72} fade={18} />
        </div>
      </section>

      <section className="studio-section container">
        <div className="studio-copy">
          <span className="eyebrow">Le studio</span>
          <h2>L'IMAGE AU SERVICE DE VOTRE VISION</h2>
          <p>Hustler Vision accompagne les marques, les artistes et les organisateurs d'événements dans la création de contenus visuels. De la captation à la direction artistique, chaque projet est pensé pour raconter une histoire et marquer les esprits.</p>
        </div>
        <div className="studio-art" aria-hidden="true">
          <span>HUSTLER</span>
          <span>VISION</span>
        </div>
      </section>

      <section className="expertise-section container">
        <div className="section-heading">
          <span className="eyebrow">Notre savoir-faire</span>
          <h2>NOS EXPERTISES</h2>
        </div>
        <ul className="expertise-list">
          <li><span>01</span>Production audiovisuelle</li>
          <li><span>02</span>Captation événementielle</li>
          <li><span>03</span>Direction artistique</li>
          <li><span>04</span>Graphisme</li>
        </ul>
      </section>

      <section className="home-cta container">
        <span className="eyebrow">Créons quelque chose de fort</span>
        <h2>UN PROJET EN TÊTE ?</h2>
        <p>Parlons de votre vision et donnons vie à vos prochaines idées.</p>
        <Link to="/contact" className="cta-button">NOUS CONTACTER →</Link>
      </section>
    </div>
  );
}

function CategoryPage({ page, category }) {
  return (
    <div className="page-template container">
      <header className="category-header">
        <div className="crumbs"><Link to="/">Accueil</Link> / {page.breadcrumb}</div>
        <div className="category-main">
          <div>
            <h1>{page.title}</h1>
            <p className="page-intro">{page.intro}</p>
            <p className="page-description">{page.description}</p>
          </div>
          <div className="tag-column" aria-label="Domaines d'expertise">
            {page.accents.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </header>

      {page.showreel && (
        <video
          className="category-showreel"
          src={page.showreel.video}
          poster={page.showreel.poster}
          controls
          playsInline
          preload="metadata"
        />
      )}

      <div className="grid-shell">
        {page.cards.map((card) => (
          <MediaCard key={card.slug} card={card} to={`/projets/${category}/${card.slug}`} />
        ))}
      </div>

      <div className="page-nav-row">
        <Link to={page.previous.to} className="page-arrow-link left">← {page.previous.label}</Link>
        <Link to={page.next.to} className="page-arrow-link right">{page.next.label} →</Link>
      </div>
    </div>
  );
}

function ProjectDetailPage() {
  const { category, slug } = useParams();
  const page = categoryPages[category];
  const project = page?.cards.find((card) => card.slug === slug);

  if (!project) {
    return (
      <section className="not-found container">
        <h1>Projet introuvable</h1>
        <Link to={page ? `/${category}` : '/'} className="cta-button">RETOUR AUX PROJETS →</Link>
      </section>
    );
  }

  return (
    <article className="project-detail container">
      <div className="crumbs"><Link to="/">Accueil</Link> / <Link to={`/${category}`}>{page.breadcrumb}</Link> / {project.title}</div>
      <h1>{project.title}</h1>
      {project.tag && <p className="project-detail-tag">{project.tag}</p>}
      {project.video ? (
        <video className={`project-detail-media${project.portrait ? ' is-portrait' : ''}`} src={project.video} controls playsInline preload="metadata" poster={project.poster ?? project.image} />
      ) : project.image ? (
        <img className={`project-detail-media${project.portrait ? ' is-portrait' : ''}`} src={project.image} alt={project.title} />
      ) : (
        <div className="project-detail-media image-placeholder" role="img" aria-label={`Visuel à compléter pour ${project.title}`} />
      )}
      <div className="project-detail-copy">
        <span className="eyebrow">À propos du projet</span>
        <p>{project.description}</p>
      </div>
      {project.gallery?.length > 0 && (
        <section className="project-gallery" aria-label="Du même projet">
          <span className="eyebrow">Du même projet</span>
          <div className="project-gallery-grid">
            {project.gallery.map((item) => (item.video ? (
              <video
                key={item.video}
                className={`project-gallery-video${item.portrait ? ' is-portrait' : ''}`}
                src={item.video}
                poster={item.poster}
                controls
                playsInline
                preload="none"
              />
            ) : (
              <img
                key={item.image}
                className="project-gallery-image"
                src={item.image}
                alt={`${project.title} — autre vue`}
                loading="lazy"
              />
            )))}
          </div>
        </section>
      )}
    </article>
  );
}

function ContactPage() {
  return (
    <section className="contact-page container">
      <div className="contact-panel">
        <p className="crumbs"><Link to="/">Accueil</Link> / Contact</p>
        <span className="eyebrow">Parlons de votre projet</span>
        <h1>Contact</h1>
        <p>Nous créons des univers visuels dans les moments qui comptent. Écrivez-nous pour donner vie à votre projet.</p>
        <a href="mailto:hello@hustlervizion.com" className="cta-button">hello@hustlervizion.com</a>
      </div>
    </section>
  );
}

function LegalPage({ privacy = false }) {
  return (
    <article className="legal-page container">
      <div className="crumbs"><Link to="/">Accueil</Link> / {privacy ? 'Politique de confidentialité' : 'Mentions légales'}</div>
      <span className="eyebrow">Informations</span>
      <h1>{privacy ? 'Politique de confidentialité' : 'Mentions légales'}</h1>
      {privacy ? (
        <>
          <section><h2>Responsable du traitement</h2><p>Hustler Vision — identité juridique et coordonnées de l’éditeur à compléter avant publication.</p></section>
          <section><h2>Données et stockage local</h2><p>Le site ne comporte pas de formulaire de collecte. Le navigateur peut enregistrer la préférence d’affichage de l’écran d’introduction (« hv-intro-seen ») dans son stockage local. Cette donnée reste sur l’appareil et n’est pas un cookie.</p></section>
          <section><h2>Ressources externes</h2><p>Les polices de caractères sont chargées depuis Google Fonts. Lors de leur chargement, votre navigateur contacte les serveurs de Google et leur transmet les informations techniques nécessaires à la requête, dont votre adresse IP. Les conditions et la politique de confidentialité du fournisseur s’appliquent à ce service.</p></section>
          <section><h2>Contact par e-mail</h2><p>Un lien e-mail ouvre votre logiciel de messagerie. Les informations que vous choisissez d’envoyer sont traitées via votre messagerie et ne sont pas transmises par un formulaire sur ce site.</p></section>
          <section><h2>Vos droits</h2><p>Pour toute demande relative à vos données, contactez <a href="mailto:hello@hustlervizion.com">hello@hustlervizion.com</a>. L’identité et l’adresse du responsable doivent être complétées pour finaliser cette information.</p></section>
        </>
      ) : (
        <>
          <p className="legal-notice">Certaines informations obligatoires n’ont pas été fournies. Les champs indiqués doivent être complétés par l’éditeur avant la mise en ligne définitive.</p>
          <section><h2>Éditeur du site</h2><p>Nom commercial : Hustler Vision<br />Dénomination sociale : [à compléter]<br />Forme juridique : [à compléter]<br />Adresse du siège social : [à compléter]<br />Numéro d’immatriculation (SIREN/SIRET) : [à compléter]<br />Directeur ou directrice de la publication : [à compléter]<br />Contact : <a href="mailto:hello@hustlervizion.com">hello@hustlervizion.com</a></p></section>
          <section><h2>Hébergement</h2><p>Nom et coordonnées de l’hébergeur : [à compléter par l’éditeur].</p></section>
          <section><h2>Propriété intellectuelle</h2><p>Les contenus de ce site sont à utiliser avec l’autorisation de leurs ayants droit. Toute information complémentaire sur les crédits ou titulaires de droits est à fournir par l’éditeur.</p></section>
        </>
      )}
    </article>
  );
}

function MainSite() {
  return (
    <div className="main-site main-site-enter" key="main">
      <TopBar />
      <ScrollToTop />
      <main className="site-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/evenementiel" element={<CategoryPage category="evenementiel" page={categoryPages.evenementiel} />} />
          <Route path="/clips" element={<CategoryPage category="clips" page={categoryPages.clips} />} />
          <Route path="/immobilier" element={<CategoryPage category="immobilier" page={categoryPages.immobilier} />} />
          <Route path="/projets/:category/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="/confidentialite" element={<LegalPage privacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

function AppContent() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('hv-intro-seen') !== 'true';
  });
  const [introLeaving, setIntroLeaving] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('intro-active', showIntro);
    if (!showIntro) localStorage.setItem('hv-intro-seen', 'true');
    return () => document.documentElement.classList.remove('intro-active');
  }, [showIntro]);

  const enterSite = () => {
    setIntroLeaving(true);
    window.setTimeout(() => setShowIntro(false), 650);
  };

  return (
    <div className="app-shell">
      <BackgroundShell />
      {showIntro ? (
        <IntroSection onEnter={enterSite} isLeaving={introLeaving} />
      ) : (
        <MainSite />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
