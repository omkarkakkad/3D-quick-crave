import { useEffect, useRef } from 'react';

interface FishSpec {
  name: string;
  top: string;
  deep: string;
  belly: string;
  accent: string;
  aspect: number;
  tail: 'fork' | 'long-fork' | 'round';
  dorsal: 'low' | 'tall' | 'sail';
  pattern: 'none' | 'bars' | 'wavy' | 'streak';
  bars: number;
}

const SPECIES: FishSpec[] = [
  { name: 'Surmai', top: '#7f9bb2', deep: '#2c4457', belly: '#e7f0f5', accent: '#c3dae6', aspect: 2.6, tail: 'fork', dorsal: 'low', pattern: 'bars', bars: 6 },
  { name: 'Bangda', top: '#4c7783', deep: '#203f49', belly: '#dce9e4', accent: '#93c8bc', aspect: 2.0, tail: 'fork', dorsal: 'low', pattern: 'wavy', bars: 7 },
  { name: 'Mackerel', top: '#5e8259', deep: '#28503a', belly: '#eaf0d9', accent: '#b3d09a', aspect: 2.25, tail: 'fork', dorsal: 'low', pattern: 'bars', bars: 5 },
];

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  heading: number;
  dir: -1 | 1;
  species: number;
  size: number;
  depth: number;
  phase: number;
  cruise: number;
  wobble: number;
  pace: number;
  sprint: number;
}

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  phase: number;
}

const NOSE_X = 0.5;
const TAIL_BASE_X = -0.44;

function fishX(u: number, L: number): number {
  return NOSE_X * L - u * (NOSE_X * L - TAIL_BASE_X * L);
}

function waveY(u: number, L: number, H: number, time: number, phase: number, wobble: number, pace: number): number {
  const spin = time * 2.6 * pace + phase;
  const amp = 0.05 + u * 0.4;
  return Math.sin(spin + u * 3.1) * H * amp * (0.28 + wobble * 0.85);
}

function bodyHalf(u: number, halfH: number): number {
  const w = Math.sin(Math.PI * Math.pow(u, 0.85)) * 0.62 + 0.2;
  let v = w * halfH;
  if (u < 0.14) v -= ((0.14 - u) / 0.14) * 0.11 * halfH;
  return v;
}

interface BodyCtx {
  spec: FishSpec;
  L: number;
  H: number;
  halfH: number;
  time: number;
  phase: number;
  wobble: number;
  pace: number;
}

function bodyPath(ctx: CanvasRenderingContext2D, c: BodyCtx): void {
  const { L, H, halfH, time, phase, wobble, pace } = c;
  const N = 17;
  const top: Array<[number, number]> = [];
  const bot: Array<[number, number]> = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    const x = fishX(u, L);
    const y = waveY(u, L, H, time, phase, wobble, pace);
    const hw = bodyHalf(u, halfH);
    top.push([x, y - hw]);
    bot.push([x, y + hw]);
  }
  ctx.beginPath();
  ctx.moveTo(top[0][0], top[0][1]);
  for (let i = 1; i <= N; i++) ctx.lineTo(top[i][0], top[i][1]);
  for (let i = N; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]);
  ctx.closePath();
}

