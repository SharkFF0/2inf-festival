import { workshops, bedrifter, rom } from "@/data/festival";

const accents = [
  { border: "border-l-indigo-500",  time: "text-indigo-600 dark:text-indigo-400",  bg: "bg-indigo-500/10" },
  { border: "border-l-violet-500",  time: "text-violet-600 dark:text-violet-400",  bg: "bg-violet-500/10" },
  { border: "border-l-cyan-500",    time: "text-cyan-600 dark:text-cyan-400",      bg: "bg-cyan-500/10"   },
  { border: "border-l-emerald-500", time: "text-emerald-600 dark:text-emerald-400",bg: "bg-emerald-500/10"},
  { border: "border-l-pink-500",    time: "text-pink-600 dark:text-pink-400",      bg: "bg-pink-500/10"   },
  { border: "border-l-amber-500",   time: "text-amber-600 dark:text-amber-400",    bg: "bg-amber-500/10"  },
];

function getBedrift(id: number) { return bedrifter.find((b) => b.id === id); }
function getRom(id: number)     { return rom.find((r) => r.id === id);       }

export default function Workshops() {
  const sorted = [...workshops].sort((a, b) => a.startTid.localeCompare(b.startTid));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Workshops</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {workshops.length} praktiske workshops ledet av bedriftene &mdash; lær noe nytt på en time!
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((w, i) => {
          const bedrift   = getBedrift(w.holderBedriftId);
          const klasserom = getRom(w.romId);
          const acc = accents[i % accents.length];

          return (
            <article
              key={w.id}
              className={`flex flex-col gap-3 rounded-xl border border-slate-200 border-l-4 ${acc.border} bg-white p-5 transition-all duration-200 hover:scale-[1.02] hover:border-slate-300 hover:shadow-lg dark:border-t-slate-700 dark:border-r-slate-700 dark:border-b-slate-700 dark:bg-slate-800/60 dark:hover:border-t-slate-600 dark:hover:border-r-slate-600 dark:hover:border-b-slate-600 dark:hover:bg-slate-800 dark:hover:shadow-black/30`}
            >
              {/* Tid + plasser */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${acc.time}`}>
                  {w.startTid} – {w.sluttTid}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${acc.bg} ${acc.time}`}>
                  {w.maksPlasser} plasser
                </span>
              </div>

              {/* Tittel */}
              <h2 className="font-semibold leading-snug text-slate-900 dark:text-slate-100">{w.tittel}</h2>

              {/* Bedrift */}
              {bedrift && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{bedrift.navn}</span>
                  <span className="ml-1.5 text-slate-400 dark:text-slate-600">&mdash; Stand {bedrift.standnummer}</span>
                </p>
              )}

              {/* Rom */}
              {klasserom && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Rom {klasserom.romnummer} &mdash; {klasserom.bygning}
                </div>
              )}

              {/* Forkunnskaper */}
              <div className={`mt-auto rounded-lg px-3 py-2 text-xs ${acc.bg}`}>
                <span className={`font-medium ${acc.time}`}>Forkunnskaper: </span>
                <span className="text-slate-600 dark:text-slate-400">{w.forkunnskaper}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
