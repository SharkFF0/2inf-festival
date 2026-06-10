"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { usePamelding } from "./PameldingProvider";
import { useAuth } from "./AuthProvider";

const links = [
  { href: "/", label: "Hjem" },
  { href: "/program", label: "Program" },
  { href: "/bedrifter", label: "Bedrifter" },
  { href: "/workshops", label: "Workshops" },
  { href: "/kart", label: "Kart" },
  { href: "/praktisk", label: "Praktisk info" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const { valgte } = usePamelding();
  const { user, refresh } = useAuth();
  const router = useRouter();

  async function handleLoggut() {
    await fetch("/api/auth/logout", { method: "POST" });
    await refresh();
    router.push("/logginn");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-indigo-400 dark:text-indigo-400"
        >
          <span>2INF Festival</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/min-pamelding"
            className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              pathname === "/min-pamelding"
                ? "bg-indigo-600 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
            }`}
          >
            Min plan
            {valgte.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {valgte.length}
              </span>
            )}
          </Link>
          <Link
            href="/festivalsjef"
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              pathname === "/festivalsjef"
                ? "bg-slate-700 text-white dark:bg-slate-600"
                : "text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Festivalsjef
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Brukerinfo + logg ut */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {user.navn}
              </span>
              <button
                onClick={handleLoggut}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                Logg ut
              </button>
            </div>
          ) : (
            <Link
              href="/logginn"
              className="hidden md:block rounded-md px-3 py-1.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/40"
            >
              Logg inn
            </Link>
          )}
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Bytt tema"
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Meny"
            className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 md:hidden dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 pb-3 md:hidden dark:border-slate-700 dark:bg-slate-900">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/min-pamelding"
            onClick={() => setOpen(false)}
            className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/min-pamelding"
                ? "bg-indigo-600 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
            }`}
          >
            Min plan
            {valgte.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {valgte.length}
              </span>
            )}
          </Link>
          <Link
            href="/festivalsjef"
            onClick={() => setOpen(false)}
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/festivalsjef"
                ? "bg-slate-700 text-white dark:bg-slate-600"
                : "text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
            }`}
          >
            Festivalsjef
          </Link>
        </nav>
      )}
    </header>
  );
}
