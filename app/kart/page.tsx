"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const steder = [
  {
    ikon: "🏛️",
    navn: "Teknologibygget",
    beskrivelse: "Hoveddør og resepsjon — start her!",
  },
  {
    ikon: "🎤",
    navn: "Auditorium A & B",
    beskrivelse: "Foredrag hele dagen (09:00–14:15)",
  },
  {
    ikon: "🍽️",
    navn: "Kantine",
    beskrivelse: "Fellesareal og lunsjpause 11:45–12:15",
  },
  {
    ikon: "🛠️",
    navn: "Klasserom / Lab",
    beskrivelse: "Workshops i Teknologibygget og Hovedbygget",
  },
  {
    ikon: "🅿️",
    navn: "Parkering",
    beskrivelse: "Begrenset parkering på skoleområdet",
  },
];

export default function Kart() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Kart</h1>
        <p className="mt-2 text-slate-400">
          Hamar katedralskole &mdash; Teknologibygget. Klikk på markørene for
          detaljer.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700 shadow-xl">
        <Map />
      </div>

      {/* Legend */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-200">
          Steder på kartet
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {steder.map((s) => (
            <div
              key={s.navn}
              className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-800/60 p-4"
            >
              <span className="text-2xl">{s.ikon}</span>
              <div>
                <p className="font-medium text-slate-200">{s.navn}</p>
                <p className="text-sm text-slate-400">{s.beskrivelse}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-600">
        Kartdata &copy; OpenStreetMap-bidragsytere
      </p>
    </div>
  );
}
