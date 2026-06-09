import { festival, laerere } from "@/data/festival";
import Link from "next/link";

function InfoKort({ ikon, tittel, children }: { ikon: string; tittel: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/60">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
        <span>{ikon}</span> {tittel}
      </h2>
      <div className="text-slate-600 leading-relaxed dark:text-slate-400">{children}</div>
    </div>
  );
}

export default function Praktisk() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Praktisk informasjon</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Alt du trenger å vite før du besøker 2INF Festival 2027.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <InfoKort ikon="📅" tittel="Dato og tid">
          <p className="font-medium text-slate-800 dark:text-slate-200">18. mars 2027</p>
          <p>{festival.startTid} – {festival.sluttTid}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">Lunsjpause ca. 11:45–12:15</p>
        </InfoKort>

        <InfoKort ikon="📍" tittel="Sted">
          <p className="font-medium text-slate-800 dark:text-slate-200">{festival.sted}</p>
          <p>{festival.bygning}</p>
          <p className="mt-1">Hamar, Norge</p>
          <Link
            href="/kart"
            className="mt-2 inline-block text-indigo-600 transition-colors hover:text-indigo-500 text-sm dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Vis på kart →
          </Link>
        </InfoKort>

        <InfoKort ikon="🚶" tittel="Adkomst">
          <ul className="space-y-1 text-sm">
            <li>🚌 Buss: Ruta / Innlandstrafikk stopper ved Hamar stasjon (10 min gange)</li>
            <li>🚂 Tog: Hamar togstasjon, 10 minutters gange til skolen</li>
            <li>🚗 Bil: Begrenset parkering på skoleområdet — bruk gateparkering i nærheten</li>
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
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">Lunsjpause kl. 11:45–12:15. Ta gjerne med egen mat.</p>
        </InfoKort>

        <InfoKort ikon="📶" tittel="WiFi og teknologi">
          <p>Gratis WiFi tilgjengelig i alle rom.</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">Nettverksnavn og passord fås ved inngang.</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">Stikkontakter finnes i auditoriene og klasserommene.</p>
        </InfoKort>
      </div>

      {/* Kontaktpersoner */}
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-slate-100">Kontaktpersoner</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {laerere.map((l) => (
            <div
              key={l.id}
              className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/60"
            >
              <p className="font-medium text-slate-900 dark:text-slate-200">{l.navn}</p>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">{l.ansvarsomraade}</p>
              <a
                href={`mailto:${l.epost}`}
                className="text-xs text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300"
              >
                {l.epost}
              </a>
              <p className="text-xs text-slate-400 dark:text-slate-600">{l.telefon}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generelt kontakt */}
      <div className="mt-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6 text-center dark:border-indigo-500/30 dark:bg-indigo-500/5">
        <p className="text-slate-600 dark:text-slate-300">Generelle spørsmål? Send e-post til</p>
        <a
          href={`mailto:${festival.kontaktEpost}`}
          className="mt-1 block text-lg font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {festival.kontaktEpost}
        </a>
      </div>
    </div>
  );
}
