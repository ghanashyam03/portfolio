'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUIStore } from '@/store/useUIStore';

function DeepSpaceStarfield({ count = 8000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const isWarping = useUIStore((state) => state.isWarping);
  const warpFactor = useRef(0);

  // Generate random positions, seeds, sizes, and colors
  const [positions, seeds, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sds = new Float32Array(count);
    const szs = new Float32Array(count);
    const cols = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color('#F5F7FF'), // Starlight white
      new THREE.Color('#22D3EE'), // Plasma cyan
      new THREE.Color('#FCD34D'), // Solar gold
      new THREE.Color('#818CF8'), // Deep indigo
    ];

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 20 + Math.random() * 45;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sds[i] = Math.random() * 100.0;
      szs[i] = 0.5 + Math.random() * 1.5;

      const colorIndex =
        Math.random() < 0.65
          ? 0
          : Math.random() < 0.85
          ? 1
          : Math.random() < 0.95
          ? 2
          : 3;
      const col = colorPalette[colorIndex];
      cols[i * 3] = col.r;
      cols[i * 3 + 1] = col.g;
      cols[i * 3 + 2] = col.b;
    }
    return [pos, sds, szs, cols];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWarp: { value: 0 },
    }),
    []
  );

  const vertexShader = `
    uniform float uTime;
    uniform float uWarp;
    attribute float aSeed;
    attribute float aSize;
    attribute vec3 aColor;
    varying float vAlpha;
    varying vec3 vColor;

    void main() {
      vec3 pos = position;
      pos.z += uWarp * (sin(aSeed) * 3.0);
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      float twinkle = sin(uTime * 1.2 + aSeed) * 0.5 + 0.5;
      float baseSize = aSize * (0.8 + 0.4 * twinkle);
      
      // Fine pinpoint star scaling
      float calculatedSize = (baseSize + uWarp * 1.5) * (140.0 / -mvPosition.z);
      gl_PointSize = clamp(calculatedSize, 0.8, 3.2);
      
      vAlpha = 0.35 + 0.65 * twinkle;
      vColor = aColor;
    }
  `;

  const fragmentShader = `
    varying float vAlpha;
    varying vec3 vColor;

    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      
      float alpha = (1.0 - smoothstep(0.02, 0.5, dist)) * vAlpha;
      gl_FragColor = vec4(vColor, alpha);
    }
  `;

  useFrame((_, delta) => {
    const targetWarp = isWarping ? 1.0 : 0.0;
    warpFactor.current += (targetWarp - warpFactor.current) * delta * 6.0;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * (1.0 + warpFactor.current * 1.5);
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
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
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
    m.x += (m.targetX - m.x) * delta * 1.8;
    m.y += (m.targetY - m.y) * delta * 1.8;

    if (groupRef.current) {
      groupRef.current.rotation.y = m.x * 0.04;
      groupRef.current.rotation.x = -m.y * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <fogExp2 attach="fog" args={['#020305', 0.025]} />
      <DeepSpaceStarfield count={8000} />
    </group>
  );
}

export function StarfieldCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-[#020305]">
      {/* Subtle Cosmic Ambient Radial Glow Overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_35%,#1e1b4b_0%,transparent_50%),radial-gradient(circle_at_75%_65%,#311b92_0%,transparent_50%),radial-gradient(circle_at_50%_50%,#0891b2_0%,transparent_60%)] pointer-events-none" />

      <React.Suspense fallback={<div className="w-full h-full bg-[#020305]" />}>
        <Canvas
          dpr={[1, 2]}
          frameloop="always"
          camera={{ position: [0, 0, 15], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <SceneContent />
        </Canvas>
      </React.Suspense>
    </div>
  );
}

export default StarfieldCanvas;
