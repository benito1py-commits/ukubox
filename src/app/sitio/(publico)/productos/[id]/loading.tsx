export default function CargandoProducto() {
  return (
    <div className="bg-gray-50/50 min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="h-4 w-32 bg-muted rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-border rounded-2xl overflow-hidden">
          <div className="aspect-square bg-muted animate-pulse" />
          <div className="p-6 md:p-8 space-y-4">
            <div className="h-3 w-24 bg-muted rounded animate-pulse" />
            <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-8 w-28 bg-muted rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-11 w-48 bg-muted rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
