'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function WireframePlanet() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
      meshRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -2, -18]} scale={[7, 7, 7]}>
      <icosahedronGeometry args={[1, 2]} />
      <meshBasicMaterial
        wireframe
        color="#7C3AED"
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export default WireframePlanet;
