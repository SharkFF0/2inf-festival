"use client";
import { useState } from "react";
import Link from "next/link";
import { usePamelding } from "./PameldingProvider";
import { foredrag, bedrifter } from "@/data/festival";

const auditoriumFarger: Record<string, string> = {
  "Auditorium A": "bg-indigo-600/20 text-indigo-700 ring-1 ring-indigo-500/30 dark:text-indigo-300",
  "Auditorium B": "bg-violet-600/20 text-violet-700 ring-1 ring-violet-500/30 dark:text-violet-300",
};

type Props = { navn: string; skole: string };

export default function MinPameldingClient({ navn, skole }: Props) {
  const { valgte, fjern } = usePamelding();
  const [bekreftet, setBekreftet] = useState(false);
  const [sender, setSender] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  const valgtForedrag = valgte
    .map((id) => foredrag.find((f) => f.id === id))
    .filter(Boolean) as typeof foredrag;

  const sorted = [...valgtForedrag].sort((a, b) => a.startTid.localeCompare(b.startTid));

  if (bekreftet) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="bg-indigo-600 px-6 py-5 dark:bg-indigo-700">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200">Påmelding bekreftet</p>
            <h1 className="mt-1 text-2xl font-bold text-white">2INF Festival 2027</h1>
            <p className="mt-0.5 text-sm text-indigo-200">18. mars 2027 &mdash; Hamar katedralskole</p>
          </div>

          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">Elev</dt>
                <dd className="mt-0.5 font-semibold text-slate-900 dark:text-slate-100">{navn}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">Skole</dt>
                <dd className="mt-0.5 font-semibold text-slate-900 dark:text-slate-100">{skole}</dd>
              </div>
            </dl>
          </div>

          <div className="px-6 py-4">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Påmeldte foredrag
            </h2>
            <ol className="flex flex-col gap-4">
              {sorted.map((f, idx) => {
                const bedrift = bedrifter.find((b) => b.id === f.holderBedriftId);
                const aFarge = auditoriumFarger[f.rom] ?? "";
                return (
                  <li key={f.id} className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{f.tittel}</p>
                      <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                        {f.startTid}–{f.sluttTid}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${aFarge}`}>
                          {f.rom}
                        </span>
                        {bedrift && (
                          <span className="text-xs text-slate-500 dark:text-slate-400">{bedrift.navn}</span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/50">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Husk å møte opp i riktig auditorium til riktig tid. Lykke til på festivalen!
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setBekreftet(false)}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Rediger
          </button>
          <Link
            href="/program"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Tilbake til program
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Min påmelding</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Påmeldt som <span className="font-semibold text-slate-700 dark:text-slate-300">{navn}</span>
          <span className="text-slate-400"> &mdash; {skole}</span>
        </p>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Du har valgt{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {valgte.length} av 3
          </span>{" "}
          foredrag.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-3">
        {sorted.map((f) => {
          const bedrift = bedrifter.find((b) => b.id === f.holderBedriftId);
          const aFarge = auditoriumFarger[f.rom] ?? "";
          return (
            <div
              key={f.id}
              className="flex items-start gap-4 rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-500/30 dark:bg-indigo-950/30"
            >
              <div className="min-w-14 text-right">
                <p className="text-sm font-bold tabular-nums text-indigo-600 dark:text-indigo-400">{f.startTid}</p>
                <p className="text-xs text-slate-400 dark:text-slate-600">{f.sluttTid}</p>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{f.tittel}</h3>
                {bedrift && (
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{bedrift.navn}</p>
                )}
                <div className="mt-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${aFarge}`}>{f.rom}</span>
                </div>
              </div>
              <button
                onClick={() => fjern(f.id)}
                aria-label={`Fjern ${f.tittel}`}
                className="mt-0.5 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          );
        })}

        {Array.from({ length: 3 - sorted.length }).map((_, i) => (
          <div
            key={`tom-${i}`}
            className="flex items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800/40"
          >
            <div className="min-w-14" />
            <p className="text-sm text-slate-400 dark:text-slate-600">
              Tomt spor —{" "}
              <Link href="/program" className="text-indigo-500 underline-offset-2 hover:underline">
                velg et foredrag
              </Link>
            </p>
          </div>
        ))}
      </div>

      {feil && (
        <p className="mb-3 text-sm text-red-600 dark:text-red-400">{feil}</p>
      )}

      <button
        disabled={valgte.length < 3 || sender}
        onClick={async () => {
          setSender(true);
          setFeil(null);
          try {
            const res = await fetch("/api/pamelding", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ foredragIds: valgte }),
            });
            if (!res.ok) throw new Error();
            setBekreftet(true);
          } catch {
            setFeil("Noe gikk galt. Prøv igjen.");
          } finally {
            setSender(false);
          }
        }}
        className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-indigo-500"
      >
        {sender ? "Sender…" : "Velg"}
      </button>

      {valgte.length < 3 && (
        <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
          Du må velge {3 - valgte.length} foredrag til
        </p>
      )}

      <div className="mt-6">
        <Link
          href="/program"
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Tilbake til program
        </Link>
      </div>
    </div>
  );
}
