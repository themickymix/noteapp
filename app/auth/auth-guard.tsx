"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (isAuthenticated() && pathname === "/register") {
        router.push("/"); // Redirect to dashboard if user is authenticated and tries to access register
      } else if (
        !isAuthenticated() &&
        pathname !== "/register" &&
        pathname !== "/login"
      ) {
        router.push("/register"); // Redirect to register page if user is not authenticated
      }
    }
  }, [mounted, router, pathname]);

  if (
    !mounted ||
    (!isAuthenticated() && pathname !== "/register" && pathname !== "/login")
  ) {
    return null;
  }

  return <>{children}</>;
}
