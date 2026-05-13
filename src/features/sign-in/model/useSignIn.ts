"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { trimValue } from "@/shared/lib/trimValue";
import { setApiKey } from "@/shared/lib/apiKey";

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

  const usernameInputHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKey(event.target.value);
    },
    [setKey],
  );

  const rememberMeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRememberMe(event.target.checked);
    },
    [setRememberMe],
  );

  return {
    key,
    trimmedKey,
    rememberMe,
    handleSubmit,
    usernameInputHandler,
    rememberMeHandler,
  };
}
