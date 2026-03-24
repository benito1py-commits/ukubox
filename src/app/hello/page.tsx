export default function HelloPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary to-blue-900 text-white">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-7xl font-black mb-6">Hello World</h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-lg mx-auto leading-relaxed">
          Bienvenido a UKUXBOX — tu casillero en Miami.
        </p>
        <div className="mt-10 w-20 h-1 bg-accent mx-auto rounded-full" />
      </div>
    </section>
  );
}
