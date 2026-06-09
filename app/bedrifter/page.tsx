import { bedrifter } from "@/data/festival";

const bransjeAccent: Record<string, string> = {
  "Programvareutvikling":        "border-l-blue-500",
  "IT-drift og infrastruktur":   "border-l-orange-500",
  "Konsulenttjenester":          "border-l-purple-500",
  "Programvare og skytjenester": "border-l-cyan-500",
  "IT-infrastruktur":            "border-l-amber-500",
  "Systemutvikling":             "border-l-green-500",
  "Design og utvikling":         "border-l-pink-500",
  "Informasjonssikkerhet":       "border-l-red-500",
  "Forretningssystemer":         "border-l-yellow-500",
  "Konsulent og teknologi":      "border-l-indigo-500",
  "Energi og digitalisering":    "border-l-emerald-500",
  "Offentlig IT-drift":          "border-l-teal-500",
  "Helse-IKT":                   "border-l-rose-500",
  "Offentlig digitalisering":    "border-l-sky-500",
  "Mobilitet og data":           "border-l-violet-500",
  "Telekom og nettverk":         "border-l-cyan-400",
  "Smidig utvikling":            "border-l-lime-500",
  "Sky og lisensiering":         "border-l-blue-400",
  "Digital design og utvikling": "border-l-fuchsia-500",
  "Teknologirådgivning":         "border-l-indigo-400",
};

/* Saturated-enough to read on both white and dark backgrounds */
const bransjeText: Record<string, string> = {
  "Programvareutvikling":        "text-blue-600 dark:text-blue-400",
  "IT-drift og infrastruktur":   "text-orange-600 dark:text-orange-400",
  "Konsulenttjenester":          "text-purple-600 dark:text-purple-400",
  "Programvare og skytjenester": "text-cyan-600 dark:text-cyan-400",
  "IT-infrastruktur":            "text-amber-600 dark:text-amber-400",
  "Systemutvikling":             "text-green-600 dark:text-green-400",
  "Design og utvikling":         "text-pink-600 dark:text-pink-400",
  "Informasjonssikkerhet":       "text-red-600 dark:text-red-400",
  "Forretningssystemer":         "text-yellow-600 dark:text-yellow-400",
  "Konsulent og teknologi":      "text-indigo-600 dark:text-indigo-400",
  "Energi og digitalisering":    "text-emerald-600 dark:text-emerald-400",
  "Offentlig IT-drift":          "text-teal-600 dark:text-teal-400",
  "Helse-IKT":                   "text-rose-600 dark:text-rose-400",
  "Offentlig digitalisering":    "text-sky-600 dark:text-sky-400",
  "Mobilitet og data":           "text-violet-600 dark:text-violet-400",
  "Telekom og nettverk":         "text-cyan-600 dark:text-cyan-300",
  "Smidig utvikling":            "text-lime-600 dark:text-lime-400",
  "Sky og lisensiering":         "text-blue-600 dark:text-blue-300",
  "Digital design og utvikling": "text-fuchsia-600 dark:text-fuchsia-400",
  "Teknologirådgivning":         "text-indigo-600 dark:text-indigo-300",
};

export default function Bedrifter() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Bedrifter</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {bedrifter.length} teknologibedrifter stiller ut på 2INF Festival 2027.
          Kom innom standene og snakk med fagfolk fra bransjen!
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bedrifter.map((b) => {
          const accentBorder = bransjeAccent[b.bransje] ?? "border-l-slate-500";
          const accentText   = bransjeText[b.bransje]   ?? "text-slate-600 dark:text-slate-400";

          return (
            <article
              key={b.id}
              className={`flex flex-col gap-3 rounded-xl border border-slate-200 border-l-4 ${accentBorder} bg-white p-5 transition-all duration-200 hover:scale-[1.02] hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:shadow-black/30`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold leading-snug text-slate-900 dark:text-slate-100">{b.navn}</h2>
                  <p className={`text-sm font-medium ${accentText}`}>{b.bransje}</p>
                </div>
                <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-mono font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  {b.standnummer}
                </span>
              </div>

              {/* Beskrivelse */}
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{b.beskrivelse}</p>

              {/* Tags */}
              {b.harForedrag && (
                <span className="w-fit rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-600 ring-1 ring-indigo-500/25 dark:text-indigo-300">
                  Holder foredrag
                </span>
              )}

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700/60">
                <div className="text-xs">
                  <p className="text-slate-700 dark:text-slate-400">{b.kontaktperson}</p>
                  <a
                    href={`mailto:${b.epost}`}
                    className="text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    {b.epost}
                  </a>
                </div>
                <a
                  href={b.nettside}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-indigo-600 hover:text-white dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-indigo-600 dark:hover:text-white"
                >
                  Nettside ↗
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
