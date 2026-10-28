import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { adminConfigured, getSession } from "@/lib/admin/session";

export const metadata: Metadata = { title: "Sign in" };

export default async function AdminLoginPage() {
  if (await getSession()) redirect("/admin/pricing");
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-[380px]">
        <div className="flex flex-col items-center text-center">
          <Image src="/logo.png" alt="" width={69} height={96} className="h-12 w-auto" priority />
          <h1 className="mt-4 font-heading text-[22px] font-semibold tracking-tight text-ink">Lumjha Admin</h1>
          <p className="mt-1 text-[14px] text-muted">Sign in to manage pricing and blogs.</p>
        </div>
        <div className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-[0_24px_70px_-30px_rgba(82,125,255,0.35)]">
          {adminConfigured() ? (
            <LoginForm />
          ) : (
            <p className="text-[14px] text-muted">
              Admin sign-in isn’t set up yet. Add <code className="text-ink">ADMIN_USERNAME</code>,{" "}
              <code className="text-ink">ADMIN_PASSWORD</code> and <code className="text-ink">ADMIN_SESSION_SECRET</code> to the
              environment, then restart the server.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
