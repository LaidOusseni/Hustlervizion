import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';

const RotatingLogo = (props) => {
  const group = useRef();
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scene } = useGLTF('/assets/logo.glb');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((_, delta) => {
    if (group.current && !prefersReducedMotion) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  const scale = isMobile
  ? [0.08, 0.08, 0.08]
  : [0.14, 0.14, 0.14];

  return (
    <group ref={group} {...props} dispose={null} scale={scale}>
      {scene ? <primitive object={scene} /> : null}
    </group>
  );
};

export default RotatingLogo;

// Preload to ensure fast intro
useGLTF.preload('/assets/logo.glb');
