"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

function LogginnInner() {
  const { refresh } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/program";

  const [fane, setFane] = useState<"logginn" | "registrer">("logginn");
  const [feil, setFeil] = useState<string | null>(null);
  const [laster, setLaster] = useState(false);

  // Login form state
  const [brukernavn, setBrukernavn] = useState("");
  const [passord, setPassord] = useState("");

  // Register form state
  const [regNavn, setRegNavn] = useState("");
  const [regSkole, setRegSkole] = useState("Hamar katedralskole");
  const [regBrukernavn, setRegBrukernavn] = useState("");
  const [regPassord, setRegPassord] = useState("");

  async function handleLogginn(e: React.FormEvent) {
    e.preventDefault();
    setFeil(null);
    setLaster(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brukernavn, passord }),
      });
      const data = await res.json();
      if (!res.ok) { setFeil(data.error); return; }
      await refresh();
      router.push(redirectTo);
    } catch {
      setFeil("Noe gikk galt. Prøv igjen.");
    } finally {
      setLaster(false);
    }
  }

  async function handleRegistrer(e: React.FormEvent) {
    e.preventDefault();
    setFeil(null);
    setLaster(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brukernavn: regBrukernavn,
          passord: regPassord,
          navn: regNavn,
          skole: regSkole,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setFeil(data.error); return; }
      await refresh();
      router.push(redirectTo);
    } catch {
      setFeil("Noe gikk galt. Prøv igjen.");
    } finally {
      setLaster(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">2INF Festival 2027</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Logg inn for å melde deg på foredrag</p>
      </div>

      {/* Faner */}
      <div className="mb-6 flex rounded-lg border border-slate-200 p-1 dark:border-slate-700">
        {(["logginn", "registrer"] as const).map((f) => (
          <button
            key={f}
            onClick={() => { setFane(f); setFeil(null); }}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              fane === f
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {f === "logginn" ? "Logg inn" : "Ny bruker"}
          </button>
        ))}
      </div>

      {feil && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/40 dark:bg-red-950/30 dark:text-red-400">
          {feil}
        </div>
      )}

      {fane === "logginn" ? (
        <form onSubmit={handleLogginn} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Brukernavn
            </label>
            <input
              type="text"
              value={brukernavn}
              onChange={(e) => setBrukernavn(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Passord
            </label>
            <input
              type="password"
              value={passord}
              onChange={(e) => setPassord(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <button
            type="submit"
            disabled={laster}
            className="mt-2 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
          >
            {laster ? "Logger inn…" : "Logg inn"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegistrer} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Fullt navn
            </label>
            <input
              type="text"
              value={regNavn}
              onChange={(e) => setRegNavn(e.target.value)}
              required
              placeholder="Ola Nordmann"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Skole
            </label>
            <input
              type="text"
              value={regSkole}
              onChange={(e) => setRegSkole(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Brukernavn
            </label>
            <input
              type="text"
              value={regBrukernavn}
              onChange={(e) => setRegBrukernavn(e.target.value)}
              required
              placeholder="ola123"
              autoComplete="username"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Passord <span className="font-normal text-slate-400">(minst 6 tegn)</span>
            </label>
            <input
              type="password"
              value={regPassord}
              onChange={(e) => setRegPassord(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <button
            type="submit"
            disabled={laster}
            className="mt-2 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
          >
            {laster ? "Oppretter bruker…" : "Opprett bruker"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function Logginn() {
  return (
    <Suspense>
      <LogginnInner />
    </Suspense>
  );
}
