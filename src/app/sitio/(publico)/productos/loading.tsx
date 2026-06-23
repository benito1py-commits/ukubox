export default function CargandoProductos() {
  return (
    <div className="bg-gray-50/50">
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="h-3 w-40 bg-white/20 rounded mb-4" />
            <div className="h-10 w-80 bg-white/20 rounded mb-3" />
            <div className="h-4 w-96 max-w-full bg-white/10 rounded" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-border rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-5 w-12 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
