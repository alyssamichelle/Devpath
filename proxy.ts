import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 "proxy" (formerly middleware). Its job here is NARROW and correct:
 * stamp a stable anonymous id cookie so flag/experiment bucketing is consistent
 * across requests and identical on the server and the client.
 *
 * The proxy does NOT evaluate flags to render UI — it runs on the Edge and can
 * only rewrite/redirect/set headers & cookies. Flag VALUES are computed by the
 * GrowthBook SDK (bootstrapped from this id + a server-fetched payload). This is
 * a common point of confusion worth modelling correctly.
 */
export function proxy(request: NextRequest) {
  const existing = request.cookies.get("dp_anon_id")?.value;
  if (existing) {
    return NextResponse.next();
  }

  // First visit: mint an id and make it visible to THIS request's server
  // render (via request cookies) as well as the browser (via response cookie),
  // so server and client bucket experiments with the same id — no flicker /
  // hydration mismatch on the first page.
  const anonId = crypto.randomUUID();
  request.cookies.set("dp_anon_id", anonId);

  const response = NextResponse.next({ request });
  response.cookies.set("dp_anon_id", anonId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Run on app routes; skip Next internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
