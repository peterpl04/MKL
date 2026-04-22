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

const registerSchema = z
  .object({
    name: z.string().min(2, "Informe seu nome"),
    email: z.string().email("Informe um e-mail válido"),
    password: z.string().min(6, "Senha mínima de 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha")
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não conferem"
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password
      });
      navigate("/app/empresa");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Criar Conta | P/W Digital</title>
      </Helmet>

      <AuthLayout title="Crie sua Vitrine" subtitle="Comece gratuitamente e publique sua página profissional hoje.">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Nome" type="text" placeholder="Seu nome" error={errors.name?.message} {...register("name")} />
          <Input label="Email" type="email" placeholder="você@empresa.com" error={errors.email?.message} {...register("email")} />
          <Input label="Senha" type="password" placeholder="Crie uma senha" error={errors.password?.message} {...register("password")} />
          <Input
            label="Confirmar senha"
            type="password"
            placeholder="Repita sua senha"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Criar conta
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Já possui conta?{" "}
          <Link to="/login" className="font-semibold text-teal-700 hover:underline">
            Fazer login
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
