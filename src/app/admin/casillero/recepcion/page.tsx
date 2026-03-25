import { requireAdmin, getReceptionPackages } from "@/lib/queries/admin";
import { ReceptionClient } from "./reception-client";

export default async function RecepcionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const result = await getReceptionPackages(page);

  return <ReceptionClient result={result} />;
}
