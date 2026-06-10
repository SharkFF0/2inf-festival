import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { lesBrukere, skrivBrukere, hashPassord, opprettSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { brukernavn, passord, navn, skole } = await req.json();

  if (
    typeof brukernavn !== "string" || brukernavn.trim() === "" ||
    typeof passord !== "string" || passord.length < 6 ||
    typeof navn !== "string" || navn.trim() === "" ||
    typeof skole !== "string" || skole.trim() === ""
  ) {
    return Response.json({ error: "Alle felt må fylles ut. Passord må være minst 6 tegn." }, { status: 400 });
  }

  const brukere = await lesBrukere();

  if (brukere.some((b) => b.brukernavn === brukernavn.trim())) {
    return Response.json({ error: "Brukernavnet er allerede tatt." }, { status: 409 });
  }

  const { hash, salt } = hashPassord(passord);
  const nyBruker = {
    id: randomUUID(),
    brukernavn: brukernavn.trim(),
    navn: navn.trim(),
    skole: skole.trim(),
    passordHash: hash,
    salt,
  };

  brukere.push(nyBruker);
  await skrivBrukere(brukere);

  const token = await opprettSession(nyBruker.id, nyBruker.navn, nyBruker.skole);
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({ ok: true, navn: nyBruker.navn, skole: nyBruker.skole }, { status: 201 });
}