function drawFishSprite(
  ctx: CanvasRenderingContext2D,
  spec: FishSpec,
  size: number,
  phase: number,
  time: number,
  wobble: number,
  alpha: number,
  heading: number,
  pace: number
): void {
  const L = 34 * size;
  const H = L / spec.aspect;
  const halfH = H / 2;
  const c: BodyCtx = { spec, L, H, halfH, time, phase, wobble, pace };
  const fX = (u: number) => fishX(u, L);
  const wY = (u: number) => waveY(u, L, H, time, phase, wobble, pace);

  ctx.save();
  // keep the fish upright: rotate only the "bank angle" and mirror when heading left
  const faceRight = Math.cos(heading) >= 0;
  const bank = faceRight ? heading : heading > 0 ? heading - Math.PI : heading + Math.PI;
  ctx.rotate(bank);
  ctx.scale(faceRight ? 1 : -1, 1);
  ctx.globalAlpha = alpha;

  const tBaseX = TAIL_BASE_X * L;
  const tY = wY(1);
  const wBase = bodyHalf(1, halfH);
  const swing = Math.sin((time * 2.8 + phase) * pace + 3.1) * (0.42 + wobble * 1.1);
  const tlen = L * 0.34;
  const spread = H * 0.3;

  // --- tail ---
  const tg = ctx.createLinearGradient(tBaseX - tlen, 0, tBaseX, 0);
  tg.addColorStop(0, spec.deep);
  tg.addColorStop(1, spec.accent);
  ctx.fillStyle = tg;

  const lobe = (up: boolean) => {
    const s = up ? -1 : 1;
    ctx.beginPath();
    ctx.moveTo(tBaseX, tY + s * wBase);
    ctx.quadraticCurveTo(tBaseX - tlen * 0.5, tY - swing * tlen * 0.4 + s * spread * 0.55, tBaseX - tlen, tY - swing * tlen * 0.8 + s * spread);
    ctx.quadraticCurveTo(tBaseX - tlen * 0.55, tY - swing * tlen * 0.35 + s * spread * 0.3, tBaseX - tlen * 0.14, tY - swing * tlen * 0.08);
    ctx.closePath();
    ctx.fill();
  };
  if (spec.tail === 'round') {
    ctx.beginPath();
    ctx.moveTo(tBaseX, tY - wBase);
    ctx.quadraticCurveTo(tBaseX - tlen * 0.7, tY - swing * tlen * 0.5 - spread * 0.25, tBaseX - tlen * 0.9, tY - swing * tlen * 0.5);
    ctx.quadraticCurveTo(tBaseX - tlen * 0.7, tY - swing * tlen * 0.5 + spread * 0.3, tBaseX - tlen * 0.4, tY - swing * tlen * 0.25 + spread * 0.1);
    ctx.quadraticCurveTo(tBaseX - tlen * 0.1, tY + wBase * 0.6, tBaseX, tY + wBase);
    ctx.lineTo(tBaseX, tY + wBase);
    ctx.closePath();
    ctx.fill();
  } else {
    lobe(true);
    lobe(false);
    if (spec.tail === 'long-fork') {
      ctx.strokeStyle = spec.accent;
      ctx.globalAlpha = alpha * 0.5;
      ctx.lineWidth = Math.max(0.6, halfH * 0.08);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tBaseX - tlen * 0.5, tY - swing * tlen * 0.3 - spread * 0.4);
      ctx.quadraticCurveTo(tBaseX - tlen * 1.05, tY - swing * tlen * 0.4 - spread * 0.5, tBaseX - tlen * 1.75, tY - swing * tlen * 0.55 - spread * 0.75);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(tBaseX - tlen * 0.5, tY - swing * tlen * 0.3 + spread * 0.4);
      ctx.quadraticCurveTo(tBaseX - tlen * 1.05, tY - swing * tlen * 0.4 + spread * 0.5, tBaseX - tlen * 1.75, tY - swing * tlen * 0.55 + spread * 0.75);
      ctx.stroke();
      ctx.globalAlpha = alpha;
    }
  }

  // --- body ---
  bodyPath(ctx, c);
  const g = ctx.createLinearGradient(0, -halfH * 0.98, 0, halfH * 0.98);
  g.addColorStop(0, spec.deep);
  g.addColorStop(0.42, spec.top);
  g.addColorStop(0.94, spec.belly);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = 'rgba(8,16,32,0.45)';
  ctx.lineWidth = 0.7;
  ctx.stroke();

  // --- dorsal fin ---
  const d0 = 0.26;
  const d1 = 0.52;
  const dx0 = fX(d0);
  const dx1 = fX(d1);
  const dy0 = wY(d0) - bodyHalf(d0, halfH);
  const dy1 = wY(d1) - bodyHalf(d1, halfH);
  const dYmid = wY(0.4) - bodyHalf(0.4, halfH);
  const dH = spec.dorsal === 'low' ? H * 0.26 : spec.dorsal === 'tall' ? H * 0.42 : H * 0.5;
  ctx.beginPath();
  if (spec.dorsal === 'sail') {
    ctx.moveTo(dx0, dy0);
    ctx.quadraticCurveTo((dx0 + dx1) / 2, dYmid - dH * 1.3, dx1, dy1);
  } else {
    ctx.moveTo(dx0, dy0);
    ctx.quadraticCurveTo((dx0 + dx1) / 2, dYmid - dH, dx1, dy1);
  }
  ctx.quadraticCurveTo((dx0 + dx1) / 2, (dy0 + dy1) / 2 + halfH * 0.12, dx0, dy0);
  ctx.closePath();
  const dg = ctx.createLinearGradient(0, dYmid - dH, 0, dy0 + 1);
  dg.addColorStop(0, spec.accent);
  dg.addColorStop(1, spec.deep);
  ctx.fillStyle = dg;
  ctx.globalAlpha = alpha * 0.6;
  ctx.fill();
  ctx.globalAlpha = alpha;

  // --- anal fin ---
  const a0 = 0.54;
  const a1 = 0.68;
  const ax0 = fX(a0);
  const ax1 = fX(a1);
  const ay0 = wY(a0) + bodyHalf(a0, halfH);
  const ay1 = wY(a1) + bodyHalf(a1, halfH);
  ctx.beginPath();
  ctx.moveTo(ax0, ay0);
  ctx.quadraticCurveTo((ax0 + ax1) / 2, (ay0 + ay1) / 2 + H * 0.16, ax1, ay1);
  ctx.quadraticCurveTo((ax0 + ax1) / 2, (ay0 + ay1) / 2 - halfH * 0.06, ax0, ay0);
  ctx.closePath();
  ctx.fillStyle = spec.deep;
  ctx.globalAlpha = alpha * 0.5;
  ctx.fill();
  ctx.globalAlpha = alpha;

  // --- pectoral fin ---
  const ppx = fX(0.22);
  const ppy = wY(0.22);
  ctx.save();
  ctx.translate(ppx, ppy + halfH * 0.18);
  ctx.rotate(wobble * 0.7 - 0.25);
  ctx.beginPath();
  ctx.ellipse(0, 0, H * 0.2, H * 0.075, 0, 0, Math.PI * 2);
  ctx.fillStyle = spec.deep;
  ctx.globalAlpha = alpha * 0.55;
  ctx.fill();
  ctx.restore();
  ctx.globalAlpha = alpha;

  // --- patterns (clipped to body) ---
  if (spec.pattern !== 'none') {
    ctx.save();
    bodyPath(ctx, c);
    ctx.clip();
    if (spec.pattern === 'bars') {
      ctx.strokeStyle = spec.deep;
      ctx.lineCap = 'round';
      for (let k = 0; k < spec.bars; k++) {
        const u = 0.2 + (k / spec.bars) * 0.68;
        const bx = fX(u);
        const by = wY(u);
        const bh = bodyHalf(u, halfH);
        ctx.beginPath();
        ctx.moveTo(bx, by - bh * 0.98);
        ctx.quadraticCurveTo(bx + bh * 0.3, by, bx, by + bh * 0.9);
        ctx.lineWidth = Math.max(0.6, H * 0.05);
        ctx.globalAlpha = alpha * 0.36;
        ctx.stroke();
      }
      ctx.globalAlpha = alpha;
    } else if (spec.pattern === 'wavy') {
      ctx.strokeStyle = spec.deep;
      ctx.lineCap = 'round';
      for (let k = 0; k < spec.bars; k++) {
        const t = spec.bars === 1 ? 0.5 : k / (spec.bars - 1);
        const lat = (-0.5 + t) * halfH * 0.7;
        ctx.beginPath();
        const steps = 9;
        for (let i = 0; i <= steps; i++) {
          const u = 0.16 + (i / steps) * 0.72;
          const x = fX(u);
          const yy = wY(u) + lat + Math.sin(u * 14 + phase) * halfH * 0.07;
          if (i === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.lineWidth = Math.max(0.5, halfH * 0.07);
        ctx.globalAlpha = alpha * 0.34;
        ctx.stroke();
      }
      ctx.globalAlpha = alpha;
    } else {
      const sx = fX(0.3);
      const syy = wY(0.3) - halfH * 0.34;
      ctx.beginPath();
      ctx.arc(sx, syy, halfH * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = spec.accent;
      ctx.globalAlpha = alpha * 0.85;
      ctx.fill();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = spec.accent;
      ctx.lineWidth = halfH * 0.06;
      ctx.beginPath();
      ctx.moveTo(fX(0.22), -halfH * 0.12);
      ctx.lineTo(fX(0.6), -halfH * 0.12);
      ctx.globalAlpha = alpha * 0.4;
      ctx.stroke();
      ctx.globalAlpha = alpha;
    }
    ctx.restore();
  }

  // --- gill arcs ---
  const gx = fX(0.26);
  const gy = wY(0.26);
  const gh = bodyHalf(0.26, halfH);
  ctx.strokeStyle = spec.deep;
  ctx.globalAlpha = alpha * 0.4;
  ctx.lineWidth = Math.max(0.5, halfH * 0.08);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(gx + halfH * 0.06, gy - gh * 0.55);
  ctx.quadraticCurveTo(gx - halfH * 0.1, gy, gx + halfH * 0.06, gy + gh * 0.6);
  ctx.stroke();
  ctx.globalAlpha = alpha;

  // --- eye ---
  const ex = fX(0.13);
  const ey = wY(0.13) - bodyHalf(0.13, halfH) * 0.5;
  const er = halfH * 0.2;
  ctx.beginPath();
  ctx.arc(ex, ey, er, 0, Math.PI * 2);
  ctx.fillStyle = '#0d1526';
  ctx.fill();
  ctx.strokeStyle = spec.accent;
  ctx.globalAlpha = alpha * 0.65;
  ctx.lineWidth = 0.6;
  ctx.stroke();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(ex + er * 0.35, ey - er * 0.35, er * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.fill();

  // --- gloss highlight ---
  ctx.beginPath();
  ctx.moveTo(fX(0.18), wY(0.18) - halfH * 0.12);
  ctx.quadraticCurveTo(fX(0.34), wY(0.34) - halfH * 0.34, fX(0.52), wY(0.52) - halfH * 0.2);
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = halfH * 0.13;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.restore();
}

function drawCaustics(ctx: CanvasRenderingContext2D, w: number, h: number, now: number): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const t = now / 1000;
  for (let i = 0; i < 5; i++) {
    const p = t * 0.045 + i * 0.21;
    const lx = ((p * 1300) % (w + 700)) - 350;
    const ly = h * 0.3 + Math.sin(t * 0.5 + i * 2.2) * h * 0.3;
    const r = 110 + (i % 3) * 46;
    const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, r);
    g.addColorStop(0, 'rgba(178,231,222,0.055)');
    g.addColorStop(1, 'rgba(178,231,222,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(lx, ly, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function FishOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cvs = canvas;
    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    let animFrame: number;
    let lastTime = performance.now();
    let paused = false;
    let disposed = false;
    let mouseX = -1000;
    let mouseY = -1000;
    let tooltipName = '';
    let tooltipX = 0;
    let tooltipY = 0;
    let tooltipUntil = 0;
    let tooltipAlpha = 0;
    let lastAmbient = performance.now();
    let nextDartAt = performance.now() + 700;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth < 768;
    const maxFish = isSmallScreen ? 14 : 26;

    const bubbles: Bubble[] = [];
    const fishArr: Fish[] = [];

    for (let i = 0; i < maxFish; i++) {
      const dir: -1 | 1 = Math.random() > 0.24 ? -1 : 1;
      const depth = 0.5 + Math.random() * 0.5;
      fishArr.push({
        x: Math.random() * (window.innerWidth + 200) - 100,
        y: Math.random() * window.innerHeight,
        vx: dir * (0.4 + Math.random() * 0.9),
        vy: (Math.random() - 0.5) * 0.4,
        heading: dir === -1 ? Math.PI : 0,
        dir,
        species: Math.floor(Math.random() * SPECIES.length),
        size: 0.85 + Math.random() * 0.95,
        depth,
        phase: Math.random() * Math.PI * 2,
        cruise: 0.9 + Math.random() * 0.9,
        wobble: 0,
        pace: 0.75 + Math.random() * 0.9,
        sprint: 0,
      });
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cvs.width = window.innerWidth * dpr;
      cvs.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function drawStatic(): void {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      drawCaustics(ctx, w, h, 0);
      const sorted = [...fishArr].sort((a, b) => a.depth - b.depth);
      for (const f of sorted) {
        const spec = SPECIES[f.species];
        const alpha = 0.35 + 0.5 * f.depth;
        ctx.save();
        ctx.translate(f.x, f.y);
        drawFishSprite(ctx, spec, f.size, f.phase, 6000, 0.4, alpha, f.heading, f.pace);
        ctx.restore();
      }
    }

    function onPointerMove(e: PointerEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function onPointerDown(e: PointerEvent) {
      let closest = Infinity;
      let closestFish: Fish | null = null;
      for (const f of fishArr) {
        const dx = f.x - e.clientX;
        const dy = f.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closest) {
          closest = dist;
          closestFish = f;
        }
      }
      if (closestFish && closest < 130) {
        for (let i = 0; i < 6; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.5 + Math.random() * 1.6;
          bubbles.push({
            x: e.clientX + (Math.random() - 0.5) * 24,
            y: e.clientY + (Math.random() - 0.5) * 24,
            vx: Math.cos(angle) * speed,
            vy: -0.6 - Math.random() * 1.8,
            alpha: 0.85,
            size: 2.5 + Math.random() * 5,
            life: 1,
            phase: Math.random() * Math.PI * 2,
          });
        }
        for (const f of fishArr) {
          const dx = f.x - e.clientX;
          const dy = f.y - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const pushAngle = Math.atan2(dy, dx);
            f.vx += Math.cos(pushAngle) * 3;
            f.vy += Math.sin(pushAngle) * 3;
            f.wobble = 1;
          }
        }
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    function onVisibility() {
      if (document.hidden) {
        paused = true;
        cancelAnimationFrame(animFrame);
      } else if (!disposed) {
        paused = false;
        lastTime = performance.now();
        animFrame = requestAnimationFrame(loop);
      }
    }
    document.addEventListener('visibilitychange', onVisibility);

const RC2 = 270 * 270;
    const RA2 = 230 * 230;
    const RS = 50;

    function loop(now: number) {
      if (paused || disposed) return;
      const dt = Math.min((now - lastTime) / 1000, 0.045);
      lastTime = now;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      drawCaustics(ctx, w, h, now);

      // dart bursts - a fish periodically sprints through the school
      if (now > nextDartAt) {
        const candidates = fishArr.filter((f) => f.sprint <= 0.05);
        if (candidates.length > 0) {
          const target = candidates[Math.floor(Math.random() * candidates.length)];
          target.sprint = 1;
          target.wobble = 1;
        }
        nextDartAt = now + 500 + Math.random() * 1400;
      }

      let nearestDist = Infinity;
      let nearestFish: Fish | null = null;

      // schooling + mouse flee
      for (const f of fishArr) {
        let cxn = 0;
        let cx = 0;
        let cy = 0;
        let axn = 0;
        let ax = 0;
        let ay = 0;
        let sxn = 0;
        let sx = 0;
        let sy = 0;

        for (const g of fishArr) {
          if (g === f) continue;
          const dx = g.x - f.x;
          const dy = g.y - f.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < RC2) {
            cxn++;
            cx += g.x;
            cy += g.y;
          }
          if (d2 < RA2) {
            axn++;
            ax += g.vx;
            ay += g.vy;
          }
          if (d2 < RS * RS) {
            const d = Math.sqrt(d2) || 1;
            const wgt = 1 - d / RS;
            sxn++;
            sx -= (dx / d) * wgt;
            sy -= (dy / d) * wgt;
          }
        }

        if (cxn > 0) {
          f.vx += ((cx / cxn - f.x) * 0.035) * dt * 60;
          f.vy += ((cy / cxn - f.y) * 0.035) * dt * 60;
        }
        if (axn > 0) {
          f.vx += ((ax / axn - f.vx) * 0.05) * dt * 60;
          f.vy += ((ay / axn - f.vy) * 0.05) * dt * 60;
        }
        if (sxn > 0) {
          f.vx += sx * 0.95 * dt * 60;
          f.vy += sy * 0.95 * dt * 60;
        }

        // mouse repel
        const mdx = f.x - mouseX;
        const mdy = f.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const touchRange = 84;
        if (mdist < touchRange) {
          const push = (1 - mdist / touchRange) * 3.6 * dt * 60;
          f.vx += (mdx / (mdist || 1)) * push;
          f.vy += (mdy / (mdist || 1)) * push * 0.7;
          f.wobble = Math.min(f.wobble + dt * 5, 1);
          if (mdist < nearestDist) {
            nearestDist = mdist;
            nearestFish = f;
            tooltipName = SPECIES[f.species].name;
            tooltipX = f.x;
            tooltipY = f.y - 26;
            tooltipUntil = now + 1600;
          }
        } else {
          f.wobble = Math.max(f.wobble - dt * 1.9, 0);
        }

        // decay darting sprint
        f.sprint = Math.max(0, f.sprint - dt * 1.1);

        // cruise toward preferred direction + gentle wander
        const boost = 1 + f.sprint * 1.1;
        f.vx += (f.dir * f.cruise * boost * (0.9 + f.depth * 0.35) - f.vx) * 0.022 * dt * 60;
        f.vy += (Math.sin(now / 1100 + f.phase) * 0.3 - f.vy) * 0.012 * dt * 60;

        // damp + clamp
        const sp = Math.sqrt(f.vx * f.vx + f.vy * f.vy);
        const maxSp = 3.4;
        if (sp > maxSp) {
          f.vx = (f.vx / sp) * maxSp;
          f.vy = (f.vy / sp) * maxSp;
        }

        // flip heading when strong horizontal turn
        if (Math.abs(f.vx) > 0.28) f.dir = f.vx > 0 ? 1 : -1;

        const targetH = Math.atan2(f.vy, f.vx);
        let dh = targetH - f.heading;
        dh = Math.atan2(Math.sin(dh), Math.cos(dh));
        f.heading += dh * Math.min(dt * 8, 1);

        f.x += f.vx * dt * 60;
        f.y += f.vy * dt * 60;

        const m = 80;
        if (f.x < -m) f.x = w + m;
        else if (f.x > w + m) f.x = -m;
        if (f.y < -m) f.y = h + m;
        else if (f.y > h + m) f.y = -m;
      }

      // draw fish back-to-front
      const sorted = [...fishArr].sort((a, b) => a.depth - b.depth);
      for (const f of sorted) {
        const spec = SPECIES[f.species];
        const alpha = 0.38 + 0.5 * f.depth;
        ctx.save();
        ctx.translate(f.x, f.y);
        drawFishSprite(ctx, spec, f.size * (0.7 + 0.5 * f.depth), f.phase, now, f.wobble, alpha, f.heading, f.pace);
        ctx.restore();
      }

      // ambient bubbles
      if (now - lastAmbient > 1500) {
        lastAmbient = now;
        bubbles.push({
          x: window.innerWidth * (0.12 + Math.random() * 0.76),
          y: window.innerHeight + 10,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.35 - Math.random() * 0.7,
          alpha: 0.5,
          size: 2 + Math.random() * 4,
          life: 1,
          phase: Math.random() * Math.PI * 2,
        });
      }

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.x += (b.vx + Math.sin(now / 500 + b.phase) * 0.25) * dt * 60;
        b.y += b.vy * dt * 60;
        b.life -= dt * 1.35;
        b.alpha = Math.max(0, b.life) * 0.75;
        b.size *= 1 + dt * 0.25;
        if (b.life <= 0) {
          bubbles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 230, 250, ${b.alpha * 0.22})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(240, 252, 255, ${b.alpha * 0.85})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(b.x - b.size * 0.28, b.y - b.size * 0.28, b.size * 0.24, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${b.alpha * 0.55})`;
        ctx.fill();
      }

      // tooltip
      const remain = tooltipUntil > 0 ? (tooltipUntil - now) / 1000 : -1;
      if (remain > -0.5 && tooltipName && nearestFish) {
        tooltipAlpha = remain < 0 ? Math.max(0, (remain + 0.5) / 0.5) : Math.min(1, tooltipAlpha + dt * 6);
        const tw = ctx.measureText(tooltipName).width + 26;
        ctx.save();
        ctx.globalAlpha = tooltipAlpha * 0.92;
        const bx = tooltipX;
        const by = tooltipY;
        const gr = ctx.createLinearGradient(0, by - 20, 0, by);
        gr.addColorStop(0, 'rgba(8,26,46,0.9)');
        gr.addColorStop(1, 'rgba(4,16,32,0.94)');
        ctx.fillStyle = gr;
        ctx.strokeStyle = 'rgba(53,214,196,0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(bx - tw / 2, by - 20, tw, 22, 8);
        } else {
          const rx = bx - tw / 2;
          const ry = by - 20;
          const rw = tw;
          const rh = 22;
          ctx.moveTo(rx + 8, ry);
          ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, 8);
          ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, 8);
          ctx.arcTo(rx, ry + rh, rx, ry, 8);
          ctx.arcTo(rx, ry, rx + rw, ry, 8);
          ctx.closePath();
        }
        ctx.fill();
        ctx.stroke();
        ctx.font = '600 12px "Noto Sans Devanagari", system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#7fe8dc';
        ctx.fillText(tooltipName, bx, by - 9);
        ctx.restore();
      } else {
        tooltipAlpha = 0;
        tooltipName = '';
      }

      if (!prefersReduced) animFrame = requestAnimationFrame(loop);
    }

    if (prefersReduced) {
      drawStatic();
    } else {
      animFrame = requestAnimationFrame(loop);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 15, opacity: 0.62 }}
      aria-hidden="true"
    />
  );
}