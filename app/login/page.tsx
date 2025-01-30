"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "../auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center flex-col bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <LoginForm />
      </div>
      <div className="mt-4 text-center text-sm">
        <span>Don&apos;t have an account? </span>
        <Link href="/register" className="text-blue-500 font-semibold">
          Register
        </Link>
      </div>
    </div>
  );
}
