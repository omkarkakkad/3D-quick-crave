import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, plateTotal, type Seafood, type Style, type Drink } from '../store/useStore';
import { t } from '../i18n/translations';
import { FishModel } from '../three/underwater/FishModel';
import { SectionTitle } from '../components/ui/SectionTitle';
import { GlGuard } from '../components/ui/GlGuard';
import { usePausableCanvas } from '../lib/usePausableCanvas';

const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

const seafoodOptions: { value: Seafood; label: string; species: string }[] = [
  { value: 'Pomfret', label: 'Pomfret', species: 'pomfret' },
  { value: 'Surmai', label: 'Surmai', species: 'surmai' },
  { value: 'Bangda', label: 'Bangda', species: 'bangda' },
  { value: 'Prawns', label: 'Prawns', species: 'prawns' },
  { value: 'Crab', label: 'Crab', species: 'crab' }
];

const styleOptions: Style[] = ['Fry', 'Malvani Curry', 'Tandoori'];
const drinkOptions: Drink[] = ['Kokum Sarbat', 'Sol Kadi'];

function usePlateFor(seafood: Seafood, style: Style) {
  const group = useRef<THREE.Group>(null);
  const entry = useRef(0);

  useEffect(() => {
    entry.current = 0;
  }, [seafood, style]);

  useFrame((_, delta) => {
    entry.current = Math.min(entry.current + delta * 3.2, 1);
    if (group.current) {
      const e = 1 - Math.pow(1 - entry.current, 3);
      group.current.scale.setScalar(Math.max(0.001, e));
      group.current.position.y = -0.05 + (1 - e) * 0.5;
    }
  });

  return { group, entry };
}

