import { createStore } from "./store";

export const soundOn = createStore("sound", false);

const TONES = { move: 660, select: 990, back: 330, unlock: 1320 } as const;
let ctx: AudioContext | undefined;

// Short square-wave blip, generated on the fly so there are no audio files.
export function blip(kind: keyof typeof TONES) {
  if (!soundOn.get()) return;
  try {
    ctx ??= new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = TONES[kind];
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {}
}
