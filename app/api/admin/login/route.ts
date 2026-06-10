import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { opprettAdminSession } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const { passord } = await req.json();

  if (!process.env.FESTIVALSJEF_PASSORD) {
    return Response.json({ error: "Admin-passord er ikke konfigurert." }, { status: 500 });
  }

  if (passord !== process.env.FESTIVALSJEF_PASSORD) {
    return Response.json({ error: "Feil passord." }, { status: 401 });
  }

  const token = await opprettAdminSession();
  const cookieStore = await cookies();
  cookieStore.set("admin-session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
    secure: process.env.NODE_ENV === "production",
  });

  return Response.json({ ok: true });
}
