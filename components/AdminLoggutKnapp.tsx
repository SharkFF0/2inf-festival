"use client";
import { useRouter } from "next/navigation";

export default function AdminLoggutKnapp() {
  const router = useRouter();

  async function handleLoggut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/festivalsjef-logginn");
  }

  return (
    <button
      onClick={handleLoggut}
      className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
    >
      Logg ut
    </button>
  );
}
