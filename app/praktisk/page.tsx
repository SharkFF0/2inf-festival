import { festival, laerere } from "@/data/festival";
import Link from "next/link";

function InfoKort({
  ikon,
  tittel,
  children,
}: {
  ikon: string;
  tittel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-6">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-100">
        <span>{ikon}</span> {tittel}
      </h2>
      <div className="text-slate-400 leading-relaxed">{children}</div>
    </div>
  );
}

export default function Praktisk() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-100">
          Praktisk informasjon
        </h1>
        <p className="mt-2 text-slate-400">
          Alt du trenger å vite før du besøker 2INF Festival 2027.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <InfoKort ikon="📅" tittel="Dato og tid">
          <p className="text-slate-200 font-medium">18. mars 2027</p>
          <p>
            {festival.startTid} – {festival.sluttTid}
          </p>
          <p className="mt-1 text-sm">Lunsjpause ca. 11:45–12:15</p>
        </InfoKort>

        <InfoKort ikon="📍" tittel="Sted">
          <p className="text-slate-200 font-medium">{festival.sted}</p>
          <p>{festival.bygning}</p>
          <p className="mt-1">Hamar, Norge</p>
          <Link
            href="/kart"
            className="mt-2 inline-block text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
          >
            Vis på kart →
          </Link>
        </InfoKort>

        <InfoKort ikon="🚶" tittel="Adkomst">
          <ul className="space-y-1 text-sm">
            <li>
              🚌 Buss: Ruta / Innlandstrafikk stopper ved Hamar stasjon (10 min
              gange)
            </li>
            <li>🚂 Tog: Hamar togstasjon, 10 minutters gange til skolen</li>
            <li>
              🚗 Bil: Begrenset parkering på skoleområdet — bruk gateparkering i
              nærheten
            </li>
            <li>🚲 Sykkel: Sykkelparkering ved hoveddøren</li>
          </ul>
        </InfoKort>

        <InfoKort ikon="📋" tittel="Regler og praktisk">
          <ul className="space-y-1 text-sm">
            <li>✅ Gratis inngang for alle besøkende</li>
            <li>✅ Husk å registrere deg ved inngang</li>
            <li>✅ Ta med PC til workshops dersom mulig</li>
            <li>⚠️ Vær stille i gangene mellom foredragene</li>
            <li>⚠️ Begrens matinntak til kantineområdet</li>
            <li>♿ Rullestolvennlig adgang via hovedinngang</li>
          </ul>
        </InfoKort>

        <InfoKort ikon="🍽️" tittel="Mat og drikke">
          <p>Kantinen er åpen hele dagen og tilbyr enkel servering.</p>
          <p className="mt-1 text-sm">
            Lunsjpause kl. 11:45–12:15. Ta gjerne med egen mat.
          </p>
        </InfoKort>

        <InfoKort ikon="📶" tittel="WiFi og teknologi">
          <p>Gratis WiFi tilgjengelig i alle rom.</p>
          <p className="mt-1 text-sm">
            Nettverksnavn og passord fås ved inngang.
          </p>
          <p className="mt-1 text-sm">
            Stikkontakter finnes i auditoriene og klasserommene.
          </p>
        </InfoKort>
      </div>

      {/* Kontaktpersoner */}
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-semibold text-slate-100">
          Kontaktpersoner
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {laerere.map((l) => (
            <div
              key={l.id}
              className="flex flex-col gap-1 rounded-xl border border-slate-700 bg-slate-800/60 p-4"
            >
              <p className="font-medium text-slate-200">{l.navn}</p>
              <p className="text-sm text-indigo-400">{l.ansvarsomraade}</p>
              <a
                href={`mailto:${l.epost}`}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                {l.epost}
              </a>
              <p className="text-xs text-slate-600">{l.telefon}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generelt kontakt */}
      <div className="mt-8 rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-6 text-center">
        <p className="text-slate-300">Generelle spørsmål? Send e-post til</p>
        <a
          href={`mailto:${festival.kontaktEpost}`}
          className="mt-1 block text-lg font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {festival.kontaktEpost}
        </a>
      </div>
    </div>
  );
}
