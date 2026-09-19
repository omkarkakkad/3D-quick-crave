import { useRef, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FishModel } from '../three/underwater/FishModel';
import { SectionTitle } from '../components/ui/SectionTitle';
import { GlGuard } from '../components/ui/GlGuard';
import { usePausableCanvas } from '../lib/usePausableCanvas';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';

const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

function Plate() {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[2.3, 2.0, 0.22, 48]} />
        <meshStandardMaterial color="#f2ead9" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[1.85, 1.85, 0.1, 48]} />
        <meshStandardMaterial color="#dcd2bd" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.04, 48]} />
        <meshStandardMaterial color="#c8bba2" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Ingredient({
  position,
  kind,
  glowRef,
  floatSpeed = 1
}: {
  position: [number, number, number];
  kind: 'lemon' | 'chilli-green' | 'chilli-red' | 'coriander' | 'coconut' | 'spice' | 'curryleaf' | 'kokum';
  glowRef?: RefObject<number>;
  floatSpeed?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  const shapes = () => {
    switch (kind) {
      case 'lemon':
        return (
          <group>
            <mesh scale={[0.34, 0.32, 0.34]}>
              <sphereGeometry args={[1, 18, 18]} />
              <meshStandardMaterial ref={matRef} color="#f0d954" roughness={0.3} metalness={0} emissive="#f6e27a" emissiveIntensity={0} />
            </mesh>
            <mesh position={[0, 0.34, 0]} rotation={[0, 0, 0]}>
              <sphereGeometry args={[0.02, 8, 8]} />
            </mesh>
          </group>
        );
      case 'chilli-green':
        return (
          <mesh rotation={[0.3, 0.4, 0.6]} scale={[0.1, 0.6, 0.1]}>
            <cylinderGeometry args={[0.16, 0.28, 1, 8]} />
            <meshStandardMaterial ref={matRef} color="#3f9b56" roughness={0.4} emissive="#4fce77" emissiveIntensity={0} />
          </mesh>
        );
      case 'chilli-red':
        return (
          <mesh rotation={[-0.2, -0.5, 0.3]} scale={[0.1, 0.6, 0.1]}>
            <cylinderGeometry args={[0.14, 0.26, 1, 8]} />
            <meshStandardMaterial ref={matRef} color="#c73e28" roughness={0.35} emissive="#ff5e3a" emissiveIntensity={0} />
          </mesh>
        );
      case 'coriander': {
        const positions: [number, number, number][] = [
          [0, 0, 0],
          [0.18, 0.08, 0],
          [-0.16, 0.06, 0.05],
          [0.05, 0.16, -0.04]
        ];
        return (
          <group>
            {positions.map((p, i) => (
              <mesh key={i} position={p} scale={[0.7, 0.3, 0.5]}>
                <sphereGeometry args={[0.16, 8, 6]} />
                <meshStandardMaterial ref={matRef} color="#3d8f4e" roughness={0.3} emissive="#57c973" emissiveIntensity={0} />
              </mesh>
            ))}
          </group>
        );
      }
      case 'coconut':
        return (
          <group rotation={[0.5, 0.2, -0.2]}>
            <mesh scale={[0.55, 0.5, 0.55]}>
              <sphereGeometry args={[1, 18, 18]} />
              <meshStandardMaterial ref={matRef} color="#7a5230" roughness={0.7} emissive="#a06a38" emissiveIntensity={0} />
            </mesh>
            <mesh scale={[0.34, 0.18, 0.34]} position={[0, 0.5, 0]} rotation={[0.4, 0, 0]}>
              <sphereGeometry args={[1, 12, 12]} />
              <meshStandardMaterial color="#96663a" roughness={0.6} />
            </mesh>
          </group>
        );
      case 'spice': {
        const pts: [number, number, number][] = [
          [0, 0, 0],
          [0.14, 0.05, 0.09],
          [-0.11, 0.08, 0.12],
          [0.05, -0.06, -0.14]
        ];
        return (
          <group>
            {pts.map((p, i) => (
              <mesh key={i} position={p}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshStandardMaterial ref={matRef} color="#2b1a12" roughness={0.9} emissive="#7a4a2a" emissiveIntensity={0} />
              </mesh>
            ))}
          </group>
        );
      }
      case 'curryleaf':
        return (
          <group rotation={[0.4, 0.2, -0.3]}>
            {[0, 1, 2].map((i) => (
              <mesh key={i} position={[i * 0.16, -(i % 2) * 0.06, (i % 3) * 0.04]} scale={[0.16, 0.42, 0.1]}>
                <sphereGeometry args={[0.5, 8, 6]} />
                <meshStandardMaterial ref={matRef} color="#2e6e3f" roughness={0.35} emissive="#3f9a55" emissiveIntensity={0} />
              </mesh>
            ))}
          </group>
        );
      case 'kokum':
        return (
          <group>
            {[0, 1].map((i) => (
              <mesh key={i} position={[i * 0.16, 0, (i % 2) * 0.1]} scale={[0.18, 0.26, 0.18]}>
                <sphereGeometry args={[1, 12, 12]} />
                <meshStandardMaterial ref={matRef} color="#8e2740" roughness={0.5} emissive="#c73e58" emissiveIntensity={0} />
              </mesh>
            ))}
          </group>
        );
    }
  };

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    g.position.y = position[1] + Math.sin(t * floatSpeed + position[0]) * 0.14;
    g.rotation.x = Math.sin(t * floatSpeed * 0.6 + position[2]) * 0.25;
    g.rotation.y += delta * 0.5;
    g.rotation.y += state.pointer.x * delta * 0.8;
    if (matRef.current && glowRef?.current) {
      const target = glowRef.current > 0;
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(matRef.current.emissiveIntensity, target ? 0.6 : 0, delta * 3);
    }
  });

  return (
    <group ref={group} position={position}>
      {shapes()}
    </group>
  );
}

