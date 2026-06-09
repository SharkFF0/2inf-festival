import Link from "next/link";
import { festival, bedrifter, foredrag, workshops } from "@/data/festival";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-24 text-center dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 ring-1 ring-indigo-500/20">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
            18. mars 2027 &bull; Hamar katedralskole
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {festival.navn}
          </h1>
          <p className="mb-8 text-lg text-slate-300 sm:text-xl">
            {festival.beskrivelse}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/program"
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-900/50 transition-colors hover:bg-indigo-500"
            >
              Se programmet
            </Link>
            <Link
              href="/bedrifter"
              className="rounded-lg border border-slate-600 px-6 py-3 font-semibold text-slate-200 transition-colors hover:bg-slate-800"
            >
              Møt bedriftene
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-800 bg-slate-900 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-slate-800 md:grid-cols-4">
          {[
            { num: bedrifter.length, label: "Bedrifter" },
            { num: foredrag.length, label: "Foredrag" },
            { num: workshops.length, label: "Workshops" },
            { num: "09–15", label: "Åpningstider" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-8 text-center">
              <span className="text-3xl font-bold text-indigo-400">{s.num}</span>
              <span className="mt-1 text-sm text-slate-400">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick-nav cards */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold text-slate-100 dark:text-slate-100">
          Utforsk festivalen
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/program", icon: "🎤", title: "Program", desc: `${foredrag.length} foredrag fordelt over to auditorier` },
            { href: "/bedrifter", icon: "🏢", title: "Bedrifter", desc: `${bedrifter.length} teknologibedrifter med egne stander` },
            { href: "/workshops", icon: "🛠️", title: "Workshops", desc: `${workshops.length} praktiske workshops – kom i gang!` },
            { href: "/kart", icon: "🗺️", title: "Kart", desc: "Finn frem på skolen under festivalen" },
            { href: "/praktisk", icon: "ℹ️", title: "Praktisk info", desc: "Alt du trenger å vite som besøkende" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-all hover:border-indigo-500/50 hover:bg-slate-800 dark:border-slate-700 dark:bg-slate-800/50"
            >
              <span className="text-3xl">{c.icon}</span>
              <h3 className="font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
                {c.title}
              </h3>
              <p className="text-sm text-slate-400">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Info boxes */}
      <section className="bg-slate-900/50 px-4 py-16 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
            <h3 className="mb-3 text-lg font-semibold text-slate-100">📅 Dato og tid</h3>
            <p className="text-slate-300">18. mars 2027</p>
            <p className="text-slate-400">{festival.startTid} – {festival.sluttTid}</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
            <h3 className="mb-3 text-lg font-semibold text-slate-100">📍 Sted</h3>
            <p className="text-slate-300">{festival.sted}</p>
            <p className="text-slate-400">{festival.bygning}</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
            <h3 className="mb-3 text-lg font-semibold text-slate-100">✉️ Kontakt</h3>
            <a
              href={`mailto:${festival.kontaktEpost}`}
              className="text-indigo-400 hover:text-indigo-300 transition-colors break-all"
            >
              {festival.kontaktEpost}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
