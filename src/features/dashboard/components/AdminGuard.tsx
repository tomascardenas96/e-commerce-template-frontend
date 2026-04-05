"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { authService } from "@/features/auth/services/authService";
import { logger } from "@/lib/logger";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export const AdminGuard = ({ children }: { children: ReactNode }) => {
  const isChecking = useAuthStore((state) => state.isChecking);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setChecking = useAuthStore((state) => state.setChecking);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    setIsMounted(true);

    if (initialized.current) return;
    initialized.current = true;

    const syncSession = async () => {
      logger.info("ADMIN_GUARD", "Sincronizando sesión de administrador...");
      try {
        await authService.getMe();
      } catch {
        logger.error("ADMIN_GUARD", "Error al sincronizar sesión");
        clearAuth();
      } finally {
        setChecking(false);
      }
    };

    syncSession();
  }, [clearAuth, setChecking]);

  useEffect(() => {
    if (!isChecking && !isAuthenticated) {
      logger.info("ADMIN_GUARD", "Usuario no autenticado. Redirigiendo a /login");
      router.replace("/login");
    }
  }, [isChecking, isAuthenticated, router]);

  if (isChecking) return <LoadingSpinner label="Verificando acceso..." />;
  if (!isMounted) return null;
  if (!isAuthenticated) return <LoadingSpinner label="Redirigiendo..." />;

  return <>{children}</>;
};
