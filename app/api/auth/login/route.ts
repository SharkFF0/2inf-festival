import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { lesBrukere, sjekkPassord, opprettSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { brukernavn, passord } = await req.json();

  if (!brukernavn || !passord) {
    return Response.json({ error: "Fyll ut brukernavn og passord." }, { status: 400 });
  }

  const brukere = await lesBrukere();
  const bruker = brukere.find((b) => b.brukernavn === brukernavn);

  if (!bruker || !sjekkPassord(passord, bruker.passordHash, bruker.salt)) {
    return Response.json({ error: "Feil brukernavn eller passord." }, { status: 401 });
  }

  const token = await opprettSession(bruker.id, bruker.navn, bruker.skole);
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  return Response.json({ ok: true, navn: bruker.navn, skole: bruker.skole });
}
