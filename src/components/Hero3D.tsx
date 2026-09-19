import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Box, Compass, Flame } from 'lucide-react';
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

// 3D GLTF Barramundi Fish Catch on Cast-Iron Coastal Platter (Horizontal & Elegantly Scaled)
function BarramundiCatchModel({ dishImage }: { dishImage: string }) {
  const { scene } = useGLTF('/models/barramundi.glb');
  const cloned = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle subtle breathing sway and swim motion
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.0) * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.8) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Hand-thrown Ceramic Sizzler Platter (Lying Flat) */}
      <mesh position={[0, -0.28, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.6, 1.4, 0.08, 64]} />
        <meshStandardMaterial color="#1E293B" roughness={0.35} metalness={0.25} />
      </mesh>

      {/* Terracotta / Gold Accent Platter Rim (Flat Ring) */}
      <mesh position={[0, -0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.52, 0.03, 16, 64]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Fresh Green Banana Leaf Liner Bed (Flat Circle) */}
      <mesh position={[0, -0.23, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.44, 64]} />
        <meshStandardMaterial color="#166534" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Sizzling Embers */}
      <SizzleParticles />

      {/* Hero 3D Fish Catch — Balanced, elegant, perfectly framed */}
      <Center position={[0, 0.04, 0]}>
        <primitive
          object={cloned}
          scale={3.3}
          rotation={[0.16, Math.PI / 3.4, 0.06]}
          castShadow
          receiveShadow
        />
      </Center>

      {/* Floating Fresh Coastal Garnishes on Platter Edges */}
      <FloatingGarnish kind="lemon" position={[1.15, -0.12, 0.45]} scale={0.75} />
      <FloatingGarnish kind="lemon" position={[-1.15, -0.12, -0.4]} scale={0.65} />
      <FloatingGarnish kind="chilli-red" position={[1.2, -0.1, -0.5]} scale={0.75} />
      <FloatingGarnish kind="chilli-green" position={[-1.2, -0.1, 0.5]} scale={0.7} />
      <FloatingGarnish kind="curryleaf" position={[-0.85, -0.15, 0.95]} scale={0.8} />
      <FloatingGarnish kind="curryleaf" position={[0.85, -0.15, 0.9]} scale={0.8} />
      <FloatingGarnish kind="kokum" position={[0, -0.16, 1.15]} scale={0.8} />
    </group>
  );
}

useGLTF.preload('/models/barramundi.glb');

