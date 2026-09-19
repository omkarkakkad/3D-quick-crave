import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createCausticTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#030b18';
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 24 + Math.random() * 60;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    const a = 0.05 + Math.random() * 0.12;
    grad.addColorStop(0, `rgba(116, 232, 224, ${a})`);
    grad.addColorStop(0.7, `rgba(53, 214, 196, ${a * 0.5})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.5 + Math.random() * 0.6), Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 4);
  return tex;
}

export function Seafloor() {
  const caustic = useMemo(createCausticTexture, []);
  const causticRef = useRef<THREE.Mesh>(null);
  const wavesRef = useRef<THREE.Mesh>(null);

  const rocks = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 16,
        -3.15,
        -3 + Math.random() * 8 - Math.random() * 6
      ] as [number, number, number],
      scale: 0.25 + Math.random() * 0.8,
      rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number]
    }));
  }, []);

  const rockColors = ['#0c1d33', '#0a1830', '#0e2238', '#0d1f36'];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (causticRef.current) {
      causticRef.current.position.x = Math.sin(t * 0.05) * 1.2;
      if (causticRef.current.material instanceof THREE.MeshBasicMaterial) {
        causticRef.current.material.opacity = 0.5 + Math.sin(t * 0.3) * 0.12;
      }
    }
    if (wavesRef.current) {
      wavesRef.current.position.y = -2.85 + Math.sin(t * 0.8) * 0.04;
    }
  });

  return (
    <group>
      {/* sandy seafloor */}
      <mesh position={[0, -3.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60, 1, 1]} />
        <meshStandardMaterial color="#123a33" roughness={0.95} metalness={0} />
      </mesh>
      {/* caustic light layer */}
      <mesh ref={causticRef} position={[0, -3.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60, 1, 1]} />
        <meshBasicMaterial map={caustic} transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* rocks */}
      {rocks.map((r, i) => (
        <mesh key={i} position={r.pos} scale={r.scale} rotation={r.rot} receiveShadow castShadow>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color={rockColors[i % rockColors.length]} roughness={0.9} flatShading />
        </mesh>
      ))}

      {/* distant rock wall */}
      <mesh position={[-10.5, 0.5, 0]} rotation={[0, 2.3, 0]}>
        <dodecahedronGeometry args={[5, 1]} />
        <meshStandardMaterial color="#06101f" roughness={1} flatShading />
      </mesh>
      <mesh position={[11, 1.6, 2]} rotation={[0, -2.1, 0]}>
        <dodecahedronGeometry args={[6, 1]} />
        <meshStandardMaterial color="#081626" roughness={1} flatShading />
      </mesh>

      {/* surface shimmer plane */}
      <mesh ref={wavesRef} position={[0, 3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#0b2f4e" transparent opacity={0.55} roughness={0.4} metalness={0.4} depthWrite={false} />
      </mesh>
    </group>
  );
}

interface SeaweedProps {
  count?: number;
}

export function Seaweed({ count = 8 }: SeaweedProps) {
  const group = useRef<THREE.Group>(null);

  const blades = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      pos: [-8 + Math.random() * 16, -3.2, -2.5 + Math.random() * 5] as [number, number, number],
      h: 1.4 + Math.random() * 2.2,
      speed: 0.8 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      tilt: (Math.random() - 0.5) * 0.6
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    blades.forEach((b, i) => {
      const blade = g.children[i];
      if (!blade) return;
      // sway the base
      blade.rotation.z = b.tilt + Math.sin(t * b.speed + b.phase) * 0.3;
      blade.rotation.x = Math.sin(t * b.speed * 0.7 + b.phase) * 0.12;
    });
  });

  return (
    <group ref={group}>
      {blades.map((b, i) => (
        <group key={i} position={b.pos}>
          <mesh position={[0, b.h / 2, 0]}>
            <cylinderGeometry args={[0.03, 0.06, b.h, 6]} />
            <meshStandardMaterial color="#0f4a3a" roughness={0.8} />
          </mesh>
          <mesh position={[0, b.h * 0.86, 0]}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshStandardMaterial color="#137a52" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}