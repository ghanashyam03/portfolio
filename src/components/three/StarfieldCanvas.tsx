'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUIStore } from '@/store/useUIStore';

function InteractiveStarfield({ count = 8000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const isWarping = useUIStore((state) => state.isWarping);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rippleRef = useRef({ time: 100, x: 0, y: 0 });

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
      const r = 18 + Math.random() * 45;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sds[i] = Math.random() * 100.0;
      szs[i] = 0.6 + Math.random() * 1.5;

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
      uMouse: { value: new THREE.Vector2(0, 0) },
      uRipple: { value: new THREE.Vector3(0, 0, 100) },
    }),
    []
  );

  const vertexShader = `
    uniform float uTime;
    uniform float uWarp;
    uniform vec2 uMouse;
    uniform vec3 uRipple; // x, y, timeSinceClick
    attribute float aSeed;
    attribute float aSize;
    attribute vec3 aColor;
    varying float vAlpha;
    varying vec3 vColor;

    void main() {
      vec3 pos = position;
      
      // Mouse Proximity Displacement
      vec2 normPos = pos.xy / 20.0;
      float distToMouse = length(normPos - uMouse);
      if (distToMouse < 2.5) {
        float force = (2.5 - distToMouse) * 0.4;
        vec2 dir = normalize(normPos - uMouse + vec2(0.001));
        pos.xy += dir * force;
      }

      // Gravitational Wave Ripple Physics on Click
      float rippleTime = uRipple.z;
      if (rippleTime < 3.0) {
        float rDist = length(pos.xy - uRipple.xy * 15.0);
        float waveRadius = rippleTime * 12.0;
        float waveDelta = abs(rDist - waveRadius);
        if (waveDelta < 3.0) {
          float waveForce = (3.0 - waveDelta) * sin(rippleTime * 10.0) * 0.3;
          pos.z += waveForce;
        }
      }
      
      pos.z += uWarp * (sin(aSeed) * 3.0);
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      float twinkle = sin(uTime * 1.2 + aSeed) * 0.5 + 0.5;
      float baseSize = aSize * (0.8 + 0.4 * twinkle);
      
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleClick = (e: MouseEvent) => {
      rippleRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      rippleRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      rippleRef.current.time = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useFrame((_, delta) => {
    const m = mouseRef.current;
    m.x += (m.targetX - m.x) * delta * 4.0;
    m.y += (m.targetY - m.y) * delta * 4.0;

    rippleRef.current.time += delta;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uWarp.value = isWarping ? 1.0 : 0.0;
      materialRef.current.uniforms.uMouse.value.set(m.x, m.y);
      materialRef.current.uniforms.uRipple.value.set(
        rippleRef.current.x,
        rippleRef.current.y,
        rippleRef.current.time
      );
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

function DistantCelestialGrid() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
      meshRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -22]}>
      <sphereGeometry args={[16, 24, 24]} />
      <meshBasicMaterial
        color="#7C3AED"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
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
    m.x += (m.targetX - m.x) * delta * 1.5;
    m.y += (m.targetY - m.y) * delta * 1.5;

    if (groupRef.current) {
      groupRef.current.rotation.y = m.x * 0.03;
      groupRef.current.rotation.x = -m.y * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <fogExp2 attach="fog" args={['#020305', 0.022]} />
      <InteractiveStarfield count={8000} />
      <DistantCelestialGrid />
    </group>
  );
}

export function StarfieldCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-[#020305]">
      {/* Ambient Cosmic Radial Nebula Overlay */}
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
