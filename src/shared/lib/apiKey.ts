import { STORAGE_KEYS } from "@/shared/config/storage";

/**
 * Retrieves the API key from storage.
 * Checks localStorage first (persisted across sessions), then sessionStorage (tab-scoped).
 * Returns an empty string if the key is not found in either storage.
 */
export function getApiKey() {
  return (
    localStorage.getItem(STORAGE_KEYS.apiKey) ??
    sessionStorage.getItem(STORAGE_KEYS.apiKey) ??
    ""
  );
}

/**
 * Saves the API key to storage and sets it as a cookie for server-side access.
 * If `remember` is true, persists in localStorage for 30 days; otherwise uses sessionStorage (cleared on tab close).
 * The cookie (`x-api-key`) is HttpOnly-safe, SameSite=Strict, and URL-encoded.
 */
export function setApiKey(key: string, remember: boolean) {
  const THIRTY_DAYS_IN_SECONDS = 2592000;
  const maxAge = remember ? `; max-age=${THIRTY_DAYS_IN_SECONDS}` : "";

  document.cookie = `x-api-key=${encodeURIComponent(key)}; path=/; SameSite=Strict${maxAge}`;

  if (remember) {
    localStorage.setItem(STORAGE_KEYS.apiKey, key);
  } else {
    sessionStorage.setItem(STORAGE_KEYS.apiKey, key);
  }
}

/**
 * Removes the API key from all storage locations.
 * Expires the cookie immediately and clears both localStorage and sessionStorage.
 */
export function removeApiKey() {
  document.cookie = "x-api-key=; path=/; max-age=0";

  localStorage.removeItem(STORAGE_KEYS.apiKey);

  sessionStorage.removeItem(STORAGE_KEYS.apiKey);
}
