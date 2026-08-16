'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WireframePlanet } from './WireframePlanet';
import { useUIStore } from '@/store/useUIStore';

function TwinklingStarfield({ count = 6000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const isWarping = useUIStore((state) => state.isWarping);

  const warpFactor = useRef(0);

  // Generate random positions, seeds, and sizes in a large sphere
  const [positions, seeds, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sds = new Float32Array(count);
    const szs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 20 + Math.random() * 35;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sds[i] = Math.random() * 100.0;
      szs[i] = 1.0 + Math.random() * 2.5;
    }
    return [pos, sds, szs];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWarp: { value: 0 },
      uColor: { value: new THREE.Color('#F5F7FF') },
      uCyan: { value: new THREE.Color('#22D3EE') },
    }),
    []
  );

  const vertexShader = `
    uniform float uTime;
    uniform float uWarp;
    attribute float aSeed;
    attribute float aSize;
    varying float vAlpha;
    varying float vWarp;

    void main() {
      vec3 pos = position;
      
      // Radial z-streak displacement during warp
      pos.z += uWarp * (sin(aSeed) * 8.0);
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      float twinkle = sin(uTime * 1.5 + aSeed) * 0.5 + 0.5;
      float baseSize = aSize * (0.7 + 0.6 * twinkle);
      
      // Expand point size into streak effect on warp
      gl_PointSize = (baseSize + uWarp * 4.5) * (300.0 / -mvPosition.z);
      
      vAlpha = 0.35 + 0.65 * twinkle + uWarp * 0.4;
      vWarp = uWarp;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    uniform vec3 uCyan;
    varying float vAlpha;
    varying float vWarp;

    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      
      float alpha = (1.0 - smoothstep(0.08, 0.5, dist)) * vAlpha;
      
      // Shift color more toward plasma cyan during warp
      vec3 starColor = mix(uCyan, uColor, smoothstep(0.0, 0.35, dist));
      vec3 finalCol = mix(starColor, uCyan, vWarp * 0.7);
      
      gl_FragColor = vec4(finalCol, alpha);
    }
  `;

  useFrame((_, delta) => {
    // Lerp warp factor
    const targetWarp = isWarping ? 1.0 : 0.0;
    warpFactor.current += (targetWarp - warpFactor.current) * delta * 8.0;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * (1.0 + warpFactor.current * 3.0);
      materialRef.current.uniforms.uWarp.value = warpFactor.current;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSeed"
          args={[seeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    const m = mouseRef.current;
    m.x += (m.targetX - m.x) * delta * 2.5;
    m.y += (m.targetY - m.y) * delta * 2.5;

    if (groupRef.current) {
      groupRef.current.rotation.y = m.x * 0.08;
      groupRef.current.rotation.x = -m.y * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <fogExp2 attach="fog" args={['#05060A', 0.035]} />
      <ambientLight intensity={0.5} />
      <TwinklingStarfield count={6000} />
      <WireframePlanet />
    </group>
  );
}

export function StarfieldCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-[#05060A]">
      <React.Suspense fallback={<div className="w-full h-full bg-[#05060A]" />}>
        <Canvas
          dpr={[1, 2]}
          frameloop="always"
          camera={{ position: [0, 0, 15], fov: 60 }}
          gl={{ antialias: true, alpha: false }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <SceneContent />
        </Canvas>
      </React.Suspense>
    </div>
  );
}

export default StarfieldCanvas;
