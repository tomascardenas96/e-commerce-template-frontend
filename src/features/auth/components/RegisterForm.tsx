"use client";

import { useRegisterForm } from "../hooks/useRegisterForm";
import { Input } from "../ui/Input";

export const RegisterForm = () => {
  const { form, onSubmit, isLoading, serverError } = useRegisterForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <h1 className={`text-[2rem] font-bold mb-6`}>Crear Cuenta</h1>

      <div className="flex gap-3">
        <Input
          label="Nombre"
          placeholder="Juan"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Apellido"
          placeholder="Pérez"
          error={errors.lastname?.message}
          {...register("lastname")}
        />
      </div>

      <Input
        label="Correo Electrónico"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        label="Confirmar Contraseña"
        type="password"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {serverError && (
        <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-white text-black text-xs tracking-[0.2em] font-medium uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
      </button>
    </form>
  );
};
