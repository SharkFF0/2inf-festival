import { cookies } from "next/headers";
import { slettAdminSession } from "@/lib/adminAuth";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-session")?.value;
  if (token) await slettAdminSession(token);
  cookieStore.delete("admin-session");
  return Response.json({ ok: true });
}
