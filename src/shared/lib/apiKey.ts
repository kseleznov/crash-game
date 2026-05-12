import { STORAGE_KEYS } from "@/shared/config/storage";

function getApiKey(): string {
  return (
    localStorage.getItem(STORAGE_KEYS.apiKey) ??
    sessionStorage.getItem(STORAGE_KEYS.apiKey) ??
    ""
  );
}

function setApiKey(key: string, remember: boolean): void {
  const maxAge = remember ? `; max-age=${60 * 60 * 24 * 30}` : "";
  document.cookie = `x-api-key=${encodeURIComponent(key)}; path=/; SameSite=Strict${maxAge}`;

  if (remember) {
    localStorage.setItem(STORAGE_KEYS.apiKey, key);
  } else {
    sessionStorage.setItem(STORAGE_KEYS.apiKey, key);
  }
}

function removeApiKey(): void {
  document.cookie = "x-api-key=; path=/; max-age=0";

  localStorage.removeItem(STORAGE_KEYS.apiKey);
  sessionStorage.removeItem(STORAGE_KEYS.apiKey);
}

export { getApiKey, setApiKey, removeApiKey };
