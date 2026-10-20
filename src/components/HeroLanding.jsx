import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import RotatingLogo from './RotatingLogo';

const HeroLanding = () => (
  <section id="home" className="hero-section">
    <div className="hero-aura" aria-hidden="true" />
    <div className="hero-content container">
      <div className="hero-logo" aria-label="Logo 3D Hustler Vision">
        <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 1.5]}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 4]} intensity={1.7} color="#f8d36a" />
          <pointLight position={[-3, -1, 2]} intensity={1.4} color="#d91f36" />
          <Suspense fallback={null}>
            <RotatingLogo />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
      <h1>
        CRÉE. DÉVELOPPE. IMPACTE.
      </h1>
      <p className="hero-services">
        Production audiovisuelle · Captation événementielle · Direction artistique · Graphisme
      </p>
      <p className="hero-location">
        Basé à Mayotte, rayonnant à l’international.
      </p>
      <a
        href="#univers"
        className="cta-button"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('univers')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        DÉCOUVRIR NOS PROJETS →
      </a>
    </div>
  </section>
);

export default HeroLanding;
