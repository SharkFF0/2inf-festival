import { workshops, bedrifter, rom } from "@/data/festival";

function getBedrift(id: number) {
  return bedrifter.find((b) => b.id === id);
}

function getRom(id: number) {
  return rom.find((r) => r.id === id);
}

export default function Workshops() {
  const sorted = [...workshops].sort((a, b) =>
    a.startTid.localeCompare(b.startTid),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-100">Workshops</h1>
        <p className="mt-2 text-slate-400">
          {workshops.length} praktiske workshops ledet av bedriftene &mdash; lær
          noe nytt på en time!
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((w) => {
          const bedrift = getBedrift(w.holderBedriftId);
          const klasserom = getRom(w.romId);

          return (
            <article
              key={w.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-800/60 p-5 transition-all hover:border-indigo-500/40 hover:bg-slate-800"
            >
              {/* Tid */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-indigo-400">
                  {w.startTid} – {w.sluttTid}
                </span>
                <span className="rounded-full bg-slate-700 px-2.5 py-0.5 text-xs text-slate-300">
                  {w.maksPlasser} plasser
                </span>
              </div>

              {/* Tittel */}
              <h2 className="font-semibold text-slate-100 leading-snug">
                {w.tittel}
              </h2>

              {/* Bedrift */}
              {bedrift && (
                <p className="text-sm text-slate-400">
                  <span className="font-medium text-slate-300">
                    {bedrift.navn}
                  </span>
                </p>
              )}

              {/* Rom */}
              {klasserom && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Rom {klasserom.romnummer} &mdash; {klasserom.bygning} (maks{" "}
                  {klasserom.kapasitet})
                </div>
              )}

              {/* Forkunnskaper */}
              <div className="mt-auto rounded-lg bg-slate-700/40 px-3 py-2 text-xs text-slate-400">
                <span className="font-medium text-slate-300">
                  Forkunnskaper:{" "}
                </span>
                {w.forkunnskaper}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
