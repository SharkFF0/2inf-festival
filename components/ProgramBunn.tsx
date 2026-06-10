"use client";
import Link from "next/link";
import { usePamelding } from "./PameldingProvider";

export default function ProgramBunn() {
  const { valgte } = usePamelding();
  const igjen = 3 - valgte.length;

  return (
    <div className="mt-12 flex flex-col items-center gap-3">
      {valgte.length < 3 && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {igjen === 3
            ? "Klikk på foredragene du vil delta på"
            : `Velg ${igjen} foredrag til`}
        </p>
      )}
      <Link
        href="/min-pamelding"
        className={`inline-flex items-center gap-2 rounded-lg px-8 py-3 text-base font-semibold text-white transition-colors shadow-sm
          ${valgte.length === 3
            ? "bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500"
            : "bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600"
          }`}
      >
        Velg
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-sm font-bold">
          {valgte.length}/3
        </span>
      </Link>
    </div>
  );
}
