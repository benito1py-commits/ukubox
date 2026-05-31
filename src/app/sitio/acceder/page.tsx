import AccederForm from "./AccederForm";

export const metadata = {
  title: "Acceder - UKUXBOX",
};

export default async function AccederPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-muted/30">
      <AccederForm next={next || "/sitio/cuenta"} />
    </div>
  );
}
