import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { foredrag, bedrifter } from "@/data/festival";
import type { Bruker } from "@/lib/auth";
import { getCurrentAdmin } from "@/lib/adminAuth";
import AdminLoggutKnapp from "@/components/AdminLoggutKnapp";

type Pamelding = {
  brukerId: string;
  foredragIds: number[];
  tidspunkt: string;
};

async function hentPameldte(): Promise<Pamelding[]> {
  try {
    return JSON.parse(await fs.readFile(path.join(process.cwd(), "data", "pameldte.json"), "utf-8"));
  } catch { return []; }
}

async function hentBrukere(): Promise<Bruker[]> {
  try {
    return JSON.parse(await fs.readFile(path.join(process.cwd(), "data", "brukere.json"), "utf-8"));
  } catch { return []; }
}

function groupByTime(foredragListe: typeof foredrag) {
  const sorted = [...foredragListe].sort((a, b) =>
    a.startTid.localeCompare(b.startTid) || a.rom.localeCompare(b.rom)
  );
  const map = new Map<string, typeof foredrag>();
  for (const f of sorted) {
    const key = `${f.startTid}–${f.sluttTid}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(f);
  }
  return map;
}

export default async function Festivalsjef() {
  const isAdmin = await getCurrentAdmin();
  if (!isAdmin) redirect("/festivalsjef-logginn");

  const [pameldte, brukere] = await Promise.all([hentPameldte(), hentBrukere()]);
  const grouped = groupByTime(foredrag);

  const brukerMap = new Map(brukere.map((b) => [b.id, b]));

  const elevPerForedrag = new Map<number, { navn: string; skole: string }[]>();
  for (const f of foredrag) elevPerForedrag.set(f.id, []);
  for (const p of pameldte) {
    const bruker = brukerMap.get(p.brukerId);
    if (!bruker) continue;
    for (const fId of p.foredragIds) {
      elevPerForedrag.get(fId)?.push({ navn: bruker.navn, skole: bruker.skole });
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">Administrasjon</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100">Festivaloversikt</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">2INF Festival 2027 &mdash; 18. mars 2027</p>
          </div>
          <AdminLoggutKnapp />
        </div>

        <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 dark:border-indigo-700/40 dark:bg-indigo-950/40">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{pameldte.length}</p>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">elever påmeldt totalt</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-700/50">
        {[...grouped.entries()].map(([slot, items]) => (
          <div key={slot} className="flex gap-4 py-6 first:pt-0 last:pb-0">
            <div className="w-16 shrink-0 pt-1 text-right">
              <p className="text-sm font-bold tabular-nums text-indigo-600 dark:text-indigo-400">{items[0].startTid}</p>
              <p className="text-xs text-slate-400 dark:text-slate-600">{items[0].sluttTid}</p>
            </div>
            <div className="flex flex-col items-center pt-1.5">
              <div className="h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-indigo-500/25" />
              <div className="mt-1 w-px flex-1 bg-slate-300 dark:bg-slate-700/50" />
            </div>
            <div className="flex flex-1 flex-wrap gap-3">
              {items.map((f) => {
                const bedrift = bedrifter.find((b) => b.id === f.holderBedriftId);
                const elever = elevPerForedrag.get(f.id) ?? [];
                const prosent = Math.round((elever.length / f.maksPlasser) * 100);

                return (
                  <div
                    key={f.id}
                    className="flex w-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/60 sm:w-[calc(50%-0.375rem)]"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">{f.tittel}</h3>
                      <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                        {f.rom}
                        {bedrift && <span className="text-slate-400 dark:text-slate-600"> &mdash; {bedrift.navn}</span>}
                      </p>
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {elever.length} / {f.maksPlasser} elever
                        </span>
                        <span className={`font-semibold ${prosent >= 90 ? "text-red-500" : prosent >= 60 ? "text-amber-500" : "text-green-500"}`}>
                          {prosent}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                        <div
                          className={`h-full rounded-full transition-all ${prosent >= 90 ? "bg-red-500" : prosent >= 60 ? "bg-amber-400" : "bg-green-500"}`}
                          style={{ width: `${Math.min(prosent, 100)}%` }}
                        />
                      </div>
                    </div>

                    {elever.length > 0 ? (
                      <ul className="flex flex-col gap-1">
                        {elever.map((elev, i) => (
                          <li key={i} className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                              {elev.navn}
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-500">{elev.skole}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="italic text-sm text-slate-400 dark:text-slate-600">Ingen påmeldte ennå</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
