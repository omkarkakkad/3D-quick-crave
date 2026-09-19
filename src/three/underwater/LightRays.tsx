import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LightRaysProps {
  count?: number;
}

export function LightRays({ count = 7 }: LightRaysProps) {
  const group = useRef<THREE.Group>(null);

  const rays = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      pos: [-9 + Math.random() * 18, 2, -1 + Math.random() * 3] as [number, number, number],
      width: 0.5 + Math.random() * 0.7,
      depth: 5 + Math.random() * 4,
      rot: (Math.random() - 0.5) * 0.7,
      opacity: 0.045 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2
    }));
  }, [count]);

  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#bfe8e4',
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    mat.opacity = 0.06 + Math.sin(t * 0.4) * 0.02;
    g?.children.forEach((child, i) => {
      const r = rays[i];
      if (!r) return;
      child.rotation.z = r.rot + Math.sin(t * 0.2 + r.phase) * 0.05;
    });
  });

  return (
    <group ref={group}>
      {rays.map((r, i) => (
        <mesh
          key={i}
          position={r.pos}
          rotation={[0.15, r.rot, 0.2 + r.rot * 0.3]}
          material={mat}
        >
          <boxGeometry args={[r.width, 9, r.depth]} />
        </mesh>
      ))}
      {/* volumetric floor glow */}
      {rays.map((r, i) => (
        <mesh key={`g${i}`} position={[r.pos[0], -3.05, r.pos[2]]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[r.width * 1.6, 20]} />
          <meshBasicMaterial color="#7fdcd4" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}