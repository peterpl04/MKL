import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { PublicSection } from "../../components/public/PublicSection";
import { EmptyState } from "../../components/ui/EmptyState";
import { LoadingState } from "../../components/ui/LoadingState";
import { fetchPublicCompany } from "../../services/company.service";
import type { Company } from "../../types";
import { SECTION_LABELS } from "../../utils/constants";
import { buildGoogleMapsUrl, buildWhatsAppUrl, formatCurrency } from "../../utils/format";

const defaultOrder = ["about", "products", "contact"];

export function CompanyPublicPage() {
  const { slug } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCompany = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchPublicCompany(slug);
        setCompany(data);
      } catch (_error) {
        setCompany(null);
      } finally {
        setIsLoading(false);
      }
    };

    void loadCompany();
  }, [slug]);

  const sectionOrder = useMemo(() => company?.sectionOrder || defaultOrder, [company?.sectionOrder]);

  if (isLoading) {
    return (
      <div className="mx-auto mt-8 w-full max-w-3xl px-4">
        <LoadingState label="Carregando vitrine..." />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="mx-auto mt-8 w-full max-w-3xl px-4">
        <EmptyState
          title="Empresa não encontrada"
          description="Verifique o link ou procure o perfil oficial da empresa para acessar a vitrine correta."
          action={
            <Link to="/" className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Voltar ao início
            </Link>
          }
        />
      </div>
    );
  }

  const isDark = company.theme === "DARK";
  const whatsappUrl = buildWhatsAppUrl(company.whatsapp, company.name);
  const mapsUrl = buildGoogleMapsUrl(company.mapsQuery, company.address);
  const pageTitle = `${company.name} | P/W Digital`;
  const pageDescription = company.description || `Conheça ${company.name} e seus produtos na P/W Digital.`;

  return (
    <main className={isDark ? "min-h-screen bg-slate-950 text-slate-100" : "min-h-screen bg-slate-50 text-slate-900"}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Helmet>

      <section className="relative h-52 w-full overflow-hidden sm:h-64">
        {company.bannerUrl ? (
          <img src={company.bannerUrl} alt={`Banner da ${company.name}`} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" style={{ background: `linear-gradient(120deg, ${company.primaryColor} 0%, #111827 120%)` }} />
        )}
      </section>

      <section className="mx-auto -mt-10 w-full max-w-5xl px-4 pb-10">
        <article className={isDark ? "rounded-3xl border border-slate-800 bg-slate-900 p-6" : "rounded-3xl border border-slate-200 bg-white p-6"}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={`Logo da ${company.name}`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-black text-slate-500">{company.name[0]}</div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight">{company.name}</h1>
              <p className={isDark ? "text-slate-300" : "text-slate-600"}>{company.category || "Empresa local"}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: company.primaryColor }}
            >
              Chamar no WhatsApp
            </a>
            {company.instagram ? (
              <a
                href={`https://instagram.com/${company.instagram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className={isDark ? "rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold" : "rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold"}
              >
                Instagram
              </a>
            ) : null}
            {mapsUrl !== "#" ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className={isDark ? "rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold" : "rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold"}
              >
                Ver no mapa
              </a>
            ) : null}
          </div>
        </article>

        <div className="mt-6 space-y-5">
          {sectionOrder.map((section) => {
            if (section === "about") {
              return (
                <PublicSection key={section} title={SECTION_LABELS.about}>
                  <p className={isDark ? "text-slate-300" : "text-slate-700"}>{company.description || "Sem descrição disponível."}</p>
                </PublicSection>
              );
            }

            if (section === "products") {
              return (
                <PublicSection key={section} title={SECTION_LABELS.products}>
                  {!company.products || company.products.length === 0 ? (
                    <p className={isDark ? "text-slate-300" : "text-slate-700"}>Nenhum produto cadastrado no momento.</p>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {company.products.map((product) => (
                        <article key={product.id} className={isDark ? "rounded-2xl border border-slate-800 bg-slate-900 p-4" : "rounded-2xl border border-slate-200 bg-slate-50 p-4"}>
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="mb-3 h-40 w-full rounded-xl object-cover" />
                          ) : null}
                          <h3 className="text-lg font-bold">{product.name}</h3>
                          {product.description ? <p className="mt-2 text-sm">{product.description}</p> : null}
                          <strong className="mt-3 inline-block text-sm" style={{ color: company.primaryColor }}>
                            {formatCurrency(product.price)}
                          </strong>
                        </article>
                      ))}
                    </div>
                  )}
                </PublicSection>
              );
            }

            if (section === "contact") {
              return (
                <PublicSection key={section} title={SECTION_LABELS.contact}>
                  <div className={isDark ? "space-y-2 text-slate-300" : "space-y-2 text-slate-700"}>
                    <p>Telefone: {company.phone || "Não informado"}</p>
                    <p>WhatsApp: {company.whatsapp || "Não informado"}</p>
                    <p>Endereço: {company.address || "Não informado"}</p>
                  </div>
                </PublicSection>
              );
            }

            return null;
          })}
        </div>
      </section>
    </main>
  );
}
