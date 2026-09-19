import { useMemo } from 'react';
import * as THREE from 'three';

export interface SpeciesStyle {
  body: string;
  dark: string;
  accent: string;
  aspect: number; // length/height ratio
  rounded: boolean;
  tail: 'forked' | 'rounded';
}

export const speciesStyles: Record<string, SpeciesStyle> = {
  surmai: { body: '#2c4a63', dark: '#15283c', accent: '#7fb2ff', aspect: 2.1, rounded: false, tail: 'forked' },
  pomfret: { body: '#8fa3b8', dark: '#4a5f74', accent: '#efe3c8', aspect: 1.5, rounded: true, tail: 'forked' },
  bangda: { body: '#7c8fa0', dark: '#243746', accent: '#ff6a4d', aspect: 1.85, rounded: false, tail: 'forked' },
  smallie: { body: '#35677c', dark: '#12303f', accent: '#7fe8dc', aspect: 1.9, rounded: false, tail: 'forked' },
  silver: { body: '#5b6b7d', dark: '#1f2c3a', accent: '#efe3c8', aspect: 1.8, rounded: false, tail: 'rounded' }
};

interface FishModelProps {
  species: string;
  scale?: number;
  opacity?: number;
  seed?: number;
}

export function FishModel({ species, scale = 1, opacity = 1, seed = 1 }: FishModelProps) {
  const style = speciesStyles[species] ?? speciesStyles.smallie;
  const length = 1 * scale;
  const height = (1 / style.aspect) * scale;

  const bodyGeometry = useMemo(() => {
    let geo: THREE.BufferGeometry;
    if (style.rounded) {
      geo = new THREE.SphereGeometry(0.5, 22, 16);
      geo.scale(1, 0.6, 0.16);
    } else {
      geo = new THREE.SphereGeometry(0.5, 20, 14);
      geo.scale(1, 0.5, 0.13);
    }
    return geo;
  }, [style.rounded]);

  const seedOff = useMemo(() => seed || 1, [seed]);

  return (
    <group scale={[1, 1, 1]} rotation={[0, seedOff * 0.1, 0]}>
      {/* body (facing +X) */}
      <mesh geometry={bodyGeometry} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial
          color={style.body}
          roughness={0.55}
          metalness={0.15}
          transparent={opacity < 1}
          opacity={opacity}
          emissive={style.accent}
          emissiveIntensity={0.05}
        />
      </mesh>
      {/* belly */}
      <mesh position={[-0.08, -0.14, 0]} scale={[0.88, 0.5, 0.8]}>
        <sphereGeometry args={[0.3, 10, 8]} />
        <meshStandardMaterial color="#b8c2cc" transparent opacity={0.35} roughness={0.7} />
      </mesh>
      {/* tail */}
      <mesh position={[-0.5, 0, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[2.1 * 0.09, 0.42, 4]} />
        <meshStandardMaterial color={style.dark} roughness={0.6} transparent={opacity < 1} opacity={opacity} />
      </mesh>
      {/* dorsal fin */}
      <mesh position={[-0.2, 0.12, 0]} rotation={[0.2, 0, -0.1]}>
        <cylinderGeometry args={[0.09, 0.09, 0.3, 5]} />
        <meshStandardMaterial color={style.dark} roughness={0.6} transparent={opacity < 1} opacity={opacity} />
      </mesh>
      {/* eye */}
      <mesh position={[0.46, -0.05, 0.1]} rotation={[0, Math.PI / 2, 0]}>
        <sphereGeometry args={[0.033, 8, 8]} />
        <meshStandardMaterial color="#0b1020" emissive="#1a2f4a" emissiveIntensity={0.3} />
      </mesh>
      {/* lateral highlight */}
      <mesh position={[0.25, -0.02, -0.06]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.028, 0.028, 0.6, 6]} />
        <meshStandardMaterial color={style.accent} emissive={style.accent} emissiveIntensity={0.25} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}