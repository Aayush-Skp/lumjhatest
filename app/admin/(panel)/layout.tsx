import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "@/app/admin/actions";
import AdminNav from "@/components/admin/AdminNav";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { requireAdmin } from "@/lib/admin/session";

/** Signed-in admin frame: sidebar on desktop, top bar on mobile. Each page and action checks the session too. */
export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const session = await requireAdmin();
  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="sticky top-0 z-20 flex flex-col gap-4 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur lg:h-screen lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
        <div className="flex items-center justify-between gap-3 lg:px-2">
          <Link href="/admin/pricing" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="" width={69} height={96} className="h-8 w-auto" />
            <span className="font-heading text-[16px] font-semibold text-ink">Lumjha</span>
            <span className="rounded-md bg-[#527DFF]/15 px-1.5 py-0.5 text-[11px] font-semibold text-[#527DFF]">Admin</span>
          </Link>
          <ThemeToggle className="lg:hidden" />
        </div>
        <AdminNav />
        <div className="mt-auto hidden space-y-3 border-t border-line pt-4 lg:block">
          <div className="flex items-center justify-between px-2">
            <span className="text-[12px] text-subtle">Theme</span>
            <ThemeToggle />
          </div>
          <Link href="/" target="_blank" className="block rounded-lg px-2 py-1.5 text-[13px] text-muted hover:text-ink">
            View site ↗
          </Link>
          <div className="flex items-center justify-between gap-2 px-2">
            <span className="truncate text-[13px] text-muted">
              Signed in as <span className="font-medium text-ink">{session.user}</span>
            </span>
            <form action={logout}>
              <button type="submit" className="text-[13px] font-semibold text-[#527DFF] hover:underline">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <main className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-8">{children}</main>
        <form action={logout} className="px-4 pb-8 text-center lg:hidden">
          <button type="submit" className="text-[13px] font-semibold text-[#527DFF] hover:underline">
            Sign out ({session.user})
          </button>
        </form>
      </div>
    </div>
  );
}
