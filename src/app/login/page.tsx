import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login — cmdblock.tech",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-12">
          <h1 className="font-sans text-4xl sm:text-5xl font-800 tracking-tight leading-[0.9] mb-4">
            <span className="text-muted-foreground font-mono text-2xl sm:text-3xl font-normal">
              &gt;_{" "}
            </span>
            login
          </h1>
          <p className="text-sm text-muted-foreground mt-4">
            Authenticate to access the dashboard.
          </p>
        </div>

        <LoginForm />

        <p className="text-xs text-muted-foreground mt-8 text-center">
          cmdblock.tech — internal access only
        </p>
      </div>
    </div>
  );
}
