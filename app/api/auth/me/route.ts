import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return Response.json(null, { status: 401 });
  return Response.json({ navn: user.navn, skole: user.skole });
}
