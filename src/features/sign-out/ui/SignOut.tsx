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
    <div className="pt-[10px] pr-[10px] pb-[10px] pl-[10px] flex gap-[8px] bg-[#1A1F2E] rounded-[16px]">
      <span className="text-white">{username}</span>
      <button onClick={signOut}>
        <span className="text-red-100">sign out</span>
      </button>
      <SoundToggle />
    </div>
  );
}
