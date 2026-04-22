import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { z } from "zod";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { LoadingState } from "../../components/ui/LoadingState";
import { Select } from "../../components/ui/Select";
import { Textarea } from "../../components/ui/Textarea";
import { fetchMyCompany, upsertMyCompany } from "../../services/company.service";
import { uploadImage } from "../../services/upload.service";
import { SECTION_LABELS } from "../../utils/constants";

const companySchema = z.object({
  name: z.string().min(2, "Informe o nome da empresa"),
  description: z.string().optional(),
  category: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  logoUrl: z.string().url("URL inválida").or(z.literal("")),
  bannerUrl: z.string().url("URL inválida").or(z.literal("")),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Cor inválida"),
  theme: z.enum(["LIGHT", "DARK"]),
  mapsQuery: z.string().optional()
});

type CompanyFormData = z.infer<typeof companySchema>;

const initialSections = ["about", "products", "contact"];

export function CompanyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [sectionOrder, setSectionOrder] = useState<string[]>(initialSections);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      address: "",
      phone: "",
      whatsapp: "",
      instagram: "",
      logoUrl: "",
      bannerUrl: "",
      primaryColor: "#0f766e",
      theme: "LIGHT",
      mapsQuery: ""
    }
  });

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const company = await fetchMyCompany();

        if (company) {
          setValue("name", company.name);
          setValue("description", company.description || "");
          setValue("category", company.category || "");
          setValue("address", company.address || "");
          setValue("phone", company.phone || "");
          setValue("whatsapp", company.whatsapp || "");
          setValue("instagram", company.instagram || "");
          setValue("logoUrl", company.logoUrl || "");
          setValue("bannerUrl", company.bannerUrl || "");
          setValue("primaryColor", company.primaryColor || "#0f766e");
          setValue("theme", company.theme || "LIGHT");
          setValue("mapsQuery", company.mapsQuery || "");
          setSectionOrder(company.sectionOrder?.length ? company.sectionOrder : initialSections);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadCompany();
  }, [setValue]);

  const moveSection = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= sectionOrder.length) {
      return;
    }

    const updated = [...sectionOrder];
    const item = updated[index];
    updated[index] = updated[target];
    updated[target] = item;
    setSectionOrder(updated);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, kind: "logo" | "banner") => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      if (kind === "logo") {
        setIsUploadingLogo(true);
      } else {
        setIsUploadingBanner(true);
      }

      const imageUrl = await uploadImage(file);
      setValue(kind === "logo" ? "logoUrl" : "bannerUrl", imageUrl, { shouldValidate: true });
      toast.success("Imagem enviada com sucesso");
    } catch (_error) {
      toast.error("Não foi possível enviar a imagem");
    } finally {
      if (kind === "logo") {
        setIsUploadingLogo(false);
      } else {
        setIsUploadingBanner(false);
      }
      event.target.value = "";
    }
  };

  const onSubmit = async (data: CompanyFormData) => {
    try {
      setIsSaving(true);
      await upsertMyCompany({
        ...data,
        logoUrl: data.logoUrl || undefined,
        bannerUrl: data.bannerUrl || undefined,
        sectionOrder
      });
      toast.success("Empresa atualizada com sucesso");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingState label="Carregando dados da empresa..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>Empresa | Vitrine Digital</title>
      </Helmet>

      <h1 className="text-2xl font-black tracking-tight text-slate-900">Cadastro da Empresa</h1>
      <p className="mt-2 text-sm text-slate-600">Configure os dados da sua marca e personalize sua vitrine pública.</p>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-2">
          <Input label="Nome da empresa" error={errors.name?.message} {...register("name")} />
          <Input label="Categoria" error={errors.category?.message} {...register("category")} />
          <Input label="Telefone" error={errors.phone?.message} {...register("phone")} />
          <Input label="WhatsApp" error={errors.whatsapp?.message} {...register("whatsapp")} />
          <Input label="Instagram" placeholder="@suaempresa" error={errors.instagram?.message} {...register("instagram")} />
          <Input label="Endereço" error={errors.address?.message} {...register("address")} />
          <div className="md:col-span-2">
            <Textarea label="Descrição" error={errors.description?.message} {...register("description")} />
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-2">
          <Input label="URL da logo" error={errors.logoUrl?.message} {...register("logoUrl")} />
          <Input label="URL do banner" error={errors.bannerUrl?.message} {...register("bannerUrl")} />

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">Upload da logo</span>
            <input type="file" accept="image/*" onChange={(event) => void handleFileUpload(event, "logo")} />
            {isUploadingLogo ? <p className="text-xs text-slate-500">Enviando logo...</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">Upload do banner</span>
            <input type="file" accept="image/*" onChange={(event) => void handleFileUpload(event, "banner")} />
            {isUploadingBanner ? <p className="text-xs text-slate-500">Enviando banner...</p> : null}
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-3">
          <Input label="Cor principal" type="color" error={errors.primaryColor?.message} {...register("primaryColor")} />

          <Select
            label="Tema"
            options={[
              { value: "LIGHT", label: "Claro" },
              { value: "DARK", label: "Escuro" }
            ]}
            error={errors.theme?.message}
            {...register("theme")}
          />

          <Input label="Busca do Google Maps" placeholder="Rua X, Cidade" error={errors.mapsQuery?.message} {...register("mapsQuery")} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-black text-slate-900">Ordem das seções da página</h2>
          <p className="mt-1 text-sm text-slate-600">Use os botões para priorizar o que aparece primeiro na sua vitrine.</p>

          <div className="mt-4 space-y-2">
            {sectionOrder.map((section, index) => (
              <article key={section} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <span className="text-sm font-semibold text-slate-700">{SECTION_LABELS[section] || section}</span>
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" onClick={() => moveSection(index, -1)}>
                    Subir
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => moveSection(index, 1)}>
                    Descer
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Button type="submit" isLoading={isSaving}>
          Salvar empresa
        </Button>
      </form>
    </DashboardLayout>
  );
}
