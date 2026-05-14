"use client";

import { useSyncExternalStore } from "react";
import { getApiKey } from "@/shared/lib/apiKey";
import { useSignOut } from "../model/useSignOut";
import { SoundToggle } from "@/shared/ui/toggle-sound/ToggleSound";

export function SignOut() {
  const username = useSyncExternalStore(
    () => () => {},
    getApiKey,
    () => "",
  );
  const signOut = useSignOut();

  return (
    <div className="px-4 py-3 flex gap-4 bg-[#1A1F2E] rounded-2xl">
      <span className="text-white">{username}</span>
      <button onClick={signOut} className="cursor-pointer">
        <span className="text-red-100">sign out</span>
      </button>
      <SoundToggle />
    </div>
  );
}
