import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const RotatingLogo = (props) => {
  const group = useRef();
  
  const { scene } = useGLTF('/assets/logo.glb');

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={group} {...props} dispose={null} scale={[0.2, 0.2, 0.2]}>
      {scene ? <primitive object={scene} /> : null}
    </group>
  );
};

export default RotatingLogo;

// Preload to ensure fast intro
useGLTF.preload('/assets/logo.glb');
