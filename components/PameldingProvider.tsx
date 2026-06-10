"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { foredrag } from "@/data/festival";

type PameldingContextType = {
  valgte: number[];
  velg: (id: number) => void;
  fjern: (id: number) => void;
  harValgt: (id: number) => boolean;
  harTidskonflikt: (id: number) => boolean;
};

const PameldingContext = createContext<PameldingContextType | null>(null);

export function PameldingProvider({ children }: { children: React.ReactNode }) {
  const [valgte, setValgte] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("pamelding-foredrag");
    if (stored) {
      try {
        setValgte(JSON.parse(stored));
      } catch {
        // ignore corrupt data
      }
    }
  }, []);

  function save(ids: number[]) {
    setValgte(ids);
    localStorage.setItem("pamelding-foredrag", JSON.stringify(ids));
  }

  function harTidskonflikt(id: number): boolean {
    const nytt = foredrag.find((f) => f.id === id);
    if (!nytt) return false;
    return valgte.some((vId) => {
      const v = foredrag.find((f) => f.id === vId);
      return v?.startTid === nytt.startTid;
    });
  }

  function velg(id: number) {
    if (valgte.length >= 3 || valgte.includes(id) || harTidskonflikt(id)) return;
    save([...valgte, id]);
  }

  function fjern(id: number) {
    save(valgte.filter((v) => v !== id));
  }

  function harValgt(id: number) {
    return valgte.includes(id);
  }

  return (
    <PameldingContext.Provider value={{ valgte, velg, fjern, harValgt, harTidskonflikt }}>
      {children}
    </PameldingContext.Provider>
  );
}

export function usePamelding() {
  const ctx = useContext(PameldingContext);
  if (!ctx) throw new Error("usePamelding must be used inside PameldingProvider");
  return ctx;
}
