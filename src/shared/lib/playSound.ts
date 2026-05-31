import { useSoundStore } from "./soundStore";

const soundFiles = {
  win: "/sounds/win.mp3",
  lose: "/sounds/lose.mp3",
  start: "/sounds/start.mp3",
  tick: "/sounds/tick.wav",
  waiting: "/sounds/waiting.mp3",
} as const;

const cache = new Map<string, HTMLAudioElement>();

/**
 * Returns a cached HTMLAudioElement for the given src, creating one on first access.
 * Caching avoids repeated DOM element creation for the same sound file.
 */
function getAudio(src: string): HTMLAudioElement {
  const existing = cache.get(src);

  if (existing) {
    return existing;
  }

  const audio = new Audio(src);

  cache.set(src, audio);

  return audio;
}

/**
 * Plays a sound by name. No-ops on the server (SSR) or when the user has muted audio.
 * Resets playback to the start before playing, so rapid calls restart the sound instead of queuing.
 * Errors from `audio.play()` (e.g. autoplay policy) are silently ignored.
 */
export function playSound(soundName: keyof typeof soundFiles) {
  if (typeof window === "undefined") {
    return;
  }

  if (useSoundStore.getState().isMuted) {
    return;
  }

  const audio = getAudio(soundFiles[soundName]);

  audio.currentTime = 0;

  audio.play().catch(() => {});
}
