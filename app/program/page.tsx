import { foredrag, bedrifter } from "@/data/festival";

const kategoriFarger: Record<string, string> = {
  Utvikling: "bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/30",
  Drift: "bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/30",
  Sikkerhet: "bg-red-500/20 text-red-300 ring-1 ring-red-500/30",
  Karriere: "bg-green-500/20 text-green-300 ring-1 ring-green-500/30",
  "Kunstig intelligens":
    "bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/30",
  Nettverk: "bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/30",
  Design: "bg-pink-500/20 text-pink-300 ring-1 ring-pink-500/30",
  Dataanalyse: "bg-yellow-500/20 text-yellow-300 ring-1 ring-yellow-500/30",
};

const auditoriumA = foredrag
  .filter((f) => f.rom === "Auditorium A")
  .sort((a, b) => a.startTid.localeCompare(b.startTid));
const auditoriumB = foredrag
  .filter((f) => f.rom === "Auditorium B")
  .sort((a, b) => a.startTid.localeCompare(b.startTid));

function getBedrift(id: number) {
  return bedrifter.find((b) => b.id === id);
}

function ForedragKort({ f }: { f: (typeof foredrag)[0] }) {
  const bedrift = getBedrift(f.holderBedriftId);
  const farge =
    kategoriFarger[f.kategori] ??
    "bg-slate-500/20 text-slate-300 ring-1 ring-slate-500/30";

  return (
    <article className="flex flex-col gap-2 rounded-xl border border-slate-700 bg-slate-800/60 p-4 transition-all hover:border-indigo-500/40 hover:bg-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-medium text-indigo-400">
            {f.startTid} – {f.sluttTid}
          </span>
          <h3 className="mt-0.5 font-semibold text-slate-100 leading-snug">
            {f.tittel}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${farge}`}
        >
          {f.kategori}
        </span>
      </div>
      {bedrift && (
        <p className="text-sm text-slate-400">
          <span className="font-medium text-slate-300">{bedrift.navn}</span>{" "}
          &mdash; Stand {bedrift.standnummer}
        </p>
      )}
      <p className="text-sm text-slate-500 leading-relaxed">{f.beskrivelse}</p>
      <p className="text-xs text-slate-600">Maks {f.maksPlasser} plasser</p>
    </article>
  );
}

export default function Program() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-100">Program</h1>
        <p className="mt-2 text-slate-400">
          {foredrag.length} foredrag fordelt på to auditorier &mdash; 18. mars
          2027, 09:00–15:00
        </p>
      </div>

      {/* Kategori-forklaring */}
      <div className="mb-8 flex flex-wrap gap-2">
        {Object.entries(kategoriFarger).map(([k, cls]) => (
          <span
            key={k}
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}
          >
            {k}
          </span>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Auditorium A */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-100">
            <span className="rounded-lg bg-indigo-600/20 px-3 py-1 text-indigo-300 ring-1 ring-indigo-500/30">
              Auditorium A
            </span>
          </h2>
          <div className="flex flex-col gap-3">
            {auditoriumA.map((f) => (
              <ForedragKort key={f.id} f={f} />
            ))}
          </div>
        </div>

        {/* Auditorium B */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-100">
            <span className="rounded-lg bg-violet-600/20 px-3 py-1 text-violet-300 ring-1 ring-violet-500/30">
              Auditorium B
            </span>
          </h2>
          <div className="flex flex-col gap-3">
            {auditoriumB.map((f) => (
              <ForedragKort key={f.id} f={f} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
