import { foredrag, bedrifter } from "@/data/festival";

const kategoriFarger: Record<string, string> = {
  Utvikling: "bg-blue-500/20 text-blue-700 ring-1 ring-blue-500/30 dark:text-blue-300",
  Drift: "bg-orange-500/20 text-orange-700 ring-1 ring-orange-500/30 dark:text-orange-300",
  Sikkerhet: "bg-red-500/20 text-red-700 ring-1 ring-red-500/30 dark:text-red-300",
  Karriere: "bg-green-500/20 text-green-700 ring-1 ring-green-500/30 dark:text-green-300",
  "Kunstig intelligens": "bg-purple-500/20 text-purple-700 ring-1 ring-purple-500/30 dark:text-purple-300",
  Nettverk: "bg-cyan-500/20 text-cyan-700 ring-1 ring-cyan-500/30 dark:text-cyan-300",
  Design: "bg-pink-500/20 text-pink-700 ring-1 ring-pink-500/30 dark:text-pink-300",
  Dataanalyse: "bg-yellow-500/20 text-yellow-700 ring-1 ring-yellow-500/30 dark:text-yellow-300",
};

const auditoriumFarger: Record<string, string> = {
  "Auditorium A": "bg-indigo-600/20 text-indigo-700 ring-1 ring-indigo-500/30 dark:text-indigo-300",
  "Auditorium B": "bg-violet-600/20 text-violet-700 ring-1 ring-violet-500/30 dark:text-violet-300",
};

function getBedrift(id: number) {
  return bedrifter.find((b) => b.id === id);
}

function groupByTime() {
  const sorted = [...foredrag].sort((a, b) =>
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

export default function Program() {
  const grouped = groupByTime();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Program</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {foredrag.length} foredrag &mdash; 18. mars 2027, 09:00–15:00
        </p>
      </div>

      <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-700/50">
        {[...grouped.entries()].map(([slot, items]) => (
          <div key={slot} className="flex gap-4 py-5 first:pt-0 last:pb-0">

            {/* Left: time label */}
            <div className="w-16 shrink-0 pt-1 text-right">
              <p className="text-sm font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
                {items[0].startTid}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-600">{items[0].sluttTid}</p>
            </div>

            {/* Dot + line */}
            <div className="flex flex-col items-center pt-1.5">
              <div className="h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-indigo-500/25" />
              <div className="mt-1 w-px flex-1 bg-slate-300 dark:bg-slate-700/50" />
            </div>

            {/* Cards: wrap horizontally, stack when out of space */}
            <div className="flex flex-1 flex-wrap gap-2">
              {items.map((f) => {
                const bedrift = getBedrift(f.holderBedriftId);
                const kFarge = kategoriFarger[f.kategori] ?? "bg-slate-500/20 text-slate-700 ring-1 ring-slate-500/30 dark:text-slate-300";
                const aFarge = auditoriumFarger[f.rom] ?? "";

                return (
                  <article
                    key={f.id}
                    className="flex w-full flex-col gap-1.5 rounded-lg border border-slate-200 bg-white p-3 transition-all duration-200 hover:scale-[1.01] hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-indigo-500/40 dark:hover:bg-slate-800 dark:hover:shadow-indigo-950/40 sm:w-[calc(50%-0.25rem)] lg:w-[calc(33.333%-0.375rem)]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-1.5">
                      <h3 className="text-sm font-semibold leading-snug text-slate-900 dark:text-slate-100">{f.tittel}</h3>
                      <div className="flex flex-wrap gap-1">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${aFarge}`}>
                          {f.rom}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${kFarge}`}>
                          {f.kategori}
                        </span>
                      </div>
                    </div>
                    {bedrift && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{bedrift.navn}</span>
                        <span className="text-slate-400 dark:text-slate-600"> &mdash; {bedrift.standnummer}</span>
                      </p>
                    )}
                    <p className="text-xs text-slate-400 dark:text-slate-600">Maks {f.maksPlasser} plasser</p>
                  </article>
                );
              })}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
