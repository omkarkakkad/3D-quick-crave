import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { FishModel } from '../three/underwater/FishModel';
import { SectionTitle } from '../components/ui/SectionTitle';
import { GlGuard } from '../components/ui/GlGuard';
import { usePausableCanvas } from '../lib/usePausableCanvas';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';

const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

const hotspots = [
  { id: 'ingredients', x: 74, y: 54 },
  { id: 'spices', x: 22, y: 60 },
  { id: 'cooking', x: 50, y: 40 },
  { id: 'masala', x: 30, y: 26 },
  { id: 'seafood', x: 62, y: 30 }
];

function Kitchen3D() {
  const bowl = useRef<THREE.Mesh>(null);
  const steam = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (bowl.current) bowl.current.rotation.y = t * 0.5;
    if (steam.current) {
      steam.current.position.y = 1.15 + Math.sin(t * 0.8) * 0.06;
      (steam.current.material as THREE.MeshBasicMaterial).opacity = 0.1 + Math.sin(t * 1.4) * 0.06;
    }
  });

  return (
    <>
      {/* warm kitchen light */}
      <ambientLight intensity={0.55} color="#ffd9a8" />
      <directionalLight position={[3, 5, 3]} intensity={2.6} color="#ffe9c8" castShadow />
      <pointLight position={[0, 2.4, 3]} intensity={6} distance={7} color="#ffb46a" />
      <pointLight position={[-2.5, 1, -1.5]} intensity={4} distance={5} color="#ff7a45" />

      {/* back wall */}
      <mesh position={[0, 1.2, -2.6]}>
        <planeGeometry args={[9, 4]} />
        <meshStandardMaterial color="#2a1a10" roughness={0.9} />
      </mesh>
      {/* wall panel accents */}
      <mesh position={[-1.3, 1.2, -2.58]}>
        <planeGeometry args={[0.08, 4]} />
        <meshStandardMaterial color="#1c120c" roughness={0.9} />
      </mesh>
      <mesh position={[1.6, 1.2, -2.58]}>
        <planeGeometry args={[0.08, 4]} />
        <meshStandardMaterial color="#1c120c" roughness={0.9} />
      </mesh>
      {/* floor tiles */}
      <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 8]} />
        <meshStandardMaterial color="#3a2417" roughness={0.85} />
      </mesh>

      {/* window light */}
      <mesh position={[-2.6, 2.1, -2.5]}>
        <planeGeometry args={[1.9, 1.6]} />
        <meshStandardMaterial color="#ffd9a0" emissive="#ffb46a" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-2.6, 2.1, -2.45]}>
        <boxGeometry args={[1.95, 0.06, 0.05]} />
        <meshStandardMaterial color="#1c120c" />
      </mesh>
      <mesh position={[-2.6, 2.1, -2.45]}>
        <boxGeometry args={[0.06, 1.65, 0.05]} />
        <meshStandardMaterial color="#1c120c" />
      </mesh>

      {/* hanging pots */}
      {[-3.2, -2.2, -1.2].map((x, i) => (
        <mesh key={i} position={[x, 2.6, -2.3]}>
          <cylinderGeometry args={[0.22, 0.18, 0.3, 14]} />
          <meshStandardMaterial color={i % 2 ? '#7a4a20' : '#2c4a2a'} roughness={0.6} metalness={0.4} />
        </mesh>
      ))}
      <mesh position={[-2.2, 2.9, -2.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
        <meshStandardMaterial color="#5a3a22" />
      </mesh>

      {/* wooden table */}
      <group position={[0, -0.45, 0.4]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.4, 0.18, 2.1]} />
          <meshStandardMaterial color="#5a3615" roughness={0.7} />
        </mesh>
        <mesh position={[-1.9, -0.5, -0.8]}>
          <boxGeometry args={[0.16, 0.85, 0.16]} />
          <meshStandardMaterial color="#4a2c12" roughness={0.8} />
        </mesh>
        <mesh position={[1.9, -0.5, -0.8]}>
          <boxGeometry args={[0.16, 0.85, 0.16]} />
          <meshStandardMaterial color="#4a2c12" roughness={0.8} />
        </mesh>
        <mesh position={[-1.9, -0.5, 0.8]}>
          <boxGeometry args={[0.16, 0.85, 0.16]} />
          <meshStandardMaterial color="#4a2c12" roughness={0.8} />
        </mesh>
        <mesh position={[1.9, -0.5, 0.8]}>
          <boxGeometry args={[0.16, 0.85, 0.16]} />
          <meshStandardMaterial color="#4a2c12" roughness={0.8} />
        </mesh>

        {/* cutting board + fresh seafood */}
        <group position={[1.3, 0.15, 0.4]} rotation={[0, -0.5, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.06, 0.9]} />
            <meshStandardMaterial color="#b98a4a" roughness={0.6} />
          </mesh>
          <group position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.62, 0.62, 0.62]}>
            <FishModel species="pomfret" scale={1} />
          </group>
          <mesh position={[0.2, 0.1, 0.42]}>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshStandardMaterial color="#e05a2e" roughness={0.5} />
          </mesh>
        </group>

        {/* copper handi + steam */}
        <group position={[-0.6, 0.16, -0.1]}>
          <mesh ref={bowl} castShadow>
            <cylinderGeometry args={[0.62, 0.48, 0.7, 24]} />
            <meshStandardMaterial color="#a8612a" roughness={0.3} metalness={0.85} />
          </mesh>
          <mesh position={[0, 0.37, 0]}>
            <cylinderGeometry args={[0.56, 0.56, 0.03, 24]} />
            <meshStandardMaterial color="#c8803a" roughness={0.35} metalness={0.8} />
          </mesh>
          <mesh ref={steam} position={[0, 0.42, 0]}>
            <sphereGeometry args={[0.16, 10, 10]} />
            <meshBasicMaterial color="#fff4e0" transparent opacity={0.1} depthWrite={false} />
          </mesh>
        </group>

        {/* mortar & pestle */}
        <group position={[1.15, 0.14, -0.65]}>
          <mesh position={[0, -0.02, 0]}>
            <cylinderGeometry args={[0.24, 0.17, 0.16, 16]} />
            <meshStandardMaterial color="#8a6a3a" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.13, 0]} rotation={[0, 0.2, 0.25]}>
            <boxGeometry args={[0.34, 0.07, 0.07]} />
            <meshStandardMaterial color="#5a4a2a" roughness={0.7} />
          </mesh>
        </group>

        {/* masala jar */}
        <group position={[-0.35, 0.13, 0.72]}>
          <mesh>
            <cylinderGeometry args={[0.17, 0.15, 0.3, 14]} />
            <meshStandardMaterial color="#9c3a1e" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.17, 0]}>
            <boxGeometry args={[0.2, 0.05, 0.2]} />
            <meshStandardMaterial color="#d9a13c" roughness={0.4} />
          </mesh>
        </group>

        {/* coconut + chillies */}
        <group position={[-0.5, 0.14, -0.9]}>
          <mesh>
            <sphereGeometry args={[0.17, 14, 14]} />
            <meshStandardMaterial color="#6e4a28" roughness={0.7} />
          </mesh>
        </group>
        <group position={[-0.78, 0.14, -0.95]} rotation={[0, 0, 0.4]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[i * 0.16, 0.1 - (i % 2) * 0.08, 0]}>
              <cylinderGeometry args={[0.03, 0.035, 0.4, 6]} />
              <meshStandardMaterial color="#c73e28" roughness={0.4} />
            </mesh>
          ))}
        </group>
        <group position={[1.05, 0.15, -0.2]}>
          {[0, 1].map((i) => (
            <mesh key={i} position={[i * 0.15, i % 2 ? 0.12 : 0.05, 0]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#3d8f4e" roughness={0.4} />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
}

export default function FromOurKitchen() {
  const [active, setActive] = useState<string | null>(null);
  const selected = hotspots.find((h) => h.id === active);
  const { ref: canvasWrap, paused } = usePausableCanvas();
  const lang = useStore((s) => s.lang);

  const hotspotTexts: Record<string, { titleKey: string; bodyKey: string }> = {
    ingredients: { titleKey: 'hotspot.ingredients', bodyKey: 'hotspot.ingredients.body' },
    spices: { titleKey: 'hotspot.spices', bodyKey: 'hotspot.spices.body' },
    cooking: { titleKey: 'hotspot.cooking', bodyKey: 'hotspot.cooking.body' },
    masala: { titleKey: 'hotspot.masala', bodyKey: 'hotspot.masala.body' },
    seafood: { titleKey: 'hotspot.seafood', bodyKey: 'hotspot.seafood.body' },
  };

  const selectedText = selected ? hotspotTexts[selected.id] : null;

  return (
    <section id="kitchen" className="section-anchor relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 section-bg" style={{ background: 'radial-gradient(ellipse at 50% 60%, #1c0f08 0%, #020b1a 78%)' }} />

      <div className="relative max-w-6xl mx-auto px-6">
        <SectionTitle
          kicker={t['kitchen.kicker'][lang]}
          title={t['kitchen.title'][lang]}
        />
        <p className="text-center text-seafoam/60 text-sm md:text-base max-w-xl mx-auto mt-5">
          {t['kitchen.desc'][lang]}
        </p>

        <div className="relative mt-12 rounded-[2.5rem] overflow-hidden border border-aqua/10 aspect-[16/11] md:aspect-[16/8]">
          <div ref={canvasWrap} className="absolute inset-0 section-bg">
            <GlGuard>
              <Canvas
                frameloop={paused ? 'never' : 'always'}
                shadows
                dpr={IS_MOBILE ? [1, 1.4] : [1, 1.8]}
                camera={{ position: [1.2, 1.6, 4.6], fov: 42 }}
                style={{ position: 'absolute', inset: 0 }}
                flat
              >
                <Kitchen3D />
                <WarmRig />
              </Canvas>
            </GlGuard>
          </div>

          {/* hotspots */}
          {hotspots.map((h) => (
            <button
              key={h.id}
              onMouseEnter={() => setActive(h.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === h.id ? null : h.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group pointer-events-auto"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              aria-label={t[`hotspot.${h.id}`][lang]}
            >
              <span
                className={`block w-7 h-7 rounded-full border transition-all duration-300 ${
                  active === h.id ? 'scale-125 border-ember bg-ember/30' : 'border-aqua/60 bg-aqua/15'
                }`}
                style={{ boxShadow: active === h.id ? '0 0 20px rgba(255,122,69,0.5)' : '0 0 14px rgba(53,214,196,0.35)' }}
              />
              <span className="absolute -inset-2 rounded-full border border-aqua/30 animate-ping" style={{ animationDuration: '3s' }} />
            </button>
          ))}

          {/* label card */}
          <AnimatePresence>
            {selectedText && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-4 left-4 md:left-8 max-w-sm glass-dark rounded-2xl px-6 py-4 pointer-events-none"
              >
                <p className="text-[10px] tracking-[0.3em] uppercase text-ember mb-1.5">{t[selectedText.titleKey][lang]}</p>
                <p className="text-sm text-cream/80 leading-relaxed">{t[selectedText.bodyKey][lang]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function WarmRig() {
  useFrame((state, delta) => {
    const c = state.camera;
    const p = state.pointer;
    c.position.x = 1.2 - p.x * 0.6;
    c.position.y = 1.6 - p.y * 0.4;
    c.lookAt(0, 0.15, 0);
    void delta;
  });
  return null;
}