import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getCurrentUser } from "@/lib/auth";

type Pamelding = {
  brukerId: string;
  foredragIds: number[];
  tidspunkt: string;
};

const filPath = path.join(process.cwd(), "data", "pameldte.json");

async function les(): Promise<Pamelding[]> {
  try {
    return JSON.parse(await fs.readFile(filPath, "utf-8"));
  } catch {
    return [];
  }
}

async function skriv(data: Pamelding[]) {
  await fs.writeFile(filPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const data = await les();
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Ikke innlogget" }, { status: 401 });

  const { foredragIds } = await req.json();
  if (!Array.isArray(foredragIds) || foredragIds.length !== 3) {
    return Response.json({ error: "Ugyldig data" }, { status: 400 });
  }

  const data = await les();
  const eksisterende = data.findIndex((p) => p.brukerId === user.userId);

  const ny: Pamelding = {
    brukerId: user.userId,
    foredragIds,
    tidspunkt: new Date().toISOString(),
  };

  if (eksisterende >= 0) {
    data[eksisterende] = ny;
  } else {
    data.push(ny);
  }

  await skriv(data);
  return Response.json({ ok: true }, { status: 201 });
}
