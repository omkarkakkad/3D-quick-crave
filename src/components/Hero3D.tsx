import { useRef, useEffect, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown } from 'lucide-react';
import { useStore, SIGNATURE_FLAVORS } from '../store/useStore';
import { useT } from '../i18n/useT';
import {
  SunburstRays,
  RedMonsterDoodle,
  BlueDancerDoodle,
  HibiscusDoodle,
  BlackberryDoodle,
  RocketShipDoodle,
  SliceCitrusDoodle,
  ArchCloudWindow,
  BotanicalLeavesFlower,
  SparkleStar,
  BubbleRing
} from './ManaDoodles';

// Floating Coastal Garnishes around the 3D scene
function FloatingGarnish({
  kind,
  position,
  scale = 1,
  rotation = [0, 0, 0]
}: {
  kind: 'lemon' | 'chilli-green' | 'chilli-red' | 'kokum' | 'curryleaf';
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {kind === 'lemon' && (
        <group>
          {/* Half lemon slice wedge */}
          <mesh scale={[0.34, 0.16, 0.34]}>
            <sphereGeometry args={[1, 16, 16, 0, Math.PI]} />
            <meshStandardMaterial color="#FACC15" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.02]} scale={[0.3, 0.12, 0.3]}>
            <circleGeometry args={[1, 16]} />
            <meshStandardMaterial color="#FEF08A" roughness={0.4} />
          </mesh>
        </group>
      )}

      {kind === 'chilli-green' && (
        <mesh rotation={[0.4, 0.2, 0.5]} scale={[0.07, 0.45, 0.07]}>
          <cylinderGeometry args={[0.1, 0.2, 1, 8]} />
          <meshStandardMaterial color="#16A34A" roughness={0.35} />
        </mesh>
      )}

      {kind === 'chilli-red' && (
        <mesh rotation={[-0.3, 0.5, -0.4]} scale={[0.07, 0.5, 0.07]}>
          <cylinderGeometry args={[0.09, 0.2, 1, 8]} />
          <meshStandardMaterial color="#DC2626" roughness={0.3} />
        </mesh>
      )}

      {kind === 'kokum' && (
        <mesh scale={[0.16, 0.12, 0.16]}>
          <sphereGeometry args={[1, 12, 10]} />
          <meshStandardMaterial color="#881337" roughness={0.5} />
        </mesh>
      )}

      {kind === 'curryleaf' && (
        <mesh rotation={[0.2, 0, 0.3]} scale={[0.14, 0.35, 0.03]}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color="#15803D" roughness={0.4} />
        </mesh>
      )}
    </group>
  );
}

