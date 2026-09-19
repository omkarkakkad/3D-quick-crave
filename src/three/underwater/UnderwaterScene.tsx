import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { worldPointer } from './worldPointer';
import { FishSchool } from './FishSchool';
import { InteractiveFish } from './InteractiveFish';
import { OceanParticles } from './OceanParticles';
import { LightRays } from './LightRays';
import { Seafloor, Seaweed } from './Seafloor';

const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
const SCATTER_R = 12;

function CameraRig() {
  const { camera, pointer, size } = useThree();
  const v = useRef(new THREE.Vector3());
  const near = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const aspect = size.width / size.height;
    const fov = (camera as THREE.PerspectiveCamera).fov;
    const halfH = Math.tan((fov * Math.PI) / 360) * camera.position.z;
    const halfW = halfH * aspect;

    // world cursor on the z=0 plane
    worldPointer.pos.set(pointer.x * halfW, pointer.y * halfH, 0);
    worldPointer.prev.copy(worldPointer.pos).add(worldPointer.delta);
    worldPointer.delta.copy(worldPointer.pos).sub(v.current);
    v.current.copy(worldPointer.pos);
    worldPointer.active = size.width > 0;

    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scrollFactor = Math.min(scrollY / window.innerHeight, 1);

    // camera target — gentle follow
    const tx = pointer.x * 1.4 + Math.sin(t * 0.12) * 0.3 + scrollFactor * 2.5;
    const ty = 0.15 + pointer.y * 0.9 + Math.cos(t * 0.1) * 0.25 - scrollFactor * 1.4;
    const tz = IS_MOBILE ? 9.5 : 8 + Math.sin(t * 0.05) * 0.2;

    camera.position.x += (tx - camera.position.x) * Math.min(delta * 1.6, 1);
    camera.position.y += (ty - camera.position.y) * Math.min(delta * 1.6, 1);
    camera.position.z += (tz - camera.position.z) * Math.min(delta * 0.6, 1);

    const lookX = -pointer.x * 0.5 + scrollFactor * 3;
    const lookY = 0.2 - pointer.y * 0.35 - scrollFactor * 1.6;
    near.current.set(lookX, lookY, -2);
    camera.lookAt(near.current);

    // subtle wave roll
    camera.rotation.z += Math.sin(t * 0.3) * delta * 0.08;
  });
  return null;
}

export function UnderwaterScene({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas
      frameloop={paused ? 'never' : 'always'}
      gl={{ antialias: !IS_MOBILE, alpha: true, powerPreference: 'high-performance' }}
      dpr={IS_MOBILE ? [1, 1.4] : [1, 1.8]}
      camera={{ position: [0, 0.15, 8], fov: 60, near: 0.1, far: 80 }}
      style={{ position: 'absolute', inset: 0 }}
      shadows
      flat
    >
      <color attach="background" args={['#03203f']} />
      <fog attach="fog" args={['#03203f', 4, 18]} />

      <ambientLight intensity={0.55} color="#9fc6e8" />
      <directionalLight position={[0, 6, 3]} intensity={1.1} color="#bcdcf5" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-5, -2, 4]} intensity={0.5} color="#35d6c4" />
      <hemisphereLight args={['#0b2f4e', '#0a3328', 0.9]} />

      <CameraRig />

      <LightRays count={IS_MOBILE ? 5 : 8} />
      <OceanParticles bubbles={IS_MOBILE ? 34 : 70} motes={IS_MOBILE ? 80 : 160} />
      <Seafloor />
      <Seaweed count={IS_MOBILE ? 6 : 10} />

      <FishSchool
        count={IS_MOBILE ? 60 : 150}
        center={[0.5, 1.6, 0]}
        spread={[SCATTER_R, 3.5, 6]}
        species="smallie"
        scale={0.5}
      />
      <FishSchool
        count={IS_MOBILE ? 24 : 55}
        center={[-3, -0.4, -3]}
        spread={[6, 2.2, 3]}
        species="silver"
        scale={0.42}
        opacity={0.85}
        fleeRadius={1.8}
      />

      <InteractiveFish species="surmai" anchor={[-4.6, 1.3, -1.5]} radius={1.8} scale={2.4} />
      <InteractiveFish species="pomfret" anchor={[4.2, 0.9, -1]} radius={1.6} scale={2.1} />
      <InteractiveFish species="bangda" anchor={[2.8, -0.9, -2.5]} radius={1.4} scale={1.7} />
      <InteractiveFish species="prawns" anchor={[-1.6, -1.8, -1.2]} radius={1.2} scale={0.75} />
      <InteractiveFish species="crab" anchor={[0.6, -2.7, 1.2]} radius={1.1} scale={1.9} />

      <UnderwaterSheen />
    </Canvas>
  );
}

function UnderwaterSheen() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
      const m = mesh.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 0.4) * 0.015;
    }
  });
  return (
    <mesh ref={mesh} position={[0, 2.2, -8]} rotation={[0.4, 0, 0]}>
      <planeGeometry args={[26, 12]} />
      <meshBasicMaterial color="#bcefec" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}