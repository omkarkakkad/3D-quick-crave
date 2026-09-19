import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BubbleSpec {
  offset: THREE.Vector3;
  speed: number;
  size: number;
  phase: number;
}

interface OceanParticlesProps {
  bubbles?: number;
  motes?: number;
  drift?: number;
}

export function OceanParticles({ bubbles = 60, motes = 150, drift = 0.5 }: OceanParticlesProps) {
  const bubbleGroup = useRef<THREE.Group>(null);
  const moteGroup = useRef<THREE.Group>(null);

  const bubbleSpecs = useMemo<BubbleSpec[]>(() => {
    return Array.from({ length: bubbles }, () => ({
      offset: new THREE.Vector3((Math.random() - 0.5) * 22, Math.random() * 6 - 3.5, (Math.random() - 0.5) * 12),
      speed: 0.25 + Math.random() * 0.6,
      size: 0.02 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2
    }));
  }, [bubbles]);

  const moteSpecs = useMemo<{ offset: THREE.Vector3; phase: number }[]>(() => {
    return Array.from({ length: motes }, () => ({
      offset: new THREE.Vector3((Math.random() - 0.5) * 24, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 14),
      phase: Math.random() * Math.PI * 2
    }));
  }, [motes]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const bg = bubbleGroup.current;
    const mg = moteGroup.current;
    if (bg) {
      bubbleSpecs.forEach((b, i) => {
        const c = bg.children[i];
        if (!c) return;
        b.offset.y += b.speed * delta;
        b.offset.x += Math.sin(t * 0.7 + b.phase) * delta * drift * 0.4;
        if (b.offset.y > 3.6) b.offset.y = -3.4;
        c.position.copy(b.offset);
        c.scale.setScalar(b.size * (1 + Math.sin(t * 2 + b.phase) * 0.25));
      });
    }
    if (mg) {
      moteSpecs.forEach((m, i) => {
        const c = mg.children[i];
        if (!c) return;
        m.offset.x += Math.sin(t * 0.15 + m.phase) * delta * drift * 0.25;
        m.offset.y += Math.cos(t * 0.11 + m.phase) * delta * drift * 0.22;
        c.position.copy(m.offset);
      });
    }
  });

  return (
    <>
      <group ref={bubbleGroup}>
        {bubbleSpecs.map((b, i) => (
          <mesh key={i} position={b.offset.toArray()} scale={b.size}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshStandardMaterial
              color="#9fe8e0"
              transparent
              opacity={0.18}
              roughness={0.1}
              metalness={0.9}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
      <group ref={moteGroup}>
        {moteSpecs.map((m, i) => (
          <mesh key={i} position={m.offset.toArray()}>
            <sphereGeometry args={[0.011, 5, 5]} />
            <meshBasicMaterial color="#7fe8dc" transparent opacity={0.35} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </>
  );
}