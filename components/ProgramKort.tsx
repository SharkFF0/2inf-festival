"use client";
import { usePamelding } from "./PameldingProvider";

type Props = {
  foredrag: {
    id: number;
    tittel: string;
    rom: string;
    kategori: string;
    startTid: string;
    sluttTid: string;
    maksPlasser: number;
  };
  bedriftNavn?: string;
  bedriftStand?: string;
  kategoriFarge: string;
  auditoriumFarge: string;
};

export default function ProgramKort({ foredrag: f, bedriftNavn, bedriftStand, kategoriFarge, auditoriumFarge }: Props) {
  const { valgte, velg, fjern, harValgt, harTidskonflikt } = usePamelding();

  const erValgt = harValgt(f.id);
  const erFull = valgte.length >= 3 && !erValgt;
  const konflikt = !erValgt && harTidskonflikt(f.id);
  const disabled = erFull || konflikt;

  function handleClick() {
    if (disabled) return;
    if (erValgt) fjern(f.id);
    else velg(f.id);
  }

  return (
    <article
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
      className={`flex w-full flex-col gap-1.5 rounded-lg border p-3 transition-all duration-200 select-none
        sm:w-[calc(50%-0.25rem)] lg:w-[calc(33.333%-0.375rem)]
        ${disabled
          ? "cursor-not-allowed opacity-50 border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/60"
          : erValgt
          ? "cursor-pointer border-indigo-400 bg-indigo-50 dark:border-indigo-500/60 dark:bg-indigo-950/30 hover:shadow-md"
          : "cursor-pointer border-slate-200 bg-white hover:scale-[1.01] hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-indigo-500/40 dark:hover:bg-slate-800"
        }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-1.5">
        <h3 className="text-sm font-semibold leading-snug text-slate-900 dark:text-slate-100">{f.tittel}</h3>
        <div className="flex flex-wrap items-center gap-1">
          {erValgt && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${auditoriumFarge}`}>
            {f.rom}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${kategoriFarge}`}>
            {f.kategori}
          </span>
        </div>
      </div>

      {bedriftNavn && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium text-slate-700 dark:text-slate-300">{bedriftNavn}</span>
          {bedriftStand && (
            <span className="text-slate-400 dark:text-slate-600"> &mdash; {bedriftStand}</span>
          )}
        </p>
      )}

      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-slate-400 dark:text-slate-600">Maks {f.maksPlasser} plasser</p>
        {konflikt && (
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Tidskonflikt</span>
        )}
        {erValgt && (
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Klikk for å fjerne</span>
        )}
      </div>
    </article>
  );
}
