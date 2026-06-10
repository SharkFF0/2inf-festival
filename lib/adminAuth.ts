import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

const sessionFil = path.join(process.cwd(), "data", "admin-sessions.json");

async function lesSessions(): Promise<string[]> {
  try {
    return JSON.parse(await fs.readFile(sessionFil, "utf-8"));
  } catch {
    return [];
  }
}

async function skrivSessions(sessions: string[]) {
  await fs.writeFile(sessionFil, JSON.stringify(sessions, null, 2), "utf-8");
}

export async function opprettAdminSession(): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const sessions = await lesSessions();
  sessions.push(token);
  await skrivSessions(sessions);
  return token;
}

export async function slettAdminSession(token: string) {
  const sessions = await lesSessions();
  await skrivSessions(sessions.filter((t) => t !== token));
}

export async function getCurrentAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-session")?.value;
  if (!token) return false;
  const sessions = await lesSessions();
  return sessions.includes(token);
}