// Golden Sizzling Particle Embers around the Fish Platter
function SizzleParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const count = 45;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 0.8 + Math.random() * 1.6;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = -0.4 + Math.random() * 1.2;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return [pos];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FDE047"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3D GLTF Barramundi Fish Catch on Cast-Iron Coastal Platter (varies per dish)
function BarramundiCatchModel({ dishImage, flavorKey }: { dishImage: string; flavorKey: string }) {
  const { scene } = useGLTF('/models/barramundi.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group>(null);

  // Per-dish platter & garnish config
  const dishConfig = useMemo(() => {
    switch (flavorKey) {
      case 'surmai':
        return {
          platterColor: '#2C1810',
          platterRim: '#B8860B',
          rimText: 'QUICK CRAVE  ·  SURMAI FRY  ·  MALVANI COASTAL KITCHEN  ·  ',
          leafColor: '#1B5E20',
          garnishes: [
            { kind: 'lemon' as const, pos: [1.15, -0.12, 0.45] as [number, number, number], scale: 0.75 },
            { kind: 'lemon' as const, pos: [-1.15, -0.12, -0.4] as [number, number, number], scale: 0.65 },
            { kind: 'chilli-red' as const, pos: [1.2, -0.1, -0.5] as [number, number, number], scale: 0.75 },
            { kind: 'chilli-green' as const, pos: [-1.2, -0.1, 0.5] as [number, number, number], scale: 0.7 },
            { kind: 'curryleaf' as const, pos: [-0.85, -0.15, 0.95] as [number, number, number], scale: 0.8 },
            { kind: 'kokum' as const, pos: [0, -0.16, 1.15] as [number, number, number], scale: 0.8 },
          ],
        };
      case 'pomfret':
        return {
          platterColor: '#1A1A2E',
          platterRim: '#C9A84C',
          rimText: 'QUICK CRAVE  ·  POMFRET FRY  ·  MALVANI COASTAL KITCHEN  ·  ',
          leafColor: '#2E7D32',
          garnishes: [
            { kind: 'lemon' as const, pos: [1.1, -0.12, 0.55] as [number, number, number], scale: 0.7 },
            { kind: 'chilli-green' as const, pos: [1.2, -0.1, -0.35] as [number, number, number], scale: 0.8 },
            { kind: 'chilli-red' as const, pos: [-1.15, -0.1, 0.45] as [number, number, number], scale: 0.7 },
            { kind: 'curryleaf' as const, pos: [-0.9, -0.15, -0.9] as [number, number, number], scale: 0.85 },
            { kind: 'curryleaf' as const, pos: [0.9, -0.15, -0.85] as [number, number, number], scale: 0.8 },
            { kind: 'kokum' as const, pos: [0.5, -0.16, 1.1] as [number, number, number], scale: 0.75 },
            { kind: 'kokum' as const, pos: [-0.5, -0.16, 1.1] as [number, number, number], scale: 0.7 },
          ],
        };
      default:
        return {
          platterColor: '#1E293B',
          platterRim: '#C8960C',
          rimText: 'QUICK CRAVE  ·  MALVANI COASTAL KITCHEN  ·  ',
          leafColor: '#166534',
          garnishes: [
            { kind: 'lemon' as const, pos: [1.15, -0.12, 0.45] as [number, number, number], scale: 0.75 },
            { kind: 'lemon' as const, pos: [-1.15, -0.12, -0.4] as [number, number, number], scale: 0.65 },
            { kind: 'chilli-red' as const, pos: [1.2, -0.1, -0.5] as [number, number, number], scale: 0.75 },
            { kind: 'chilli-green' as const, pos: [-1.2, -0.1, 0.5] as [number, number, number], scale: 0.7 },
            { kind: 'curryleaf' as const, pos: [-0.85, -0.15, 0.95] as [number, number, number], scale: 0.8 },
            { kind: 'curryleaf' as const, pos: [0.85, -0.15, 0.9] as [number, number, number], scale: 0.8 },
            { kind: 'kokum' as const, pos: [0, -0.16, 1.15] as [number, number, number], scale: 0.8 },
          ],
        };
    }
  }, [flavorKey]);

  // Branding texture for the platter rim band
  const rimBrandTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.clearRect(0, 0, 2048, 128);

      // Gold band background
      ctx.fillStyle = dishConfig.platterRim;
      ctx.fillRect(0, 0, 2048, 128);

      // Repeating branding text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 48px system-ui, sans-serif';
      ctx.textAlign = 'center';
      for (let x = 0; x < 2048; x += 520) {
        ctx.fillText(dishConfig.rimText, x + 260, 82);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [dishConfig]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.0) * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.8) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Hand-thrown Ceramic Sizzler Platter (Lying Flat) */}
      <mesh position={[0, -0.28, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.6, 1.4, 0.08, 64]} />
        <meshStandardMaterial color={dishConfig.platterColor} roughness={0.35} metalness={0.25} />
      </mesh>

      {/* Gold rim band with dish-specific branding */}
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[1.62, 1.62, 0.04, 64, 1, true]} />
        <meshStandardMaterial
          map={rimBrandTexture}
          roughness={0.2}
          metalness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner dark edge ring */}
      <mesh position={[0, -0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.38, 1.58, 64]} />
        <meshStandardMaterial color="#0F172A" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Fresh Green Banana Leaf Liner Bed (Flat Circle) */}
      <mesh position={[0, -0.23, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.36, 64]} />
        <meshStandardMaterial color={dishConfig.leafColor} roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Sizzling Embers */}
      <SizzleParticles />

      {/* Hero 3D Fish Catch — Balanced, elegant, perfectly framed inside the platter */}
      <Center position={[0, 0.04, 0]}>
        <primitive
          object={cloned}
          scale={2.2}
          rotation={[0.16, Math.PI / 3.4, 0.06]}
          castShadow
          receiveShadow
        />
      </Center>

      {/* Floating Fresh Coastal Garnishes — per-dish arrangement */}
      {dishConfig.garnishes.map((g, i) => (
        <FloatingGarnish key={i} kind={g.kind} position={g.pos} scale={g.scale} />
      ))}
    </group>
  );
}

