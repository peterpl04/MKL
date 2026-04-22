export function PublicSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
      <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900">{title}</h2>
      {children}
    </section>
  );
}
