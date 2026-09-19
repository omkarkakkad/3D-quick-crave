import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FishModel } from './FishModel';
import { worldPointer } from './worldPointer';

interface SchoolMember {
  offset: THREE.Vector3;
  speed: number;
  phase: number;
  wanderSeed: number;
}

interface FishSchoolProps {
  count?: number;
  center?: [number, number, number];
  spread?: [number, number, number];
  species?: string;
  scale?: number;
  opacity?: number;
  fleeRadius?: number;
}

export function FishSchool({
  count = 120,
  center = [0, 1, 0],
  spread = [10, 3.5, 6],
  species = 'smallie',
  scale = 0.55,
  opacity = 0.9,
  fleeRadius = 2.4
}: FishSchoolProps) {
  const group = useRef<THREE.Group>(null);

  const members = useMemo<SchoolMember[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      offset: new THREE.Vector3(
        (Math.random() - 0.5) * spread[0],
        (Math.random() - 0.5) * spread[1],
        (Math.random() - 0.5) * spread[2]
      ),
      speed: 0.5 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      wanderSeed: Math.random() * 10
    }));
  }, [count, spread]);

  const dir = useRef(new THREE.Vector3(1, 0, 0));
  const temp = useMemo(() => new THREE.Vector3(), []);
  const toCursor = useMemo(() => new THREE.Vector3(), []);
  const arr = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const p = state.pointer;
    const targetDir = temp
      .set(p.x * 2.5, p.y * 1.2, 0)
      .normalize()
      .add(new THREE.Vector3(0.4, 0.15, 0));
    dir.current.lerp(targetDir.normalize(), delta * 0.4).normalize();

    const t = state.clock.elapsedTime;

    members.forEach((m, i) => {
      const child = g.children[i] as THREE.Group;
      if (!child) return;
      const speed = m.speed * 0.9;

      // drift with current
      m.offset.x += Math.sin(t * 0.4 + m.phase) * delta * 0.5;
      m.offset.y += Math.sin(t * 0.9 + m.phase * 2) * delta * 0.35;
      m.offset.z += Math.cos(t * 0.5 + m.phase) * delta * 0.3;

      // flee from cursor
      toCursor.copy(worldPointer.pos).sub(m.offset);
      const dist = toCursor.length();
      if (dist < fleeRadius && worldPointer.active) {
        const lerp = (1 - dist / fleeRadius) * 0.6;
        m.offset.add(toCursor.normalize().multiplyScalar(lerp * delta * 8));
      }

      // clamp around center
      const dx = m.offset.x - center[0];
      const dz = m.offset.z - center[2];
      const distFromCenter = Math.sqrt(dx * dx + dz * dz);
      if (distFromCenter > spread[0] / 2) {
        m.offset.x -= dx * delta * 0.5;
        m.offset.z -= dz * delta * 0.5;
      }
      m.offset.y = THREE.MathUtils.clamp(m.offset.y, center[1] - spread[1] / 2, center[1] + spread[1] / 2);

      arr.set(m.offset.x, m.offset.y, m.offset.z);
      child.position.copy(arr);

      // alignment to school direction + personal wander
      const ang =
        Math.atan2(
          dir.current.y * 0.4 + Math.sin(t * 0.7 + m.phase) * 0.35,
          dir.current.x * 0.4 + Math.cos(t * 0.6 + m.wanderSeed) * 0.3
        ) - Math.PI / 2;
      child.rotation.set(Math.sin(t * 0.8 + m.wanderSeed) * 0.12, ang, Math.sin(t * 1.1 + m.wanderSeed) * 0.15);
      const bob = Math.sin(t * 1.4 + m.phase) * 0.03;
      child.scale.setScalar(scale * (0.85 + bob * 5 + (i % 5) * 0.05));

      void speed;
    });

    // school drifts with cursor
    g.position.x += (p.x * 1.6 - g.position.x * 0.3) * delta * 0.25;
    g.position.y += (p.y * 0.9 - g.position.y * 0.3) * delta * 0.25;
  });

  return (
    <group ref={group} position={center}>
      {members.map((m, i) => (
        <group key={i} position={m.offset.toArray()}>
          <FishModel species={species} scale={scale} opacity={opacity} seed={i} />
        </group>
      ))}
    </group>
  );
}