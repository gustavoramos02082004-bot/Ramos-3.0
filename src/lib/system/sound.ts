export function chime(kind: "good" | "great" | "bad") {
  if (typeof window === "undefined") return;
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const notes = kind === "great" ? [523, 659, 784, 1046] : kind === "bad" ? [196, 146] : [659, 880];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);
      const t = now + i * 0.08;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.045, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
      osc.start(t);
      osc.stop(t + 0.25);
    });
    window.setTimeout(() => void ctx.close(), 1400);
  } catch {
    /* autoplay or unsupported */
  }
}
