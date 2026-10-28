import type { Metadata } from "next";
import Link from "next/link";
import ImportButton from "@/components/admin/ImportButton";
import { PageHeader } from "@/components/admin/ui";
import { listPlans } from "@/lib/admin/content";
import { requireAdmin } from "@/lib/admin/session";
import { supabaseConfigured } from "@/lib/admin/supabase";

export const metadata: Metadata = { title: "Pricing" };

export default async function AdminPricingPage() {
  await requireAdmin();
  const { source, plans } = await listPlans();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pricing"
        description="The plan cards on the Pricing page: prices, conversation allowances, features and buttons."
        actions={supabaseConfigured() && source.kind !== "database" ? <ImportButton kind="pricing" variant="secondary" /> : undefined}
      />

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => (
          <li key={p.id}>
            <Link
              href={`/admin/pricing/${p.id}`}
              className={`flex h-full flex-col rounded-xl border bg-surface p-5 transition hover:border-[#527DFF]/60 ${p.featured ? "border-[#527DFF]/60" : "border-line"}`}
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-[17px] font-semibold text-ink">{p.name}</h2>
                {p.featured && <span className="rounded-full bg-[#527DFF]/15 px-2 py-0.5 text-[11px] font-semibold text-[#527DFF]">Most popular</span>}
              </div>
              <p className="mt-0.5 text-[13px] text-muted">{p.audience}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                <div>
                  <dt className="text-subtle">Monthly</dt>
                  <dd className="text-[18px] font-semibold text-ink">{p.price.monthly}</dd>
                </div>
                <div>
                  <dt className="text-subtle">Annual / mo</dt>
                  <dd className="text-[18px] font-semibold text-ink">{p.price.annual}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-subtle">Conversations / month</dt>
                  <dd className="font-medium text-ink">{p.allowance}</dd>
                </div>
              </dl>
              <p className="mt-4 text-[13px] text-muted">{p.features.length} features</p>
              <p className="mt-auto pt-4 text-[13px] font-semibold text-[#527DFF]">Edit plan →</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
