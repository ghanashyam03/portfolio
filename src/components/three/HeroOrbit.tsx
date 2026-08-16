'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function OrbitRing({
  radius,
  tiltX,
  tiltZ,
  speed,
  color,
  planetSize,
}: {
  radius: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
  color: string;
  planetSize: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    angleRef.current += delta * speed;
    if (planetRef.current) {
      planetRef.current.position.x = Math.cos(angleRef.current) * radius;
      planetRef.current.position.z = Math.sin(angleRef.current) * radius;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} rotation={[tiltX, 0, tiltZ]}>
      {/* Thin Torus Orbit Track */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.025, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} wireframe />
      </mesh>

      {/* Orbiting Planet */}
      <mesh ref={planetRef} position={[radius, 0, 0]}>
        <sphereGeometry args={[planetSize, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function HeroOrbitContent() {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#22D3EE" />

      {/* Central Glowing Emissive Plasma Cyan Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          color="#22D3EE"
          emissive="#22D3EE"
          emissiveIntensity={1.5}
          roughness={0.1}
          wireframe
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.85, 16, 16]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.85} />
      </mesh>

      {/* Orbit Ring 1 - Cyan */}
      <OrbitRing
        radius={2.4}
        tiltX={Math.PI / 6}
        tiltZ={Math.PI / 12}
        speed={0.7}
        color="#22D3EE"
        planetSize={0.2}
      />

      {/* Orbit Ring 2 - Nebula Purple */}
      <OrbitRing
        radius={3.6}
        tiltX={-Math.PI / 4}
        tiltZ={Math.PI / 8}
        speed={0.45}
        color="#7C3AED"
        planetSize={0.26}
      />

      {/* Orbit Ring 3 - Solar Orange */}
      <OrbitRing
        radius={4.8}
        tiltX={Math.PI / 3}
        tiltZ={-Math.PI / 6}
        speed={0.3}
        color="#FB923C"
        planetSize={0.24}
      />
    </group>
  );
}

export function HeroOrbit() {
  return (
    <div className="w-full h-[340px] sm:h-[440px] lg:h-[540px] relative pointer-events-none select-none flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <HeroOrbitContent />
      </Canvas>
    </div>
  );
}

export default HeroOrbit;
