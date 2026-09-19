import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FishModel } from './FishModel';
import { worldPointer } from './worldPointer';
import { useStore } from '../../store/useStore';

interface InteractiveFishProps {
  species: string;
  anchor: [number, number, number];
  radius?: number;
  scale?: number;
  labelDistance?: number;
  fleeDistance?: number;
}

function lerpAngle(a: number, b: number, t: number): number {
  let d = b - a;
  d = Math.atan2(Math.sin(d), Math.cos(d));
  return a + d * Math.min(Math.max(t, 0), 1);
}

export function InteractiveFish({
  species,
  anchor,
  radius = 2.2,
  scale = 1.5,
  labelDistance = 2.6,
  fleeDistance = 1.4
}: InteractiveFishProps) {
  const group = useRef<THREE.Group>(null);
  const angle = useRef(Math.random() * Math.PI * 2);
  const activeRef = useRef(false);
  const yawRef = useRef(Math.random() * Math.PI * 2);
  const base = useMemo(() => new THREE.Vector3(...anchor), [anchor]);
  const toCursor = useMemo(() => new THREE.Vector3(), []);
  const world = useMemo(() => new THREE.Vector3(), []);
  const vel = useMemo(() => new THREE.Vector3((Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.16, (Math.random() - 0.5) * 0.3), []);
  const setActiveFish = useStore((s) => s.setActiveFish);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    const prev = g.position.clone();

    // patrol orbit around anchor with bob
    angle.current += delta * 0.22;
    const ox = Math.cos(angle.current) * radius;
    const oz = Math.sin(angle.current * 0.7) * radius * 0.6;
    const target = base
      .clone()
      .add(new THREE.Vector3(ox, Math.sin(t * 0.6 + angle.current) * 0.7, oz));

    // cursor interaction
    world.copy(worldPointer.pos);
    const dist = world.distanceTo(target);

    if (worldPointer.active) {
      if (dist < fleeDistance) {
        toCursor.copy(target).sub(world).normalize();
        target.add(toCursor.multiplyScalar((1 - dist / fleeDistance) * 1.8 * delta));
      }
    }

    // smooth position toward target with gentle personal drift
    g.position.lerp(target, Math.min(delta * 1.5, 1));
    g.position.addScaledVector(vel, delta);

    // intended heading — follow actual motion, or softly face the cursor
    const mv = g.position.clone().sub(prev);
    let desire = yawRef.current;
    if (mv.lengthSq() > 2e-4) {
      desire = Math.atan2(-mv.x, -mv.z);
    }
    if (worldPointer.active && dist >= fleeDistance && dist < labelDistance + 0.9) {
      const dirTo = world.clone().sub(g.position).normalize();
      desire = Math.atan2(-dirTo.x, -dirTo.z);
    }
    yawRef.current = lerpAngle(yawRef.current, desire, Math.min(delta * 4, 1));
    const yawErr = Math.atan2(Math.sin(yawRef.current - g.rotation.y), Math.cos(yawRef.current - g.rotation.y));
    g.rotation.y = lerpAngle(g.rotation.y, yawRef.current, Math.min(delta * 4, 1));

    // bank into turns + faint roll
    const bank = THREE.MathUtils.clamp(yawErr * 0.6, -0.55, 0.55);
    g.rotation.z = bank * (1 - Math.abs(yawErr) * 0.3) + Math.sin(t * 0.8 + angle.current) * 0.04;

    // label proximity
    const camDist = state.camera.position.distanceTo(g.position);
    const close = dist < labelDistance && worldPointer.active && camDist < 9;
    if (close && !activeRef.current) {
      activeRef.current = true;
      setActiveFish(species);
    } else if (!close && activeRef.current) {
      activeRef.current = false;
      setActiveFish(null);
    }

    // tail wag via subtle scale pulse
    const s = scale * (1 + Math.sin(t * 3 + angle.current * 4) * 0.03);
    g.scale.set(s, s, s);

    // keep velocity from growing wildly
    vel.multiplyScalar(0.99);
    vel.x += (Math.random() - 0.5) * 0.01;
    vel.y += (Math.random() - 0.5) * 0.008;
    vel.z += (Math.random() - 0.5) * 0.01;
  });

  return (
    <group ref={group} position={anchor}>
      <FishModel species={species} scale={scale} />
    </group>
  );
}