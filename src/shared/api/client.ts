import { getApiKey, removeApiKey } from "@/shared/lib/apiKey";

const BASE_PATH = process.env.NEXT_PUBLIC_API_URL;

/**
 * Base HTTP client for all API requests.
 * Automatically attaches the API key from storage as the `X-API-Key` header.
 * On 401 — clears the stored key and redirects to `/sign-in`.
 * On other non-2xx responses — parses the `error` field from the JSON body (falls back to `statusText`) and throws.
 *
 * @param path - Path appended to `NEXT_PUBLIC_API_URL` (e.g. `/api/balance`)
 * @returns Parsed JSON response body typed as `T`
 */
export async function api<T>(path: string): Promise<T> {
  const apiKey = getApiKey();

  const response = await fetch(`${BASE_PATH}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
  });

  if (response.status === 401) {
    removeApiKey();

    window.location.href = "/sign-in";

    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    const { error } = await response
      .json()
      .catch(() => ({ error: response.statusText }));

    throw new Error(error);
  }

  return response.json();
}
