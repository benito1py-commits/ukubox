import { requireAdmin, getUndigitizedPackages } from "@/lib/queries/admin";
import { DigitizationClient } from "./digitization-client";

export default async function DigitacionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const result = await getUndigitizedPackages(page);

  return <DigitizationClient result={result} />;
}
