let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let nodes: AudioNode[] = [];

export function initSound(): boolean {
  if (ctx) return true;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);

    // deep ocean ohm
    const ohm = ctx.createOscillator();
    ohm.type = 'sine';
    ohm.frequency.value = 68;
    const ohmGain = ctx.createGain();
    ohmGain.gain.value = 0.06;
    ohm.connect(ohmGain).connect(master);
    ohm.start();
    nodes.push(ohm);

    // wave noise (filtered)
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      const wave = Math.sin(2 * Math.PI * 0.12 * t) + 0.5 * Math.sin(2 * Math.PI * 0.05 * t + 2);
      data[i] = (Math.random() * 2 - 1) * (0.35 + 0.65 * Math.max(0, wave));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 420;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 90;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.16;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.09;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.09;
    lfo.connect(lfoGain).connect(noiseGain.gain);
    noise.connect(lp).connect(hp).connect(noiseGain).connect(master);
    noise.start();
    lfo.start();
    nodes.push(noise, lfo);
    return true;
  } catch {
    return false;
  }
}

export function startSound() {
  if (!ctx) initSound();
  if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
  if (master) master.gain.setTargetAtTime(0.5, ctx!.currentTime, 0.4);
}

export function stopSound() {
  if (ctx && master) master.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
}

export function toggleSound(on: boolean) {
  if (on) startSound();
  else stopSound();
}