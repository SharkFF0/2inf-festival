import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import MinPameldingClient from "@/components/MinPameldingClient";

export default async function MinPamelding() {
  const user = await getCurrentUser();
  if (!user) redirect("/logginn?redirect=/min-pamelding");
  return <MinPameldingClient navn={user.navn} skole={user.skole} />;
}
