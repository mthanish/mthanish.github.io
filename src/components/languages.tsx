export function Languages() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tighter mb-4 sm:mb-6">
            Languages
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base lg:text-lg">
            English, Hindi and Kannada.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          <span className="px-4 py-2 rounded bg-[var(--bg)] border border-[var(--border)] text-sm">English</span>
          <span className="px-4 py-2 rounded bg-[var(--bg)] border border-[var(--border)] text-sm">Hindi</span>
          <span className="px-4 py-2 rounded bg-[var(--bg)] border border-[var(--border)] text-sm">Kannada</span>
        </div>
      </div>
    </section>
  );
}