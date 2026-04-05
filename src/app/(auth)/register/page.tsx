"use client";

import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Pinyon_Script } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--logo-font",
});

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen bg-[#0a0a0a]">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-3/7 flex-col justify-end p-12 relative overflow-hidden">
        {/* Background image - B&W */}
        <img
          src="/assets/images/login.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/65 to-black/20" />

        <div className="relative z-10 space-y-6 flex ml-3 flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h1
              className={`${pinyonScript.className} ${pinyonScript.variable} text-[6rem] font-bold h-28`}
            >
              Lola
            </h1>
            <span className="text-[.9rem] tracking-[.2em] font-thin">
              CENTRO DE ESTÉTICA
            </span>
          </div>
          <p className="text-sm text-muted leading-relaxed max-w-xs">
            Refining the digital experience through intentional minimalism.
            Welcome to the atelier.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-4/7 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <RegisterForm />

          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] tracking-[0.2em] text-muted uppercase">
              O continua con
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-white/10 py-3 text-xs tracking-[0.1em] text-white hover:bg-white/5 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-white/10 py-3 text-xs tracking-[0.1em] text-white hover:bg-white/5 transition-colors"
            >
              <Image
                src="/assets/icons/facebook.svg"
                alt="Facebook"
                width={15}
                height={15}
              />
              Facebook
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-muted">
            Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="text-white underline underline-offset-4 hover:text-muted transition-colors"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
