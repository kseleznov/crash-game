import { type NextRequest, NextResponse } from "next/server";
import { ROUTES } from "@/shared/config/routes";

/**
 * Middleware proxy — handles route-based redirects depending on the presence of an API key cookie.
 *
 * Called automatically by Next.js on every incoming request that matches the
 * `config.matcher` pattern defined below (all routes except static assets and favicon).
 *
 * Rules:
 * - `/` → redirect to `/game`
 * - Authenticated user (cookie `x-api-key` present) visiting `/sign-in` → redirect to `/game`
 * - Unauthenticated user (no `x-api-key` cookie) visiting any route other than `/sign-in` → redirect to `/sign-in`
 * - All other cases → pass the request through unchanged
 *
 * @param request - incoming Next.js request
 * @returns NextResponse with a redirect, or `NextResponse.next()` to continue
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const apiKey = request.cookies.get("x-api-key")?.value;

  function redirect(path: string) {
    return NextResponse.redirect(new URL(path, request.url));
  }

  if (pathname === ROUTES.root) {
    return redirect(ROUTES.game);
  }

  if (apiKey && pathname === ROUTES.signIn) {
    return redirect(ROUTES.game);
  }

  if (!apiKey && pathname !== ROUTES.signIn) {
    return redirect(ROUTES.signIn);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
