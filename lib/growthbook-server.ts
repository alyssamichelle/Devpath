/**
 * Server-side GrowthBook bootstrap.
 *
 * This runs in a Server Component (the root layout). It does two things:
 *
 *   1. Reads the stable anonymous id from the `dp_anon_id` cookie (stamped by
 *      `proxy.ts`). This is the legitimate use of the proxy/middleware —
 *      setting a cookie — NOT rendering UI.
 *   2. Fetches the GrowthBook feature payload ONCE and lets Next.js cache it
 *      (`revalidate`), so we are not doing a per-request network round-trip
 *      for every visitor. The payload is handed to the client SDK so the first
 *      client render matches the server HTML (no flag flicker).
 *
 * With no client key configured, this returns an empty bootstrap and the app
 * serves flag defaults.
 */

import { cookies } from "next/headers";
import type { GrowthBookPayload } from "@growthbook/growthbook-react";
import type { GrowthBookBootstrap } from "./growthbook";

const PAYLOAD_REVALIDATE_SECONDS = 30;

export async function getGrowthBookBootstrap(): Promise<GrowthBookBootstrap> {
  const cookieStore = await cookies();
  const anonId = cookieStore.get("dp_anon_id")?.value ?? null;

  const clientKey = process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY;
  const apiHost = process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST ?? "https://cdn.growthbook.io";

  if (!clientKey) {
    return { anonId, payload: null };
  }

  try {
    const res = await fetch(`${apiHost}/api/features/${clientKey}`, {
      next: { revalidate: PAYLOAD_REVALIDATE_SECONDS },
    });
    if (!res.ok) return { anonId, payload: null };
    const payload = (await res.json()) as GrowthBookPayload;
    return { anonId, payload };
  } catch {
    return { anonId, payload: null };
  }
}
