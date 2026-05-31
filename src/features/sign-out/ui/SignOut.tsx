"use client";

import { useSyncExternalStore } from "react";
import { getApiKey } from "@/shared/lib/apiKey";
import { useSignOut } from "../model/useSignOut";
import { useSoundStore } from "@/shared/lib/soundStore";
import { LogOutIcon } from "./LogOutIcon";
import { VolumeOffIcon, VolumeOnIcon } from "./VolumeIcon";

export function SignOut() {
  const username = useSyncExternalStore(
    () => () => {},
    getApiKey,
    () => "",
  );
  const signOut = useSignOut();
  const { isMuted, toggleMute } = useSoundStore();

  return (
    <div className="flex items-center gap-3 ">
      <div className="bg-[#111620] rounded-2xl px-4 py-3 flex items-center gap-3 text-muted">
        <span className="text-sm">{username}</span>
        <button
          onClick={signOut}
          title="Sign out"
          className="cursor-pointer hover:text-input-value transition-colors"
        >
          <LogOutIcon />
        </button>
      </div>
      <button
        onClick={toggleMute}
        title={isMuted ? "Enable sound" : "Disable sound"}
        className="cursor-pointer hover:text-input-value transition-colors"
      >
        {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
      </button>
    </div>
  );
}
