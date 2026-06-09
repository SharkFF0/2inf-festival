import { festival } from "@/data/festival";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-100 py-8 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-2 text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="font-semibold text-slate-700 dark:text-slate-200">
            {festival.navn} &mdash; {festival.dato}
          </p>
          <p>
            {festival.sted}, {festival.bygning}
          </p>
          <p>
            <a
              href={`mailto:${festival.kontaktEpost}`}
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {festival.kontaktEpost}
            </a>
          </p>
          <p className="mt-2 text-slate-500">
            &copy; {new Date().getFullYear()} VG2 Informasjonsteknologi &mdash;
            Hamar katedralskole
          </p>
        </div>
      </div>
    </footer>
  );
}
