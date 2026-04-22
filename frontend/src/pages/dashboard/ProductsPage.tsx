import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { z } from "zod";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { Input } from "../../components/ui/Input";
import { LoadingState } from "../../components/ui/LoadingState";
import { Textarea } from "../../components/ui/Textarea";
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "../../services/product.service";
import { uploadImage } from "../../services/upload.service";
import type { Product } from "../../types";
import { formatCurrency } from "../../utils/format";

const productSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  description: z.string().optional(),
  price: z.string().optional(),
  imageUrl: z.string().url("URL inválida").or(z.literal("")),
  category: z.string().optional()
});

type ProductFormData = z.infer<typeof productSchema>;

const productDefaults: ProductFormData = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  category: ""
};

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: productDefaults
  });

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (_error) {
      toast.error("Não foi possível carregar os produtos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const formTitle = useMemo(() => (editingProduct ? "Editar produto" : "Novo produto"), [editingProduct]);

  const onUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const url = await uploadImage(file);
      setValue("imageUrl", url, { shouldValidate: true });
      toast.success("Imagem enviada com sucesso");
    } catch (_error) {
      toast.error("Falha no upload da imagem");
    } finally {
      event.target.value = "";
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);

      const payload = {
        name: data.name,
        description: data.description || undefined,
        category: data.category || undefined,
        imageUrl: data.imageUrl || undefined,
        price: data.price ? Number(data.price) : undefined
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
        toast.success("Produto atualizado");
      } else {
        await createProduct(payload);
        toast.success("Produto criado");
      }

      setEditingProduct(null);
      reset(productDefaults);
      await loadProducts();
    } finally {
      setIsSubmitting(false);
    }
  };

  const onEdit = (product: Product) => {
    setEditingProduct(product);
    reset({
      name: product.name,
      description: product.description || "",
      price: product.price || "",
      imageUrl: product.imageUrl || "",
      category: product.category || ""
    });
  };

  const onDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success("Produto removido");
      await loadProducts();
    } catch (_error) {
      toast.error("Não foi possível remover");
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Produtos | P/W Digital</title>
      </Helmet>

      <h1 className="text-2xl font-black tracking-tight text-slate-900">Produtos e Serviços</h1>
      <p className="mt-2 text-sm text-slate-600">Crie e atualize seu catálogo com imagens e preço opcional.</p>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-black text-slate-900">{formTitle}</h2>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Nome" error={errors.name?.message} {...register("name")} />
            <Textarea label="Descrição" error={errors.description?.message} {...register("description")} />
            <Input label="Categoria" error={errors.category?.message} {...register("category")} />
            <Input label="Preço (opcional)" placeholder="Ex: 79.90" error={errors.price?.message} {...register("price")} />
            <Input label="URL da imagem" error={errors.imageUrl?.message} {...register("imageUrl")} />
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">Upload de imagem</span>
              <input type="file" accept="image/*" onChange={(event) => void onUploadImage(event)} />
            </div>

            <div className="flex gap-2">
              <Button type="submit" isLoading={isSubmitting}>
                {editingProduct ? "Salvar alterações" : "Adicionar item"}
              </Button>
              {editingProduct ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setEditingProduct(null);
                    reset(productDefaults);
                  }}
                >
                  Cancelar
                </Button>
              ) : null}
            </div>
          </form>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-black text-slate-900">Seu catálogo</h2>

          {isLoading ? (
            <div className="mt-4">
              <LoadingState />
            </div>
          ) : products.length === 0 ? (
            <div className="mt-4">
              <EmptyState title="Nenhum produto cadastrado" description="Adicione seu primeiro item para começar a vender online." />
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {products.map((product) => (
                <article key={product.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{product.name}</h3>
                      <p className="text-xs uppercase tracking-wide text-slate-500">{product.category || "Sem categoria"}</p>
                    </div>
                    <strong className="text-sm text-slate-800">{formatCurrency(product.price)}</strong>
                  </div>
                  {product.description ? <p className="mt-2 text-sm text-slate-600">{product.description}</p> : null}
                  <div className="mt-3 flex gap-2">
                    <Button type="button" variant="ghost" onClick={() => onEdit(product)}>
                      Editar
                    </Button>
                    <Button type="button" variant="danger" onClick={() => void onDelete(product.id)}>
                      Excluir
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </article>
      </section>
    </DashboardLayout>
  );
}
