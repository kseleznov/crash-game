import { useSoundStore } from "./soundStore";

const sounds = {
  win: new Audio("/sounds/win.mp3"),
  lose: new Audio("/sounds/lose.mp3"),
  start: new Audio("/sounds/start.mp3"),
  tick: new Audio("/sounds/tick.wav"),
  waiting: new Audio("/sounds/waiting.mp3"),
};

export function playSound(soundName: keyof typeof sounds) {
  if (useSoundStore.getState().isMuted) return;
  const sound = sounds[soundName];
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
}