useGLTF.preload('/models/barramundi.glb');

// 3D Branded Glass — tumbler with liquid, branding on the glass surface, splash
function ManaGlassModel({
  flavorName,
  subName,
  bgColor,
  darkColor,
  isMr
}: {
  flavorName: string;
  subName: string;
  bgColor: string;
  darkColor: string;
  isMr?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const splashRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
    }
    if (splashRef.current) {
      splashRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    }
  });

  // Branding texture applied directly to the glass surface
  const glassTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Flip canvas so text reads correctly on cylinder (cylinder UV mirrors from outside)
      ctx.translate(1024, 0);
      ctx.scale(-1, 1);

      // Base — frosted glass tint
      ctx.fillStyle = '#E8F0F4';
      ctx.fillRect(0, 0, 1024, 1024);

      // Bottom half — liquid color showing through
      ctx.fillStyle = bgColor;
      ctx.globalAlpha = 0.7;
      ctx.fillRect(0, 520, 1024, 504);
      ctx.globalAlpha = 1;

      // === Branding label — centered middle band ===
      ctx.fillStyle = darkColor;
      ctx.beginPath();
      ctx.roundRect(0, 340, 1024, 340, 0);
      ctx.fill();

      // Top accent stripe
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 340, 1024, 6);

      // QUICK CRAVE wordmark
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 72px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('QUICK CRAVE', 512, 440);

      // Tagline
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '600 22px system-ui, sans-serif';
      ctx.fillText(
        isMr ? 'अस्सल मालवणी किचन' : 'MALVANI COASTAL KITCHEN',
        512, 475
      );

      // Dish name pill
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.roundRect(260, 500, 504, 60, 30);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 30px system-ui, sans-serif';
      ctx.fillText(flavorName.toUpperCase(), 512, 540);

      // Bottom accent stripe
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 674, 1024, 6);

      // Decorative dots pattern
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      for (let i = 0; i < 30; i++) {
        const x = ((i * 137) % 960) + 32;
        const y = ((i * 229) % 280) + 60;
        ctx.beginPath();
        ctx.arc(x, y, 3 + (i % 4), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.x = -1;
    tex.offset.x = 1;
    return tex;
  }, [flavorName, bgColor, darkColor, isMr]);

  // Inner glass tint (visible through the opening)
  const innerTint = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = bgColor;
      ctx.globalAlpha = 0.3;
      ctx.fillRect(0, 0, 256, 256);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [bgColor]);

  return (
    <group ref={groupRef} scale={[0.88, 0.88, 0.88]}>
      {/* ── GLASS BODY — FrontSide only (label reads correctly) ── */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.68, 0.48, 1.8, 48]} />
        <meshStandardMaterial
          map={glassTexture}
          transparent
          opacity={0.97}
          roughness={0.1}
          metalness={0.03}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* ── GLASS INNER WALL — BackSide (tinted, no label) ── */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.67, 0.47, 1.78, 48]} />
        <meshStandardMaterial
          color={bgColor}
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.02}
          side={THREE.BackSide}
        />
      </mesh>

      {/* ── LIQUID inside — slightly smaller, fills to brim ── */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.62, 0.42, 1.65, 48]} />
        <meshStandardMaterial
          color={bgColor}
          transparent
          opacity={0.98}
          roughness={0.12}
          metalness={0.02}
        />
      </mesh>

      {/* Liquid surface disc */}
      <mesh position={[0, 0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.62, 48]} />
        <meshStandardMaterial
          color={bgColor}
          transparent
          opacity={0.88}
          roughness={0.06}
          metalness={0.15}
        />
      </mesh>

      {/* ── SPLASH blobs at the rim ── */}
      <group ref={splashRef} position={[0, 0.8, 0]}>
        <mesh position={[0.34, 0.16, 0.1]} scale={[0.12, 0.16, 0.12]}>
          <sphereGeometry args={[1, 10, 8]} />
          <meshStandardMaterial color={bgColor} transparent opacity={0.85} roughness={0.1} />
        </mesh>
        <mesh position={[0.46, 0.38, -0.04]} scale={[0.06, 0.07, 0.06]}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color={bgColor} transparent opacity={0.75} roughness={0.08} />
        </mesh>
        <mesh position={[-0.28, 0.1, 0.14]} scale={[0.1, 0.12, 0.1]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color={bgColor} transparent opacity={0.8} roughness={0.1} />
        </mesh>
        <mesh position={[0.08, 0.32, 0.18]} scale={[0.04, 0.04, 0.04]}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshStandardMaterial color="#FFFFFF" transparent opacity={0.4} roughness={0.05} />
        </mesh>
      </group>

      {/* ── GLASS RIM — subtle thick lip ── */}
      <mesh position={[0, 0.9, 0]}>
        <torusGeometry args={[0.68, 0.022, 10, 48]} />
        <meshStandardMaterial
          color="#E8F4FA"
          transparent
          opacity={0.6}
          roughness={0.05}
          metalness={0.3}
        />
      </mesh>

      {/* ── GLASS BASE — thick bottom disc ── */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.48, 0.5, 0.07, 48]} />
        <meshStandardMaterial
          color="#C8DEE8"
          transparent
          opacity={0.45}
          roughness={0.08}
          metalness={0.2}
        />
      </mesh>

      {/* ── FLOATING BUBBLES inside the glass ── */}
      {[
        { pos: [0.2, -0.3, 0.15] as [number, number, number], s: 0.03, speed: 1.8 },
        { pos: [-0.15, 0.1, 0.2] as [number, number, number], s: 0.025, speed: 2.2 },
        { pos: [0.1, 0.4, -0.1] as [number, number, number], s: 0.02, speed: 1.5 },
        { pos: [-0.25, -0.5, 0.05] as [number, number, number], s: 0.035, speed: 2.0 },
        { pos: [0.05, -0.1, -0.2] as [number, number, number], s: 0.018, speed: 2.5 },
      ].map((b, i) => (
        <mesh key={i} position={b.pos}>
          <sphereGeometry args={[b.s, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" transparent opacity={0.35} roughness={0.05} />
        </mesh>
      ))}

      {/* ── FLOATING FRUIT / GARNISH around the glass ── */}
      {/* Lemon wedge */}
      <group position={[0.85, 0.2, 0.5]} rotation={[0.3, 0.5, 0.2]} scale={0.5}>
        <mesh scale={[0.34, 0.16, 0.34]}>
          <sphereGeometry args={[1, 12, 12, 0, Math.PI]} />
          <meshStandardMaterial color="#FACC15" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.02]} scale={[0.3, 0.12, 0.3]}>
          <circleGeometry args={[1, 12]} />
          <meshStandardMaterial color="#FEF08A" roughness={0.4} />
        </mesh>
      </group>

      {/* Kokum fruit (for kokum sherbet) or mint leaf (for sol kadi) */}
      <mesh position={[-0.9, 0.5, 0.3]} rotation={[0.4, -0.3, 0.6]} scale={0.35}>
        <sphereGeometry args={[0.18, 10, 8]} />
        <meshStandardMaterial color="#881337" roughness={0.5} />
      </mesh>

      {/* Mint / curry leaf */}
      <group position={[0.7, -0.4, -0.6]} rotation={[0.2, 0.8, -0.3]} scale={0.45}>
        <mesh rotation={[0.2, 0, 0.3]} scale={[0.14, 0.35, 0.03]}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color="#15803D" roughness={0.4} />
        </mesh>
      </group>

      {/* Floating ice cube */}
      <mesh position={[0.3, 0.55, -0.3]} rotation={[0.2, 0.4, 0.1]} scale={0.12}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#E8F4FA" transparent opacity={0.4} roughness={0.05} metalness={0.1} />
      </mesh>

      {/* Tiny sparkle */}
      <mesh position={[-0.5, 0.7, 0.4]} scale={0.02}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.6, -0.1, 0.5]} scale={0.015}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
      </mesh>
    </group>

  );
}