function CrabModel({ scale = 1 }: { scale?: number }) {
  return (
    <group scale={scale}>
      {[-1, 1].map((s) =>
        [0, 1, 2].map((i) => (
          <mesh key={`${s}${i}`} position={[-0.9 * s - 0.22 - i * 0.24 * s, -0.06, 0.1 + (i % 2) * 0.34]} rotation={[0, 0, 0.5 * s]}>
            <cylinderGeometry args={[0.06, 0.05, 0.5, 5]} />
            <meshStandardMaterial color="#c44422" roughness={0.6} />
          </mesh>
        ))
      )}
      {/* claws */}
      <mesh position={[-0.75, 0.16, 0.32]} rotation={[0, 0, 0.7]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#d04a26" roughness={0.55} />
      </mesh>
      <mesh position={[0.75, 0.16, 0.32]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#d04a26" roughness={0.55} />
      </mesh>
      {/* shell */}
      <mesh scale={[1, 0.5, 0.75]}>
        <sphereGeometry args={[0.52, 14, 12]} />
        <meshStandardMaterial color="#d04a26" roughness={0.5} />
      </mesh>
    </group>
  );
}

function SeafoodOnPlate({ seafood, style }: { seafood: Seafood; style: Style }) {
  const { group, entry } = usePlateFor(seafood, style);

  const renderFood = () => {
    if (seafood === 'Prawns') {
      return (
        <>
          {[[0.1, -0.1, 0], [-0.4, 0.05, 0.2], [0.45, 0.12, -0.15], [-0.05, 0.18, -0.25], [0.25, -0.2, 0.25]].map((p, i) => (
            <group key={i} position={p as [number, number, number]} rotation={[Math.PI / 2, i * 1.2, 0]} scale={[0.62, 0.62, 0.62]}>
              <FishModel species="prawns" scale={1} />
            </group>
          ))}
        </>
      );
    }
    if (seafood === 'Crab') {
      return style === 'Malvani Curry' ? null : <CrabModel scale={2.4} />;
    }
    const species = seafoodOptions.find((o) => o.value === seafood)?.species ?? 'pomfret';
    return (
      <group rotation={[Math.PI / 2, 0, 0.1]} scale={[1.55, 1.55, 1.55]}>
        <FishModel species={species} scale={1} />
      </group>
    );
  };

  const renderStyle = () => {
    if (style === 'Malvani Curry') {
      return (
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.95, 0.7, 0.5, 26]} />
            <meshStandardMaterial color="#2c1a12" roughness={0.6} metalness={0.4} />
          </mesh>
          <mesh position={[-0.3, 0.42, 0.1]}>
            <cylinderGeometry args={[0.8, 0.8, 0.06, 26]} />
            <meshStandardMaterial color="#9c4a1e" roughness={0.7} />
          </mesh>
          <mesh position={[0.2, 0.45, -0.2]}>
            <sphereGeometry args={[0.16, 10, 10]} />
            <meshStandardMaterial color="#e8a758" roughness={0.8} />
          </mesh>
          <mesh position={[-0.4, 0.5, -0.15]}>
            <sphereGeometry args={[0.13, 10, 10]} />
            <meshStandardMaterial color="#e8a758" roughness={0.8} />
          </mesh>
          {/* curry leaves */}
          <mesh position={[0.4, 0.5, 0.35]} scale={[0.2, 0.4, 0.1]} rotation={[0, 0, 0.5]}>
            <sphereGeometry args={[0.5, 8, 6]} />
            <meshStandardMaterial color="#2e6e3f" roughness={0.35} />
          </mesh>
        </group>
      );
    }
    if (style === 'Tandoori') {
      return (
        <group position={[0, 0.22, 0]}>
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[1.3, 1.05, 0.14, 30]} />
            <meshStandardMaterial color="#e8dcc6" roughness={0.4} />
          </mesh>
          {/* skewers */}
          <mesh position={[0, 0.55, 0]} rotation={[0.2, -0.4, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.1, 6]} />
            <meshStandardMaterial color="#8a7a5a" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.55, 0]} rotation={[0.2, 0.5, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.1, 6]} />
            <meshStandardMaterial color="#8a7a5a" roughness={0.7} />
          </mesh>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={`a${i}`} position={[(i - 1.5) * 0.24, 0.4 + (i % 2) * 0.12, 0.05]} scale={[0.3, 0.2, 0.3]}>
              <sphereGeometry args={[0.28, 10, 10]} />
              <meshStandardMaterial color="#e05a2e" roughness={0.45} />
            </mesh>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <mesh key={`b${i}`} position={[(i - 1.5) * 0.24, 0.55 - (i % 2) * 0.12, -0.05]} scale={[0.3, 0.2, 0.3]}>
              <sphereGeometry args={[0.28, 10, 10]} />
              <meshStandardMaterial color="#d04a26" roughness={0.45} />
            </mesh>
          ))}
          {/* fire glow */}
          <pointLight position={[0, 0.2, 0.6]} intensity={2} distance={4} color="#ff7a45" />
        </group>
      );
    }
    return null;
  };

  return (
    <group ref={group} scale={0} position={[0, -0.05, 0]}>
      {seafood === 'Crab' && style === 'Malvani Curry' && (
        <group position={[0, 0.04, 0]} scale={[1.5, 1.5, 1.5]}>
          <CrabModel />
        </group>
      )}
      {renderFood()}
      {renderStyle()}
    </group>
  );
}

