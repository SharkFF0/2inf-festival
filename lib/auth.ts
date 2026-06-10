import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

export type Bruker = {
  id: string;
  brukernavn: string;
  navn: string;
  skole: string;
  passordHash: string;
  salt: string;
};

export type Session = {
  userId: string;
  navn: string;
  skole: string;
};

const brukerFil = path.join(process.cwd(), "data", "brukere.json");
const sessionFil = path.join(process.cwd(), "data", "sessions.json");

export async function lesBrukere(): Promise<Bruker[]> {
  try {
    return JSON.parse(await fs.readFile(brukerFil, "utf-8"));
  } catch {
    return [];
  }
}

export async function skrivBrukere(brukere: Bruker[]) {
  await fs.writeFile(brukerFil, JSON.stringify(brukere, null, 2), "utf-8");
}

async function lesSessions(): Promise<Record<string, Session>> {
  try {
    return JSON.parse(await fs.readFile(sessionFil, "utf-8"));
  } catch {
    return {};
  }
}

async function skrivSessions(sessions: Record<string, Session>) {
  await fs.writeFile(sessionFil, JSON.stringify(sessions, null, 2), "utf-8");
}

export function hashPassord(passord: string): { hash: string; salt: string } {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(passord, salt, 64).toString("hex");
  return { hash, salt };
}

export function sjekkPassord(passord: string, hash: string, salt: string): boolean {
  try {
    const nyHash = scryptSync(passord, salt, 64).toString("hex");
    return timingSafeEqual(Buffer.from(nyHash, "hex"), Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}

export async function opprettSession(userId: string, navn: string, skole: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const sessions = await lesSessions();
  sessions[token] = { userId, navn, skole };
  await skrivSessions(sessions);
  return token;
}

export async function slettSession(token: string) {
  const sessions = await lesSessions();
  delete sessions[token];
  await skrivSessions(sessions);
}

export async function hentSession(token: string): Promise<Session | null> {
  const sessions = await lesSessions();
  return sessions[token] ?? null;
}

export async function getCurrentUser(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;
  return hentSession(token);
}
