import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { EmptyState } from "../../components/ui/EmptyState";
import { LoadingState } from "../../components/ui/LoadingState";
import { fetchAnalytics, fetchMyCompany } from "../../services/company.service";
import type { Analytics, Company } from "../../types";
import { PUBLIC_BASE_URL } from "../../utils/constants";

export function DashboardHomePage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [companyData, analyticsData] = await Promise.all([fetchMyCompany(), fetchAnalytics()]);
        setCompany(companyData);
        setAnalytics(analyticsData);
      } catch (_error) {
        setCompany(null);
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, []);

  return (
    <DashboardLayout>
      <Helmet>
        <title>Dashboard | P/W Digital</title>
      </Helmet>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-slate-900 p-5 text-white">
          <p className="text-xs uppercase tracking-wider text-slate-300">Visitas na vitrine</p>
          <p className="mt-2 text-4xl font-black">{analytics?.visits ?? 0}</p>
        </article>

        <article className="rounded-2xl bg-amber-200 p-5 text-slate-900">
          <p className="text-xs uppercase tracking-wider text-slate-700">Status da empresa</p>
          <p className="mt-2 text-lg font-black">{company ? "Perfil publicado" : "Configuração pendente"}</p>
        </article>

        <article className="rounded-2xl bg-teal-200 p-5 text-slate-900">
          <p className="text-xs uppercase tracking-wider text-slate-700">URL pública</p>
          <p className="mt-2 truncate text-sm font-bold">{company ? `/empresa/${company.slug}` : "Defina sua empresa"}</p>
        </article>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Resumo da sua Vitrine</h1>
        <p className="mt-2 text-sm text-slate-600">
          Gerencie informações, produtos e identidade visual para fortalecer sua presença online.
        </p>

        {isLoading ? (
          <div className="mt-5">
            <LoadingState />
          </div>
        ) : !company ? (
          <div className="mt-5">
            <EmptyState
              title="Cadastre sua empresa"
              description="Seu perfil ainda não foi criado. Complete os dados para liberar a vitrine pública."
              action={
                <Link
                  to="/app/empresa"
                  className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Configurar empresa
                </Link>
              }
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-lg font-black text-slate-900">{company.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{company.description || "Adicione uma descrição para melhorar seu posicionamento."}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">Categoria: {company.category || "Não definida"}</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Preview público</h3>
              <p className="mt-2 break-all text-sm text-slate-700">{PUBLIC_BASE_URL}/empresa/{company.slug}</p>
              <a
                href={`/empresa/${company.slug}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
              >
                Abrir página pública
              </a>
            </article>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}
