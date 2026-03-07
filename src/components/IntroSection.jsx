import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import RotatingLogo from './RotatingLogo';
import ErrorBoundary from './ErrorBoundary';

const IntroSection = ({ onEnter }) => {
  return (
    <motion.section 
      className="intro-section"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: 'easeInOut'} }}
      style={{
        width: '100vw',
        height: '100dvh', /* Fixes mobile browser cutoff */
        backgroundColor: '#050000',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Cinematic dark red lighting background effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vh',
        background: 'radial-gradient(circle, rgba(139,0,0,0.15) 0%, rgba(5,0,0,1) 70%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* 3D Content */}
      <div style={{ width: '100%', flex: 1, zIndex: 2, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ErrorBoundary>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#8B0000" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
            <Suspense fallback={null}>
              <RotatingLogo />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Text UI */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ zIndex: 2, textAlign: 'center', paddingBottom: '3rem' }}
      >
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 300,
          color: '#ffffff',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '2rem'
        }}>
          Come discover our vision
        </h2>

        <motion.button 
          onClick={onEnter}
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'transparent',
            border: '1px solid rgba(139, 0, 0, 0.8)',
            boxShadow: '0 0 15px rgba(139, 0, 0, 0.4)'
          }}
        >
          Enter the experience
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default IntroSection;
