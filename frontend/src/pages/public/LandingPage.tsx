import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-teal-50 via-amber-50 to-slate-100">
      <Helmet>
        <title>P/W Digital | Site Builder para Empresas Locais</title>
        <meta
          name="description"
          content="Crie sua página profissional em minutos com a P/W Digital. Mostre seus produtos, receba contatos e fortaleça sua presença online."
        />
      </Helmet>

      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-20 -translate-y-10 rounded-full bg-teal-300/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-16 translate-y-12 rounded-full bg-amber-300/40 blur-3xl" />

      <section className="relative mx-auto flex w-full max-w-6xl flex-col px-4 py-8">
        <header className="flex items-center justify-between">
          <span className="text-xl font-black tracking-tight text-slate-900">P/W Digital</span>
          <div className="flex gap-2">
            <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white/70">
              Entrar
            </Link>
            <Link to="/cadastro" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Criar conta
            </Link>
          </div>
        </header>

        <article className="mt-16 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex rounded-full border border-teal-200 bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-900">
              Mini site builder para negócios locais
            </p>
            <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight text-slate-900 md:text-6xl">
              Sua empresa online com identidade própria.
            </h1>
            <p className="mt-5 max-w-lg text-base text-slate-600">
              Configure sua página profissional, exiba produtos e receba contatos no WhatsApp sem precisar saber programar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/cadastro" className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-600">
                Começar grátis
              </Link>
              <Link to="/login" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Acessar dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
            <h2 className="text-lg font-black text-slate-900">Tudo que sua empresa precisa</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>Painel para editar perfil, produtos e visual.</li>
              <li>URL amigável para divulgar nas redes sociais.</li>
              <li>SEO básico para melhorar descobertas no Google.</li>
              <li>Tema claro/escuro e cor principal personalizada.</li>
            </ul>
          </div>
        </article>
      </section>
    </main>
  );
}
