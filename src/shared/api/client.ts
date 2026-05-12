import { getApiKey, removeApiKey } from "@/shared/lib/apiKey";

const BASE_PATH = process.env.NEXT_PUBLIC_API_URL;

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const apiKey = getApiKey();
  const response = await fetch(`${BASE_PATH}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
      ...(options?.headers || {}),
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
