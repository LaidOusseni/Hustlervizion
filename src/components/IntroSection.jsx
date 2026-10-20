import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import RotatingLogo from './RotatingLogo';
import ErrorBoundary from './ErrorBoundary';

const IntroSection = ({ onEnter, isLeaving }) => (
  <section className={`intro-section${isLeaving ? ' intro-section-leaving' : ''}`} aria-label="Introduction à Hustler Vision">
    <div className="intro-logo" aria-label="Logo 3D Hustler Vision">
      <ErrorBoundary fallback={<div className="intro-logo-error" aria-hidden="true" />}>
        <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.65} />
          <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.3} color="#f4c65e" />
          <pointLight position={[-10, -10, -10]} intensity={0.65} color="#a10d19" />
          <Suspense fallback={null}>
            <RotatingLogo />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
    <div className="intro-copy">
      <h1>DÉCOUVREZ NOTRE VISION</h1>
      <button
        type="button"
        className="intro-enter-button"
        onClick={onEnter}
      >
        CLIQUER ICI POUR ENTRER
      </button>
    </div>
  </section>
);

export default IntroSection;
