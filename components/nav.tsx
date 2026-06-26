"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/devpossum-logo.png"
            alt="DevPossum"
            width={140}
            height={40}
            className="h-9 w-auto"
            priority
          />
          <span className="rounded bg-indigo-600 px-1.5 py-0.5 text-xs font-medium text-white">
            beta
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                pathname.startsWith(href)
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
          >
            Demo Panel
          </Link>
          <Link
            href="/onboarding"
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