// MANA Signature 3D Cylindrical Craft Product Can — Perfectly Proportioned Slim Can
function ManaCraftCan({
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
  const meshRef = useRef<THREE.Mesh>(null);

  // Dynamic canvas texture matching Quick Crave menu branding (drawn on front & back so never blank)
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Base background color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 1024, 1024);

      // Function to render branding & dish details centered at an X coordinate
      const renderFace = (centerX: number) => {
        // Top Rim Banner
        ctx.fillStyle = darkColor;
        ctx.fillRect(centerX - 460, 40, 920, 65);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          isMr ? 'क्विक क्रेव्ह · अस्सल मालवणी किचन' : 'QUICK CRAVE · MALVANI COASTAL KITCHEN',
          centerX,
          80
        );

        // Big Bold Bubble Wordmark
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '900 95px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('QUICK', centerX, 230);
        ctx.fillText('CRAVE', centerX, 330);

        // Coastal Wave Underline
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(centerX - 120, 365);
        ctx.quadraticCurveTo(centerX - 60, 345, centerX, 365);
        ctx.quadraticCurveTo(centerX + 60, 385, centerX + 120, 365);
        ctx.stroke();

        // Active Dish Name Pill Banner
        ctx.fillStyle = darkColor;
        ctx.beginPath();
        ctx.roundRect(centerX - 240, 580, 480, 80, 40);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 36px system-ui, sans-serif';
        ctx.fillText(flavorName.toUpperCase(), centerX, 634);

        // Subtitle / Price
        ctx.fillStyle = darkColor;
        ctx.font = 'bold 26px system-ui, sans-serif';
        ctx.fillText(subName.toUpperCase(), centerX, 730);

        ctx.font = '600 22px system-ui, sans-serif';
        ctx.fillText(
          isMr ? '१००% ताजी मासळी · दगडी पाटा मसाला' : '100% WILD CATCH · STONE GROUND MASALAS',
          centerX,
          790
        );

        // Zomato Callout
        ctx.fillStyle = '#E23744';
        ctx.beginPath();
        ctx.roundRect(centerX - 160, 850, 320, 55, 28);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 22px system-ui, sans-serif';
        ctx.fillText(isMr ? 'झोमॅटो वरून मागवा' : 'ORDER ON ZOMATO', centerX, 885);
      };

      // Draw on center front (512) and left/right seam (0 / 1024)
      renderFace(512);

      // Playful dots and sparkles scattered across the background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 40; i++) {
        const x = ((i * 137) % 960) + 32;
        const y = ((i * 229) % 800) + 120;
        ctx.beginPath();
        ctx.arc(x, y, 4 + (i % 5), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [flavorName, subName, bgColor, darkColor]);

  return (
    <group position={[0, 0, 0]}>
      {/* Main Slim Can Body with front-facing label */}
      <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.58, 0.58, 1.95, 64]} />
        <meshStandardMaterial
          map={labelTexture}
          roughness={0.25}
          metalness={0.12}
        />
      </mesh>

      {/* Top Silver Bevel Rim */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.54, 0.58, 0.06, 64]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.92} roughness={0.15} />
      </mesh>

      {/* Top Can Lid Inset */}
      <mesh position={[0, 1.03, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.02, 48]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Pull Tab Accent */}
      <mesh position={[0, 1.04, 0.12]}>
        <boxGeometry args={[0.16, 0.015, 0.32]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Bottom Silver Bevel Rim */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.58, 0.52, 0.06, 64]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.92} roughness={0.15} />
      </mesh>
    </group>
  );
}

// 3D Scene Controller
function Scene3D({
  flavor,
  show3dFish,
  isDragging,
  isMr,
  onPointerDown,
  onPointerUp
}: {
  flavor: (typeof SIGNATURE_FLAVORS)[0];
  show3dFish: boolean;
  isDragging: boolean;
  isMr: boolean;
  onPointerDown: () => void;
  onPointerUp: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotationY = useRef(0);
  const { camera, pointer } = useThree();

  // Smooth rotation spin when switching flavors
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        y: targetRotationY.current + Math.PI * 2,
        duration: 0.85,
        ease: 'power3.out'
      });
      targetRotationY.current += Math.PI * 2;
    }
  }, [flavor.id, show3dFish]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;

    if (!isDragging) {
      g.rotation.y += delta * 0.45;
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.y * 0.15, delta * 2.5);
      g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -pointer.x * 0.1, delta * 2.5);
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.35, delta * 2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.1 - pointer.y * 0.2, delta * 2);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1.6} color="#FFFFFF" />
      <directionalLight position={[4, 6, 4]} intensity={2.8} color="#FFFFFF" castShadow />
      <directionalLight position={[-4, 3, -2]} intensity={1.2} color="#E0F2FE" />
      <directionalLight position={[0, -2, 3]} intensity={0.5} color="#FEF3C7" />

      {/* Shadow Catcher Plane */}
      <mesh position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.16} />
      </mesh>

      <group
        ref={groupRef}
        position={[0, 0, 0]}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {show3dFish ? (
          <Suspense fallback={null}>
            <BarramundiCatchModel dishImage={flavor.image} />
          </Suspense>
        ) : (
          <ManaCraftCan
            flavorName={isMr ? flavor.nameMr : flavor.name}
            subName={isMr ? flavor.subtitleMr : flavor.subtitle}
            bgColor={flavor.bgColor}
            darkColor={flavor.darkColor}
            isMr={isMr}
          />
        )}
      </group>
    </>
  );
}

