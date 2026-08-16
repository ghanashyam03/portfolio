'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function OrbitalPlane() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.1;
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.6, 0.2, 0]}>
      {/* Concentric Wireframe Orbital Grid Lines */}
      <mesh>
        <ringGeometry args={[1.0, 3.6, 48, 8]} />
        <meshBasicMaterial
          color="#22D3EE"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Primary Orbit Ring */}
      <mesh>
        <torusGeometry args={[2.6, 0.025, 16, 80]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.65} />
      </mesh>

      {/* Central Star Core */}
      <mesh>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#F5F7FF" wireframe opacity={0.75} transparent />
      </mesh>
    </group>
  );
}

export function ResearchVisual() {
  return (
    <div className="w-full h-[220px] sm:h-[280px] relative pointer-events-none select-none my-4">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <OrbitalPlane />
      </Canvas>
    </div>
  );
}

export default ResearchVisual;
