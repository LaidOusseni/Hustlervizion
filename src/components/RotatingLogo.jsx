import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const RotatingLogo = (props) => {
  const group = useRef();
  const [isMobile, setIsMobile] = useState(false);
  
  const { scene } = useGLTF('/assets/logo.glb');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  const scale = isMobile ? [0.12, 0.12, 0.12] : [0.2, 0.2, 0.2];

  return (
    <group ref={group} {...props} dispose={null} scale={scale}>
      {scene ? <primitive object={scene} /> : null}
    </group>
  );
};

export default RotatingLogo;

// Preload to ensure fast intro
useGLTF.preload('/assets/logo.glb');
