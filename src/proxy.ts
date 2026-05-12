import { type NextRequest, NextResponse } from "next/server";
import { ROUTES } from "@/shared/config/routes";

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