export function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [show3dFish, setShow3dFish] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { tr, isMr } = useT();

  const activeIndex = useStore((s) => s.activeFlavorIndex);
  const nextFlavor = useStore((s) => s.nextFlavor);
  const prevFlavor = useStore((s) => s.prevFlavor);
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

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{ backgroundColor: currentFlavor.bgColor }}
      className="relative w-full h-[100vh] min-h-[680px] flex flex-col items-center justify-between overflow-hidden select-none transition-colors duration-700"
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
            <div className="absolute -left-10 sm:left-4 bottom-16 sm:bottom-24 w-60 sm:w-80 md:w-96 animate-[float_8s_ease-in-out_infinite]">
              <RedMonsterDoodle className="w-full" />
            </div>

            {/* Left Tropical Leaves & Orange Blossom Flower */}
            <div className="absolute left-2 sm:left-12 -bottom-8 w-64 sm:w-80 opacity-95">
              <BotanicalLeavesFlower className="w-full" />
            </div>

            {/* Right Citrus Watermelon Slice */}
            <div className="absolute right-8 sm:right-24 bottom-24 sm:bottom-36 w-44 sm:w-60 animate-[float_6s_ease-in-out_infinite]">
              <SliceCitrusDoodle className="w-full" />
            </div>

            {/* Right Arch Window with Blue Sky & Clouds */}
            <div className="absolute -right-6 sm:right-12 top-28 sm:top-36 w-36 sm:w-52 opacity-90">
              <ArchCloudWindow className="w-full" />
            </div>

            {/* Floating Bubble Rings */}
            <div className="absolute left-1/4 top-36 w-12 h-12 opacity-40">
              <BubbleRing className="w-full" />
            </div>
            <div className="absolute right-1/3 bottom-44 w-8 h-8 opacity-40">
              <BubbleRing className="w-full" />
            </div>
          </>
        )}

        {/* FLAVOR 1: YELLOW (Grapefruit & Spice / Surmai Fry) */}
        {currentFlavor.doodleSet === 'yellow' && (
          <>
            {/* Left Blue Dancing Cartoon Character */}
            <div className="absolute -left-6 sm:left-6 bottom-12 sm:bottom-20 w-64 sm:w-84 md:w-[420px] animate-[float_7s_ease-in-out_infinite]">
              <BlueDancerDoodle className="w-full" />
            </div>

            {/* Kicked Citrus Slice */}
            <div className="absolute left-40 sm:left-80 bottom-16 w-32 sm:w-44 rotate-12">
              <SliceCitrusDoodle className="w-full" />
            </div>

            {/* Right Hanging Character Doodles */}
            <div className="absolute right-4 sm:right-16 top-24 sm:top-28 w-44 sm:w-64 opacity-90 animate-[float_9s_ease-in-out_infinite]">
              <RedMonsterDoodle className="w-full scale-90 rotate-180" />
            </div>

            {/* Right Tropical Foliage */}
            <div className="absolute -right-10 bottom-4 w-60 sm:w-72">
              <BotanicalLeavesFlower className="w-full rotate-45" />
            </div>
          </>
        )}

        {/* FLAVOR 2: BLUE (Blackberry & Hibiscus / Pomfret Tava Fry) */}
        {currentFlavor.doodleSet === 'blue' && (
          <>
            {/* Left Giant Pink Hibiscus Flower */}
            <div className="absolute -left-8 sm:left-12 top-32 sm:top-40 w-52 sm:w-72 md:w-80 animate-[float_6s_ease-in-out_infinite]">
              <HibiscusDoodle className="w-full" />
            </div>

            {/* Left Smiling Cartoon Blackberry */}
            <div className="absolute left-4 sm:left-24 bottom-16 sm:bottom-24 w-36 sm:w-52">
              <BlackberryDoodle className="w-full" />
            </div>

            {/* Right Rocket Ship Blasting Off with Smoke Trails */}
            <div className="absolute -right-4 sm:right-16 bottom-20 sm:bottom-28 w-60 sm:w-80 md:w-96 animate-[float_8s_ease-in-out_infinite]">
              <RocketShipDoodle className="w-full -rotate-12" />
            </div>

            {/* Sparkle Stars */}
            <div className="absolute left-1/3 top-40 w-10 h-10 animate-pulse">
              <SparkleStar className="w-full" />
            </div>
            <div className="absolute right-1/4 top-52 w-12 h-12 animate-pulse">
              <SparkleStar className="w-full" />
            </div>
          </>
        )}

        {/* FLAVOR 3: CORAL (The Malvani Feast Box) */}
        {currentFlavor.doodleSet === 'coral' && (
          <>
            <div className="absolute left-8 bottom-24 w-64 sm:w-80">
              <BotanicalLeavesFlower className="w-full" />
            </div>
            <div className="absolute right-8 bottom-24 w-52 sm:w-72">
              <SliceCitrusDoodle className="w-full" />
            </div>
            <div className="absolute left-1/4 top-36 w-10 h-10">
              <SparkleStar className="w-full" />
            </div>
          </>
        )}
      </div>

      {/* Top Spacer for fixed navbar */}
      <div className="pt-24 sm:pt-28" />

      {/* Centered 3D Canvas Viewport — Perfectly Framed & Proportioned */}
      <div className="relative flex-1 w-full max-w-4xl mx-auto flex items-center justify-center z-10">
        <Canvas
          camera={{ position: [0, 0, 4.4], fov: 38 }}
          shadows
          className="cursor-grab active:cursor-grabbing"
          style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        >
          <Scene3D
            flavor={currentFlavor}
            show3dFish={show3dFish}
            isDragging={isDragging}
            isMr={isMr}
            onPointerDown={() => setIsDragging(true)}
            onPointerUp={() => setIsDragging(false)}
          />
        </Canvas>

        {/* 3D Model Switcher Pill — Dual Mode Pill */}
        <div className="absolute top-2 right-4 sm:right-8 z-20 flex items-center gap-1 p-1 rounded-full bg-white/95 shadow-md border border-black/5 backdrop-blur-sm">
          <button
            onClick={() => setShow3dFish(false)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              !show3dFish
                ? 'bg-[#1E2B58] text-white shadow-xs'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Box size={13} />
              <span>{tr('hero.3dCan')}</span>
            </span>
          </button>
          <button
            onClick={() => setShow3dFish(true)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              show3dFish
                ? 'bg-[#1E2B58] text-white shadow-xs'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Flame size={13} className="text-[#F9D36A]" />
              <span>{tr('hero.3dPlatter')}</span>
            </span>
          </button>
        </div>
      </div>

      {/* MANA-style Interactive Bottom Navigation Controls */}
      <div className="relative z-20 w-full max-w-2xl px-6 pb-8 sm:pb-12 flex items-center justify-between gap-4">
        {/* Left Floating Circular Arrow Button */}
        <button
          onClick={prevFlavor}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white text-[#1E293B] hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg transition-transform duration-200 border border-black/5"
          aria-label={tr('hero.prevDish')}
        >
          <ChevronLeft size={24} strokeWidth={2.2} />
        </button>

        {/* Center Pill Button: Active Flavor Name linking directly to its product page */}
        <Link
          to={`/products/${currentFlavor.id}`}
          style={{ backgroundColor: currentFlavor.buttonBg }}
          className="group flex-1 max-w-sm py-3.5 sm:py-4 px-6 sm:px-8 rounded-full text-white text-base sm:text-lg font-bold font-bubble tracking-wide shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>{isMr ? currentFlavor.nameMr : currentFlavor.name}</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Right Floating Circular Arrow Button */}
        <button
          onClick={nextFlavor}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white text-[#1E293B] hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg transition-transform duration-200 border border-black/5"
          aria-label={tr('hero.nextDish')}
        >
          <ChevronRight size={24} strokeWidth={2.2} />
        </button>
      </div>
    </section>
  );
}
