"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

/**
 * Fires exactly one `page_view` per client-side navigation.
 *
 * GA4 is configured with `send_page_view: false` (see `app/layout.tsx`), so
 * this is the single source of page_views — no double-count on first load.
 * The `lastTracked` ref also absorbs React StrictMode's double-invoked effects
 * in development, so we don't log the same view twice.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    if (lastTracked.current === path) return;
    lastTracked.current = path;
    trackPageView(document.title, path);
  }, [pathname, searchParams]);

  return null;
}
