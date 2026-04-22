import { Link } from "react-router-dom";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-teal-50 to-slate-100 px-4 py-10">
      <div className="absolute -left-24 top-10 h-52 w-52 rounded-full bg-amber-300/50 blur-3xl" />
      <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal-300/40 blur-3xl" />

      <div className="relative mx-auto w-full max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-xl font-black tracking-tight text-slate-900">
            P/W Digital
          </Link>
          <span className="rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
            SaaS para empresas locais
          </span>
        </header>

        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 backdrop-blur-sm">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">{title}</h1>
            <p className="mt-3 max-w-md text-slate-600">{subtitle}</p>
            <div className="mt-8 grid gap-3 text-sm text-slate-600">
              <p>Publique sua vitrine com URL amigável.</p>
              <p>Gerencie produtos e apareça melhor nas buscas.</p>
              <p>Atenda clientes direto no WhatsApp.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5">{children}</div>
        </div>
      </div>
    </div>
  );
}