// Adapt camera distance based on viewport aspect ratio so models are smaller, sharper, and clearly framed
function AdaptiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    let targetZ = 4.4;
    let targetY = 0;
    if (aspect < 0.55) {
      // Tall narrow mobile portrait (e.g. 375x667, 390x844, 400x921)
      targetZ = 6.8;
      targetY = 0.12;
    } else if (aspect < 0.75) {
      // Standard mobile portrait
      targetZ = 6.2;
      targetY = 0.1;
    } else if (aspect < 1.0) {
      // Tablet portrait / square
      targetZ = 5.4;
      targetY = 0.06;
    } else if (aspect < 1.2) {
      targetZ = 4.8;
      targetY = 0.02;
    }
    camera.position.set(0, targetY, targetZ);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}

// 3D Scene Controller — uses OrbitControls for smooth drag-to-rotate
function Scene3D({
  flavor,
  isMr
}: {
  flavor: (typeof SIGNATURE_FLAVORS)[0];
  isMr: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const { size } = useThree();

  const isDrink = flavor.id === 'sol-kadi' || flavor.id === 'kokum-sarbat';

  const isMobile = size.width < 500;
  const isTablet = size.width >= 500 && size.width < 768;
  const targetScale = isDrink
    ? (isMobile ? 0.74 : isTablet ? 0.84 : 0.95)
    : (isMobile ? 0.62 : isTablet ? 0.76 : 0.92);

  const targetPosY = isDrink ? 0.04 : (isMobile ? -0.1 : -0.04);

  // Entry animation on flavor change
  useEffect(() => {
    if (groupRef.current) {
      gsap.fromTo(groupRef.current.scale,
        { x: 0.01, y: 0.01, z: 0.01 },
        { x: targetScale, y: targetScale, z: targetScale, duration: 0.7, ease: 'back.out(1.4)' }
      );
    }
    // Reset controls to default position
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [flavor.id, targetScale]);

  return (
    <>
      <AdaptiveCamera />
      <ambientLight intensity={1.6} color="#FFFFFF" />
      <directionalLight position={[4, 6, 4]} intensity={2.8} color="#FFFFFF" castShadow />
      <directionalLight position={[-4, 3, -2]} intensity={1.2} color="#E0F2FE" />
      <directionalLight position={[0, -2, 3]} intensity={0.5} color="#FEF3C7" />

      {/* Shadow Catcher Plane */}
      <mesh position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.16} />
      </mesh>

      {/* OrbitControls — smooth damping, click-hold-drag, clamped rotation */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={isDrink ? 0.4 : 0.6}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 1.7}
        target={[0, 0, 0]}
      />

      <group ref={groupRef} position={[0, targetPosY, 0]} scale={[targetScale, targetScale, targetScale]}>
        {isDrink ? (
          <ManaGlassModel
            flavorName={isMr ? flavor.nameMr : flavor.name}
            subName={isMr ? flavor.subtitleMr : flavor.subtitle}
            bgColor={flavor.bgColor}
            darkColor={flavor.darkColor}
            isMr={isMr}
          />
        ) : (
          <Suspense fallback={null}>
            <BarramundiCatchModel dishImage={flavor.image} flavorKey={flavor.key} />
          </Suspense>
        )}
      </group>
    </>
  );
}

export function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { tr, isMr } = useT();

  const activeIndex = useStore((s) => s.activeFlavorIndex);
  const nextFlavor = useStore((s) => s.nextFlavor);
  const prevFlavor = useStore((s) => s.prevFlavor);
  const setCursor = useStore((s) => s.setCursor);
  const currentFlavor = SIGNATURE_FLAVORS[activeIndex];

  // GSAP Smooth Background Color Morphing on Flavor Change
  useEffect(() => {
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        backgroundColor: currentFlavor.bgColor,
        duration: 0.75,
        ease: 'power2.inOut'
      });
    }
  }, [currentFlavor.bgColor]);

  const scrollToDetails = () => {
    const el = document.getElementById('details');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{ backgroundColor: currentFlavor.bgColor }}
      className="relative w-full h-[100dvh] min-h-[520px] max-h-[1100px] flex flex-col items-center justify-between overflow-hidden select-none transition-colors duration-700"
    >
      {/* Top Sunburst Rays (Common across all flavors) */}
      <div className="absolute top-0 inset-x-0 flex justify-center pointer-events-none -z-0">
        <SunburstRays className="w-[850px] max-w-full opacity-65" />
      </div>

      {/* Dynamic Background Doodle Layer matching each flavor screenshot */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* FLAVOR 0: GREEN (Melon & Mint / Sol Kadi) */}
        {currentFlavor.doodleSet === 'green' && (
          <>
            {/* Left Friendly Red Doodle Creature */}
            <div className="absolute -left-8 sm:left-4 bottom-14 sm:bottom-24 w-36 sm:w-80 md:w-96 opacity-60 sm:opacity-100 animate-[float_8s_ease-in-out_infinite]">
              <RedMonsterDoodle className="w-full" />
            </div>

            {/* Left Tropical Leaves & Orange Blossom Flower */}
            <div className="absolute left-1 sm:left-12 -bottom-6 w-40 sm:w-80 opacity-60 sm:opacity-95">
              <BotanicalLeavesFlower className="w-full" />
            </div>

            {/* Right Citrus Watermelon Slice */}
            <div className="absolute right-4 sm:right-24 bottom-20 sm:bottom-36 w-28 sm:w-60 opacity-70 sm:opacity-100 animate-[float_6s_ease-in-out_infinite]">
              <SliceCitrusDoodle className="w-full" />
            </div>

            {/* Right Arch Window with Blue Sky & Clouds */}
            <div className="absolute -right-4 sm:right-12 top-20 sm:top-36 w-24 sm:w-52 opacity-60 sm:opacity-90">
              <ArchCloudWindow className="w-full" />
            </div>

            {/* Floating Bubble Rings */}
            <div className="absolute left-1/4 top-28 sm:top-36 w-8 sm:w-12 h-8 sm:h-12 opacity-30 sm:opacity-40">
              <BubbleRing className="w-full" />
            </div>
            <div className="absolute right-1/3 bottom-36 sm:bottom-44 w-6 sm:w-8 h-6 sm:h-8 opacity-30 sm:opacity-40">
              <BubbleRing className="w-full" />
            </div>
          </>
        )}

        {/* FLAVOR 1: YELLOW (Grapefruit & Spice / Surmai Fry) */}
        {currentFlavor.doodleSet === 'yellow' && (
          <>
            {/* Left Blue Dancing Cartoon Character */}
            <div className="absolute -left-6 sm:left-6 bottom-12 sm:bottom-20 w-40 sm:w-84 md:w-[420px] opacity-60 sm:opacity-100 animate-[float_7s_ease-in-out_infinite]">
              <BlueDancerDoodle className="w-full" />
            </div>

            {/* Kicked Citrus Slice */}
            <div className="absolute left-28 sm:left-80 bottom-14 sm:bottom-16 w-20 sm:w-44 rotate-12 opacity-70 sm:opacity-100">
              <SliceCitrusDoodle className="w-full" />
            </div>

            {/* Right Hanging Character Doodles */}
            <div className="absolute right-2 sm:right-16 top-20 sm:top-28 w-28 sm:w-64 opacity-60 sm:opacity-90 animate-[float_9s_ease-in-out_infinite]">
              <RedMonsterDoodle className="w-full scale-90 rotate-180" />
            </div>

            {/* Right Tropical Foliage */}
            <div className="absolute -right-6 sm:-right-10 bottom-4 w-36 sm:w-72 opacity-60 sm:opacity-100">
              <BotanicalLeavesFlower className="w-full rotate-45" />
            </div>
          </>
        )}

        {/* FLAVOR 2: BLUE (Blackberry & Hibiscus / Pomfret Tava Fry) */}
        {currentFlavor.doodleSet === 'blue' && (
          <>
            {/* Left Giant Pink Hibiscus Flower */}
            <div className="absolute -left-6 sm:left-12 top-24 sm:top-40 w-32 sm:w-72 md:w-80 opacity-60 sm:opacity-100 animate-[float_6s_ease-in-out_infinite]">
              <HibiscusDoodle className="w-full" />
            </div>

            {/* Left Smiling Cartoon Blackberry */}
            <div className="absolute left-2 sm:left-24 bottom-14 sm:bottom-24 w-24 sm:w-52 opacity-70 sm:opacity-100">
              <BlackberryDoodle className="w-full" />
            </div>

            {/* Right Rocket Ship Blasting Off with Smoke Trails */}
            <div className="absolute -right-3 sm:right-16 bottom-16 sm:bottom-28 w-36 sm:w-80 md:w-96 opacity-60 sm:opacity-100 animate-[float_8s_ease-in-out_infinite]">
              <RocketShipDoodle className="w-full -rotate-12" />
            </div>

            {/* Sparkle Stars */}
            <div className="absolute left-1/3 top-32 sm:top-40 w-6 sm:w-10 h-6 sm:h-10 animate-pulse">
              <SparkleStar className="w-full" />
            </div>
            <div className="absolute right-1/4 top-40 sm:top-52 w-8 sm:w-12 h-8 sm:h-12 animate-pulse">
              <SparkleStar className="w-full" />
            </div>
          </>
        )}

        {/* FLAVOR 3: CORAL (The Malvani Feast Box) */}
        {currentFlavor.doodleSet === 'coral' && (
          <>
            <div className="absolute left-4 sm:left-8 bottom-16 sm:bottom-24 w-40 sm:w-80 opacity-60 sm:opacity-100">
              <BotanicalLeavesFlower className="w-full" />
            </div>
            <div className="absolute right-4 sm:right-8 bottom-16 sm:bottom-24 w-32 sm:w-72 opacity-60 sm:opacity-100">
              <SliceCitrusDoodle className="w-full" />
            </div>
            <div className="absolute left-1/4 top-28 sm:top-36 w-6 sm:w-10 h-6 sm:h-10">
              <SparkleStar className="w-full" />
            </div>
          </>
        )}

        {/* FLAVOR 4: PINK (Kokum Sherbet — tropical magenta theme) */}
        {currentFlavor.doodleSet === 'pink' && (
          <>
            {/* Left Hibiscus Flower — large, tropical */}
            <div className="absolute -left-6 sm:left-8 bottom-14 sm:bottom-28 w-32 sm:w-72 md:w-80 opacity-60 sm:opacity-100 animate-[float_7s_ease-in-out_infinite]">
              <HibiscusDoodle className="w-full" />
            </div>

            {/* Left Tropical Botanical Leaves */}
            <div className="absolute left-0 sm:left-16 -bottom-6 w-36 sm:w-72 opacity-50 sm:opacity-90">
              <BotanicalLeavesFlower className="w-full -rotate-12" />
            </div>

            {/* Right Arch Window with Clouds */}
            <div className="absolute -right-3 sm:right-14 top-20 sm:top-32 w-24 sm:w-52 opacity-60 sm:opacity-90">
              <ArchCloudWindow className="w-full" />
            </div>

            {/* Right Citrus Slice — kokum garnish feel */}
            <div className="absolute right-4 sm:right-28 bottom-16 sm:bottom-32 w-24 sm:w-48 opacity-60 sm:opacity-100 animate-[float_6s_ease-in-out_infinite]">
              <SliceCitrusDoodle className="w-full rotate-[-15deg]" />
            </div>

            {/* Floating Bubble Rings */}
            <div className="absolute left-1/3 top-24 sm:top-32 w-6 sm:w-10 h-6 sm:h-10 opacity-30 sm:opacity-40">
              <BubbleRing className="w-full" />
            </div>
            <div className="absolute right-1/4 bottom-36 sm:bottom-48 w-6 sm:w-8 h-6 sm:h-8 opacity-30 sm:opacity-40">
              <BubbleRing className="w-full" />
            </div>

            {/* Sparkle Stars */}
            <div className="absolute left-[42%] top-24 sm:top-28 w-6 sm:w-8 h-6 sm:h-8 animate-pulse">
              <SparkleStar className="w-full" />
            </div>
            <div className="absolute right-[38%] top-44 sm:top-52 w-5 sm:w-6 h-5 sm:h-6 animate-pulse">
              <SparkleStar className="w-full" />
            </div>
          </>
        )}
      </div>

      {/* Top Spacer for fixed navbar */}
      <div className="h-16 sm:h-24 shrink-0" />

      {/* Centered 3D Canvas Viewport — Perfectly Framed & Proportioned with min-h-0 */}
      <div
        className="relative flex-1 min-h-0 w-full max-w-4xl mx-auto flex items-center justify-center z-10"
        onPointerEnter={() => setCursor('drag', isMr ? 'घसरा करा · फिरवा' : 'DRAG TO EXPLORE')}
        onPointerLeave={() => setCursor('default', null)}
      >
        <Canvas
          camera={{ position: [0, 0, 4.4], fov: 38 }}
          shadows
          className="cursor-grab active:cursor-grabbing"
          style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        >
          <Scene3D
            flavor={currentFlavor}
            isMr={isMr}
          />
        </Canvas>
      </div>

      {/* MANA-style Interactive Bottom Navigation Controls & Scroll Down Cue */}
      <div className="relative z-20 w-full max-w-2xl mx-auto px-4 sm:px-6 pb-3 sm:pb-6 flex flex-col items-center gap-2.5 sm:gap-3 shrink-0">
        <div className="w-full flex items-center justify-between gap-2.5 sm:gap-4">
          {/* Left Floating Circular Arrow Button */}
          <button
            onClick={prevFlavor}
            onPointerEnter={() => setCursor('open', tr('hero.prevDish'))}
            onPointerLeave={() => setCursor('default', null)}
            className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-full bg-white text-[#1E293B] hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg transition-transform duration-200 border border-black/5 cursor-pointer"
            aria-label={tr('hero.prevDish')}
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" strokeWidth={2.4} />
          </button>

          {/* Center Pill Button: Active Flavor Name linking directly to its product page */}
          <Link
            to={`/products/${currentFlavor.id}`}
            style={{ backgroundColor: currentFlavor.buttonBg }}
            onPointerEnter={() => setCursor('open', isMr ? currentFlavor.nameMr : currentFlavor.name)}
            onPointerLeave={() => setCursor('default', null)}
            className="group flex-1 min-w-0 max-w-sm py-3 sm:py-4 px-4 sm:px-8 rounded-full text-white text-xs sm:text-base md:text-lg font-bold font-bubble tracking-wide shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 text-center"
          >
            <span className="truncate">{isMr ? currentFlavor.nameMr : currentFlavor.name}</span>
            <ArrowRight size={16} className="shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Right Floating Circular Arrow Button */}
          <button
            onClick={nextFlavor}
            onPointerEnter={() => setCursor('open', tr('hero.nextDish'))}
            onPointerLeave={() => setCursor('default', null)}
            className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-full bg-white text-[#1E293B] hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg transition-transform duration-200 border border-black/5 cursor-pointer"
            aria-label={tr('hero.nextDish')}
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" strokeWidth={2.4} />
          </button>
        </div>

        {/* Animated Scroll Down Indication Prompt: Guides customer to the Menu & Order section */}
        <button
          onClick={scrollToMenu}
          className="group inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-black/10 hover:bg-black/20 text-[#111827] text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-sm backdrop-blur-sm border border-black/5"
          aria-label={tr('hero.scrollForMenu')}
        >
          <span>{tr('hero.scrollForMenu')}</span>
          <ChevronDown size={14} className="animate-bounce text-[#111827]" />
        </button>
      </div>
    </section>
  );
}
