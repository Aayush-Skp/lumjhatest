import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlanForm from "@/components/admin/PlanForm";
import { LoadError, PageHeader } from "@/components/admin/ui";
import { listPlans } from "@/lib/admin/content";
import { requireAdmin } from "@/lib/admin/session";

export const metadata: Metadata = { title: "Edit plan" };

export default async function AdminPlanPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const { source, plans } = await listPlans();
  const plan = plans.find((p) => p.id === id);
  if (!plan) notFound();

  return (
    <div className="space-y-6">
      <PageHeader title={plan.name} />
      {source.kind === "site" && source.reason === "error" ? <LoadError /> : <PlanForm key={plan.id} plan={plan} />}
    </div>
  );
}
