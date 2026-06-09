import { foredrag, bedrifter } from "@/data/festival";

const kategoriFarger: Record<string, string> = {
  Utvikling: "bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/30",
  Drift: "bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/30",
  Sikkerhet: "bg-red-500/20 text-red-300 ring-1 ring-red-500/30",
  Karriere: "bg-green-500/20 text-green-300 ring-1 ring-green-500/30",
  "Kunstig intelligens": "bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/30",
  Nettverk: "bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/30",
  Design: "bg-pink-500/20 text-pink-300 ring-1 ring-pink-500/30",
  Dataanalyse: "bg-yellow-500/20 text-yellow-300 ring-1 ring-yellow-500/30",
};

const auditoriumFarger: Record<string, string> = {
  "Auditorium A": "bg-indigo-600/20 text-indigo-300 ring-1 ring-indigo-500/30",
  "Auditorium B": "bg-violet-600/20 text-violet-300 ring-1 ring-violet-500/30",
};

function getBedrift(id: number) {
  return bedrifter.find((b) => b.id === id);
}

/* Group by start time, sort groups and items within */
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
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-100">Program</h1>
        <p className="mt-2 text-slate-400">
          {foredrag.length} foredrag &mdash; 18. mars 2027, 09:00–15:00
        </p>
      </div>

      {/* Kategori-forklaring */}
      <div className="mb-8 flex flex-wrap gap-2">
        {Object.entries(kategoriFarger).map(([k, cls]) => (
          <span key={k} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
            {k}
          </span>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-0">
        {[...grouped.entries()].map(([slot, items], groupIdx) => (
          <div key={slot} className="flex gap-4">
            {/* Time axis */}
            <div className="flex w-20 shrink-0 flex-col items-end pt-4">
              <span className="text-sm font-semibold text-indigo-400 tabular-nums">
                {items[0].startTid}
              </span>
              <span className="text-xs text-slate-600">{items[0].sluttTid}</span>
            </div>

            {/* Vertical line */}
            <div className="flex flex-col items-center">
              <div className="mt-5 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-500 ring-2 ring-indigo-500/30" />
              {groupIdx < grouped.size - 1 && (
                <div className="w-px flex-1 bg-slate-700/60" />
              )}
            </div>

            {/* Cards for this time slot */}
            <div className="flex flex-1 flex-col gap-3 pb-6 pt-2">
              {items.map((f) => {
                const bedrift = getBedrift(f.holderBedriftId);
                const kFarge = kategoriFarger[f.kategori] ?? "bg-slate-500/20 text-slate-300 ring-1 ring-slate-500/30";
                const aFarge = auditoriumFarger[f.rom] ?? "";

                return (
                  <article
                    key={f.id}
                    className="flex flex-col gap-2 rounded-xl border border-slate-700 bg-slate-800/60 p-4 transition-all duration-200 hover:scale-[1.02] hover:border-indigo-500/40 hover:bg-slate-800 hover:shadow-lg hover:shadow-indigo-950/40"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-100 leading-snug">{f.tittel}</h3>
                      <div className="flex gap-1.5 flex-wrap">
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${aFarge}`}>
                          {f.rom}
                        </span>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${kFarge}`}>
                          {f.kategori}
                        </span>
                      </div>
                    </div>
                    {bedrift && (
                      <p className="text-sm text-slate-400">
                        <span className="font-medium text-slate-300">{bedrift.navn}</span>
                        {" "}&mdash; Stand {bedrift.standnummer}
                      </p>
                    )}
                    <p className="text-sm text-slate-500 leading-relaxed">{f.beskrivelse}</p>
                    <p className="text-xs text-slate-600">Maks {f.maksPlasser} plasser</p>
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
