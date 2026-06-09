import { bedrifter } from "@/data/festival";

export default function Bedrifter() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-100">Bedrifter</h1>
        <p className="mt-2 text-slate-400">
          {bedrifter.length} teknologibedrifter stiller ut på 2INF Festival
          2027. Kom innom standene og snakk med fagfolk fra bransjen!
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bedrifter.map((b) => (
          <article
            key={b.id}
            className="flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-800/60 p-5 transition-all hover:border-indigo-500/40 hover:bg-slate-800"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-semibold text-slate-100 leading-snug">
                  {b.navn}
                </h2>
                <p className="text-sm text-slate-500">{b.bransje}</p>
              </div>
              <span className="shrink-0 rounded-md bg-slate-700 px-2 py-0.5 text-xs font-mono font-medium text-slate-300">
                {b.standnummer}
              </span>
            </div>

            {/* Beskrivelse */}
            <p className="text-sm text-slate-400 leading-relaxed">
              {b.beskrivelse}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {b.harForedrag && (
                <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-300 ring-1 ring-indigo-500/25">
                  Holder foredrag
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="mt-auto border-t border-slate-700/60 pt-3 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                <p>{b.kontaktperson}</p>
                <a
                  href={`mailto:${b.epost}`}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {b.epost}
                </a>
              </div>
              <a
                href={b.nettside}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-slate-700 px-3 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-indigo-600 hover:text-white"
              >
                Nettside ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
