import { useSoundStore } from "@/shared/lib/soundStore";
import { cn } from "@/shared/lib/cn";

function SoundOnIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export function SoundToggle() {
  const { isMuted, toggleMute } = useSoundStore();

  return (
    <button
      onClick={toggleMute}
      title={isMuted ? "Enable sound" : "Disable sound"}
      className={cn(
        "w-10 h-10 rounded-lg border flex items-center justify-center transition-colors cursor-pointer",
        "bg-[#1E2535] border-[#2D3A55] hover:border-[#4A6091]",
        isMuted ? "text-[#6B7A99]" : "text-white",
      )}
    >
      {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
    </button>
  );
}