function DishScene() {
  const glow = useRef(0);
  const plateGroup = useRef<THREE.Group>(null);
  const curryRef = useRef<THREE.Mesh>(null);
  const { camera, pointer } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // plate rotation: auto + pointer
    if (plateGroup.current) {
      plateGroup.current.rotation.y += delta * 0.25 + pointer.x * delta * 1.2;
      plateGroup.current.rotation.x = THREE.MathUtils.lerp(plateGroup.current.rotation.x, -pointer.y * 0.18, delta * 2);
    }
    // camera subtle angle
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.2, delta * 1.5);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.4 - pointer.y * 0.8, delta * 1.5);
    camera.lookAt(0, 0.2, 0);
    if (curryRef.current) {
      curryRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} color="#ffe8d0" />
      <directionalLight position={[4, 6, 4]} intensity={2.2} color="#fff3e0" castShadow />
      <directionalLight position={[-5, 2, -2]} intensity={0.9} color="#35d6c4" />
      <pointLight position={[0, 2.5, 3]} intensity={6} distance={12} color="#ffc07a" />
      <spotLight position={[0, 6, 0]} angle={0.6} penumbra={0.7} intensity={3} color="#fff6e8" castShadow />

      <group
        ref={plateGroup}
        position={[0, -1.1, 0]}
        onPointerOver={() => (glow.current = 1)}
        onPointerOut={() => (glow.current = 0)}
      >
        <Plate />
        {/* the fish on the plate */}
        <group position={[0.3, 0.32, 0]} rotation={[Math.PI / 2, 0, 0.2]} scale={[1.7, 1.7, 1.7]}>
          <FishModel species="pomfret" scale={1} />
        </group>
        {/* curry kadai beside */}
        <group position={[-2.6, 0.32, 0.4]}>
          <mesh ref={curryRef} castShadow>
            <cylinderGeometry args={[1.1, 0.85, 1.1, 28]} />
            <meshStandardMaterial color="#2c1a12" roughness={0.6} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.56, 0]}>
            <cylinderGeometry args={[0.98, 0.98, 0.08, 28]} />
            <meshStandardMaterial color="#9c4a1e" roughness={0.7} />
          </mesh>
          <mesh position={[0.2, 0.62, 0.1]}>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshStandardMaterial color="#e8a758" roughness={0.8} />
          </mesh>
          <mesh position={[-0.1, 0.68, -0.15]}>
            <sphereGeometry args={[0.16, 10, 10]} />
            <meshStandardMaterial color="#e8a758" roughness={0.8} />
          </mesh>
        </group>
        {/* garnishes on plate */}
        <Ingredient kind="lemon" position={[1.2, 0.4, 1]} floatSpeed={1.2} glowRef={glow} />
        <Ingredient kind="curryleaf" position={[1.7, 0.4, -0.6]} floatSpeed={1.5} glowRef={glow} />
        <Ingredient kind="chilli-green" position={[1.45, 0.42, 0.3]} floatSpeed={1.1} glowRef={glow} />
        <Ingredient kind="spice" position={[0.9, 0.42, -1.25]} floatSpeed={1.3} glowRef={glow} />
      </group>

      {/* floating ingredients */}
      <Ingredient kind="coconut" position={[-3.4, 0.2, -1.4]} floatSpeed={0.9} glowRef={glow} />
      <Ingredient kind="chilli-red" position={[3.2, 0.8, -1.2]} floatSpeed={1.4} glowRef={glow} />
      <Ingredient kind="kokum" position={[-3.6, 0.4, 1.1]} floatSpeed={1.2} glowRef={glow} />
      <Ingredient kind="coriander" position={[3.1, 0.5, 0]} floatSpeed={1.3} glowRef={glow} />
      <Ingredient kind="curryleaf" position={[-2.9, 0.9, -0.6]} floatSpeed={1.5} glowRef={glow} />

      {/* steam/glow */}
      <mesh position={[-2.6, 2, 0.4]}>
        <sphereGeometry args={[0.7, 12, 12]} />
        <meshBasicMaterial color="#ffd9a0" transparent opacity={0.08} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function SignatureDish() {
  const zoom = useRef(1);
  const { ref: canvasWrap, paused } = usePausableCanvas();
  const lang = useStore((s) => s.lang);
  const onWheel = (e: React.WheelEvent) => {
    zoom.current = THREE.MathUtils.clamp(zoom.current - e.deltaY * 0.0012, 0.72, 1.5);
  };

  return (
    <section id="signature" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 section-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, #0a1c38 0%, #020b1a 70%)' }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          kicker={t['signature.kicker'][lang]}
          title={t['signature.title'][lang]}
        />
        <p className="text-center text-seafoam/60 text-sm md:text-base max-w-xl mx-auto mt-5">
          {t['signature.desc'][lang]}
        </p>

        <div className="relative h-[68vh] md:h-[78vh] mt-6" onWheel={onWheel}>
          <div ref={canvasWrap} className="absolute inset-0 section-bg">
            <GlGuard>
              <Canvas
                frameloop={paused ? 'never' : 'always'}
                dpr={IS_MOBILE ? [1, 1.5] : [1, 1.8]}
                shadows
                camera={{ position: [0, 1.6, 8.5], fov: 42 }}
                style={{ position: 'absolute', inset: 0 }}
                flat
              >
                <ZoomRig zoomRef={zoom} />
                <DishScene />
              </Canvas>
            </GlGuard>
          </div>

          {/* hover hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
            <span className="text-[10px] tracking-[0.3em] uppercase text-seafoam/40">{t['signature.hint'][lang]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ZoomRig({ zoomRef }: { zoomRef: RefObject<number> }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const targetZ = 8.5 * (zoomRef.current ?? 1);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, Math.min(delta * 3, 1));
    camera.lookAt(0, 0.2, 0);
  });
  return null;
}