function DrinkModel({ drink }: { drink: Drink }) {
  const group = useRef<THREE.Group>(null);
  useEffect(() => {
    if (group.current) group.current.scale.set(0.01, 0.01, 0.01);
  }, [drink]);

  useFrame((_, delta) => {
    if (group.current) {
      const s = THREE.MathUtils.lerp(group.current.scale.x, 1, Math.min(delta * 3, 1));
      group.current.scale.set(s, s, s);
      group.current.position.y = -0.5 + s * 0.5;
    }
  });

  const isKokum = drink === 'Kokum Sarbat';

  return (
    <group ref={group} position={[2.3, -0.5, 0.6]}>
      {/* glass stem+bowl */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.42, 0.3, 1, 22]} />
        <meshStandardMaterial color={isKokum ? '#7a2438' : '#efe3c8'} roughness={0.25} metalness={0.2} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.34, 0.42, 0.16, 22]} />
        <meshStandardMaterial color={isKokum ? '#a03448' : '#f7f1e4'} roughness={0.2} transparent opacity={0.85} />
      </mesh>
      {/* liquid */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.37, 0.29, 0.55, 22]} />
        <meshStandardMaterial color={isKokum ? '#8e2740' : '#d9b98a'} roughness={0.4} transparent opacity={0.9} />
      </mesh>
      {/* rim + garnish */}
      <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.04, 12, 30]} />
        <meshStandardMaterial color={isKokum ? '#8e2740' : '#e9d878'} roughness={0.4} />
      </mesh>
      {isKokum ? (
        <group position={[0.18, 1.05, 0]} scale={0.16}>
          <FishModel species="prawns" scale={1} />
        </group>
      ) : (
        <group position={[-0.2, 1.02, 0.1]}>
          <mesh scale={[0.3, 0.5, 0.3]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshStandardMaterial color="#e05a2e" roughness={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function PlateBuilder3D() {
  const plate = useStore((s) => s.plate);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.24;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
      groupRef.current.position.x += (state.pointer.x * 0.6 - groupRef.current.position.x) * Math.min(delta * 1.5, 1);
    }
  });

  const seafoodSpecies: Record<string, string> = {
    Pomfret: 'pomfret',
    Surmai: 'surmai',
    Bangda: 'bangda',
    Prawns: 'prawns',
    Crab: 'crab'
  };

  return (
    <>
      <ambientLight intensity={0.55} color="#ffe4c8" />
      <directionalLight position={[4, 5, 3]} intensity={2.4} color="#fff2dd" castShadow />
      <pointLight position={[-4, 1, -2]} intensity={8} distance={12} color="#35d6c4" />
      <pointLight position={[0, 3.6, 2]} intensity={6} distance={10} color="#ffab6a" />

      {/* floor glow */}
      <mesh position={[0, -1.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.6, 40]} />
        <meshBasicMaterial color="#0f3b58" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, -1.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.05, 40]} />
        <meshBasicMaterial color="#35d6c4" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>

      <group ref={groupRef} position={[0, -0.4, 0]}>
        {/* platter */}
        <mesh position={[0, -0.28, 0]} castShadow>
          <cylinderGeometry args={[2.05, 1.8, 0.2, 40]} />
          <meshStandardMaterial color="#22304a" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[1.72, 1.72, 0.08, 40]} />
          <meshStandardMaterial color="#162032" roughness={0.4} metalness={0.4} />
        </mesh>
        <mesh position={[0, -0.13, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.03, 40]} />
          <meshStandardMaterial color="#0e1a2a" roughness={0.5} metalness={0.3} />
        </mesh>
        {/* inner aqua ring */}
        <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.35, 1.4, 40]} />
          <meshBasicMaterial color="#35d6c4" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>

        {/* food */}
        <AnimateFood key={`${plate.seafood}-${plate.style}`} seafood={plate.seafood} style={plate.style} />
        <DrinkModel drink={plate.drink} />

        {/* garnishes */}
        <Garnish />
      </group>
    </>
  );
}

function AnimateFood({ seafood, style }: { seafood: Seafood; style: Style }) {
  return <SeafoodOnPlate seafood={seafood} style={style} />;
}

