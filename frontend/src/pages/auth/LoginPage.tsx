import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useAuth } from "../../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(6, "Senha mínima de 6 caracteres")
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      await login(data);
      navigate("/app");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Entrar | P/W Digital</title>
      </Helmet>

      <AuthLayout title="Entre na sua conta" subtitle="Acesse sua área de gestão e atualize sua vitrine em minutos.">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" placeholder="você@empresa.com" error={errors.email?.message} {...register("email")} />
          <Input label="Senha" type="password" placeholder="Sua senha" error={errors.password?.message} {...register("password")} />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Entrar
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="font-semibold text-teal-700 hover:underline">
            Criar conta
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
