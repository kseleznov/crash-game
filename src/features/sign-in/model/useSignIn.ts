"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trimValue } from "@/shared/lib/trimValue";
import { setApiKey } from "@/shared/lib/apiKey";
import type { HandlerEvent } from "@/shared/types";

export function useSignIn() {
  const [key, setKey] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const trimmedKey = trimValue(key);

  function handleSubmit(event: React.BaseSyntheticEvent) {
    event.preventDefault();

    setApiKey(trimmedKey, rememberMe);

    router.push("/game");
  }

  function usernameInputHandler(event: HandlerEvent) {
    setKey(event.target.value);
  }

  function rememberMeHandler(event: HandlerEvent) {
    setRememberMe(event.target.checked);
  }

  return {
    key,
    trimmedKey,
    rememberMe,
    handleSubmit,
    usernameInputHandler,
    rememberMeHandler,
  };
}