function Garnish() {
  const spins = Math.PI;
  return (
    <group position={[0, 0.02, 0]} rotation={[0, spins, 0]}>
      {[[1.1, 0.2], [-1.15, 0.3], [0.5, -1.3], [-0.7, -1.25]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]} scale={0.07 + (i % 2) * 0.02}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial color={i % 2 ? '#e9d878' : '#3d8f4e'} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function PillRow<T extends string>({
  label,
  options,
  value,
  onChange,
  accent
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  accent: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: accent }}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-4 py-2.5 rounded-full text-xs tracking-wider transition-all duration-300 border active:scale-95 ${
              value === o
                ? 'bg-aqua/15 border-aqua/60 text-aqua-soft shadow-glow'
                : 'border-white/10 text-cream/60 hover:border-aqua/30 hover:text-cream hover:bg-aqua/5'
            }`}
          >
            {o.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BuildYourPlate() {
  const plate = useStore((s) => s.plate);
  const setSeafood = useStore((s) => s.setSeafood);
  const setStyle = useStore((s) => s.setStyle);
  const setDrink = useStore((s) => s.setDrink);
  const addToCart = useStore((s) => s.addToCart);
  const total = plateTotal(plate);
  const { ref: canvasWrap, paused } = usePausableCanvas();
  const lang = useStore((s) => s.lang);

  return (
    <section id="build-plate" className="section-anchor relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 section-bg" style={{ background: 'radial-gradient(ellipse at 50% 30%, #0a1c38 0%, #020b1a 75%)' }} />
      <div className="absolute inset-0 section-bg" style={{ background: 'linear-gradient(180deg, rgba(53,214,196,0.05), transparent 40%)' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          kicker={t['plate.kicker'][lang]}
          title={t['plate.title'][lang]}
        />

        <div className="grid lg:grid-cols-2 gap-10 items-center mt-14">
          {/* 3D builder */}
          <div className="relative h-[52vh] md:h-[70vh] rounded-[2.5rem] overflow-hidden border border-aqua/10 glass-promo">
            <div ref={canvasWrap} className="absolute inset-0 section-bg">
              <GlGuard>
                <Canvas
                  frameloop={paused ? 'never' : 'always'}
                  shadows
                  dpr={IS_MOBILE ? [1, 1.5] : [1, 1.8]}
                  camera={{ position: [0, 1.4, 7.5], fov: 45 }}
                  style={{ position: 'absolute', inset: 0 }}
                  flat
                >
                  <PlateBuilder3D />
                </Canvas>
              </GlGuard>
            </div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="text-[10px] tracking-[0.3em] uppercase text-seafoam/40">{t['plate.hint'][lang]}</span>
            </div>
          </div>

          {/* controls */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="glass rounded-3xl p-7 md:p-9"
            >
              <PillRow<Seafood>
                label={t['plate.seafood'][lang]}
                options={seafoodOptions.map((o) => o.value)}
                value={plate.seafood}
                onChange={setSeafood as (v: string) => void}
                accent="#35d6c4"
              />
              <PillRow<Style>
                label={t['plate.style'][lang]}
                options={styleOptions}
                value={plate.style}
                onChange={setStyle as (v: string) => void}
                accent="#ff7a45"
              />
              <PillRow<Drink>
                label={t['plate.drink'][lang]}
                options={drinkOptions}
                value={plate.drink}
                onChange={setDrink as (v: string) => void}
                accent="#ffb47a"
              />

              <div className="divider-reef my-6" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-seafoam/50">{t['plate.your'][lang]}</p>
                  <p className="font-display text-2xl md:text-3xl text-cream mt-1">
                    ₹{total}
                  </p>
                </div>
                <motion.button
                  key={`${plate.seafood}-${plate.style}-${plate.drink}`}
                  initial={{ scale: 1 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() =>
                    addToCart({
                      id: `plate-${plate.seafood}-${plate.style}-${plate.drink}`,
                      name: `${plate.seafood} ${plate.style} + ${plate.drink}`,
                      price: total,
                      category: 'BUILD YOUR PLATE'
                    })
                  }
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-ember-deep to-ember text-coconut text-sm font-semibold tracking-wide hover:brightness-110 hover:shadow-ember hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t['plate.add'][lang]}
                </motion.button>
              </div>
            </motion.div>

            <AnimatePresence>
              <motion.p
                key={`${plate.seafood}-${plate.style}-${plate.drink}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[15px] md:text-base text-seafoam/60 mt-5"
              >
                A {plate.seafood} {plate.style} + {plate.drink}. {t['plate.fresh'][lang]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}