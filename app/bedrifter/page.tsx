import { bedrifter } from "@/data/festival";

const bransjeAccent: Record<string, string> = {
  "Programvareutvikling":       "border-l-blue-500",
  "IT-drift og infrastruktur":  "border-l-orange-500",
  "Konsulenttjenester":         "border-l-purple-500",
  "Programvare og skytjenester":"border-l-cyan-500",
  "IT-infrastruktur":           "border-l-amber-500",
  "Systemutvikling":            "border-l-green-500",
  "Design og utvikling":        "border-l-pink-500",
  "Informasjonssikkerhet":      "border-l-red-500",
  "Forretningssystemer":        "border-l-yellow-500",
  "Konsulent og teknologi":     "border-l-indigo-500",
  "Energi og digitalisering":   "border-l-emerald-500",
  "Offentlig IT-drift":         "border-l-teal-500",
  "Helse-IKT":                  "border-l-rose-500",
  "Offentlig digitalisering":   "border-l-sky-500",
  "Mobilitet og data":          "border-l-violet-500",
  "Telekom og nettverk":        "border-l-cyan-400",
  "Smidig utvikling":           "border-l-lime-500",
  "Sky og lisensiering":        "border-l-blue-400",
  "Digital design og utvikling":"border-l-fuchsia-500",
  "Teknologirådgivning":        "border-l-indigo-400",
};

const bransjeText: Record<string, string> = {
  "Programvareutvikling":       "text-blue-400",
  "IT-drift og infrastruktur":  "text-orange-400",
  "Konsulenttjenester":         "text-purple-400",
  "Programvare og skytjenester":"text-cyan-400",
  "IT-infrastruktur":           "text-amber-400",
  "Systemutvikling":            "text-green-400",
  "Design og utvikling":        "text-pink-400",
  "Informasjonssikkerhet":      "text-red-400",
  "Forretningssystemer":        "text-yellow-400",
  "Konsulent og teknologi":     "text-indigo-400",
  "Energi og digitalisering":   "text-emerald-400",
  "Offentlig IT-drift":         "text-teal-400",
  "Helse-IKT":                  "text-rose-400",
  "Offentlig digitalisering":   "text-sky-400",
  "Mobilitet og data":          "text-violet-400",
  "Telekom og nettverk":        "text-cyan-300",
  "Smidig utvikling":           "text-lime-400",
  "Sky og lisensiering":        "text-blue-300",
  "Digital design og utvikling":"text-fuchsia-400",
  "Teknologirådgivning":        "text-indigo-300",
};

export default function Bedrifter() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-100">Bedrifter</h1>
        <p className="mt-2 text-slate-400">
          {bedrifter.length} teknologibedrifter stiller ut på 2INF Festival 2027.
          Kom innom standene og snakk med fagfolk fra bransjen!
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bedrifter.map((b) => {
          const accentBorder = bransjeAccent[b.bransje] ?? "border-l-slate-500";
          const accentText   = bransjeText[b.bransje]   ?? "text-slate-400";

          return (
            <article
              key={b.id}
              className={`flex flex-col gap-3 rounded-xl border border-slate-700 border-l-4 ${accentBorder} bg-slate-800/60 p-5 transition-all duration-200 hover:scale-[1.02] hover:border-slate-600 hover:bg-slate-800 hover:shadow-lg hover:shadow-black/30`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-slate-100 leading-snug">{b.navn}</h2>
                  <p className={`text-sm font-medium ${accentText}`}>{b.bransje}</p>
                </div>
                <span className="shrink-0 rounded-md bg-slate-700 px-2 py-0.5 text-xs font-mono font-medium text-slate-300">
                  {b.standnummer}
                </span>
              </div>

              {/* Beskrivelse */}
              <p className="text-sm text-slate-400 leading-relaxed">{b.beskrivelse}</p>

              {/* Tags */}
              {b.harForedrag && (
                <span className="w-fit rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-300 ring-1 ring-indigo-500/25">
                  Holder foredrag
                </span>
              )}

              {/* Footer */}
              <div className="mt-auto border-t border-slate-700/60 pt-3 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <p className="text-slate-400">{b.kontaktperson}</p>
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
                  className="shrink-0 rounded-md bg-slate-700 px-3 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-indigo-600 hover:text-white"
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
