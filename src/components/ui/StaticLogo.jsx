import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';

// Logo or 3D figé (aucune rotation, rendu une seule fois), utilisé dans l'en-tête.
// Le modèle est cloné : un même objet 3D ne peut pas être affiché dans deux <Canvas>.
function Logo() {
  const { scene } = useGLTF('/assets/logo.glb');
  const model = useMemo(() => scene.clone(true), [scene]);
  return (
    <group scale={0.4} dispose={null}>
      <primitive object={model} />
    </group>
  );
}

const StaticLogo = () => (
  <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 2]} frameloop="demand">
    <ambientLight intensity={1} />
    <directionalLight position={[2, 2, 4]} intensity={1.7} color="#f8d36a" />
    <pointLight position={[-3, -1, 2]} intensity={1.4} color="#d91f36" />
    <Suspense fallback={null}>
      <Logo />
      <Environment preset="city" />
    </Suspense>
  </Canvas>
);

export default StaticLogo;
