"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { savePlanAction, type ActionState } from "@/app/admin/actions";
import type { PlanRecord } from "@/lib/admin/content";
import type { Feature } from "@/lib/content/pricing";
import { Card, Field, Message, inputCls, primaryBtn, secondaryBtn } from "./ui";

/** Edit one pricing plan. */
export default function PlanForm({ plan }: { plan: PlanRecord }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(savePlanAction, null);
  const [features, setFeatures] = useState<Feature[]>(plan.features);

  const update = (i: number, patch: Partial<Feature>) => setFeatures((f) => f.map((x, k) => (k === i ? { ...x, ...patch } : x)));
  const move = (i: number, by: number) =>
    setFeatures((f) => {
      const next = [...f];
      const j = i + by;
      if (j < 0 || j >= next.length) return f;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="id" value={plan.id} />
      <input type="hidden" name="features" value={JSON.stringify(features)} />

      <fieldset disabled={pending} className="space-y-5">
        <Card>
          <h2 className="text-[15px] font-semibold text-ink">Plan</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input name="name" defaultValue={plan.name} required className={inputCls} />
            </Field>
            <Field label="Audience" hint="Short line under the name.">
              <input name="audience" defaultValue={plan.audience} className={inputCls} />
            </Field>
            <Field label="Card order" hint="Lower numbers come first.">
              <input name="position" type="number" min={0} defaultValue={plan.position} className={inputCls} />
            </Field>
            <label className="flex items-center gap-2 self-end pb-2 text-[14px] text-ink">
              <input name="featured" type="checkbox" defaultChecked={plan.featured} className="h-4 w-4 accent-[#527DFF]" />
              Highlight as “Most popular”
            </label>
          </div>
        </Card>

        <Card>
          <h2 className="text-[15px] font-semibold text-ink">Price</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Monthly price" hint="Shown as written, e.g. $119">
              <input name="priceMonthly" defaultValue={plan.price.monthly} required className={inputCls} />
            </Field>
            <Field label="Annual price (per month)" hint="e.g. $99">
              <input name="priceAnnual" defaultValue={plan.price.annual} required className={inputCls} />
            </Field>
            <Field label="Line under monthly price">
              <input name="detailMonthly" defaultValue={plan.detail.monthly} className={inputCls} />
            </Field>
            <Field label="Line under annual price">
              <input name="detailAnnual" defaultValue={plan.detail.annual} className={inputCls} />
            </Field>
            <Field label="AI conversations / month">
              <input name="allowance" defaultValue={plan.allowance} className={inputCls} />
            </Field>
            <Field label="Conversations note" hint="Optional, e.g. ~$0.05 each">
              <input name="allowanceNote" defaultValue={plan.allowanceNote ?? ""} className={inputCls} />
            </Field>
          </div>
        </Card>

        <Card>
          <h2 className="text-[15px] font-semibold text-ink">Button</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Button text">
              <input name="cta" defaultValue={plan.cta} className={inputCls} />
            </Field>
            <Field label="Button link" hint="Leave empty to open the app sign-in.">
              <input name="href" defaultValue={plan.href ?? ""} placeholder="https://app.lumjha.ai/login" className={inputCls} />
            </Field>
          </div>
        </Card>

        <Card>
          <h2 className="text-[15px] font-semibold text-ink">Features</h2>
          <div className="mt-4 space-y-4">
            <Field label="Line above the list" hint="Optional, e.g. Everything in Starter, plus">
              <input name="includes" defaultValue={plan.includes ?? ""} className={inputCls} />
            </Field>
            <ul className="space-y-2">
              {features.map((f, i) => (
                <li key={i} className="flex flex-wrap items-center gap-2 rounded-lg border border-line p-2 sm:flex-nowrap">
                  <input
                    value={f.text}
                    onChange={(e) => update(i, { text: e.target.value })}
                    aria-label={`Feature ${i + 1}`}
                    className={`${inputCls} min-w-0 flex-1`}
                  />
                  <label className="flex shrink-0 items-center gap-1.5 text-[12px] text-muted">
                    <input type="checkbox" checked={Boolean(f.strong)} onChange={(e) => update(i, { strong: e.target.checked })} className="accent-[#527DFF]" />
                    Bold
                  </label>
                  <label className="flex shrink-0 items-center gap-1.5 text-[12px] text-muted">
                    <input type="checkbox" checked={Boolean(f.exclusive)} onChange={(e) => update(i, { exclusive: e.target.checked })} className="accent-[#527DFF]" />
                    Only on Lumjha
                  </label>
                  <span className="flex shrink-0 gap-1">
                    <IconButton label="Move up" onClick={() => move(i, -1)} d="m6 15 6-6 6 6" />
                    <IconButton label="Move down" onClick={() => move(i, 1)} d="m6 9 6 6 6-6" />
                    <IconButton label="Remove" onClick={() => setFeatures((x) => x.filter((_, k) => k !== i))} d="M6 6l12 12M18 6 6 18" />
                  </span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => setFeatures((f) => [...f, { text: "" }])} className={secondaryBtn}>
              + Add feature
            </button>
          </div>
        </Card>

        <Card>
          <Field label="Note at the bottom of the card" hint="e.g. top-up packs">
            <input name="note" defaultValue={plan.note} className={inputCls} />
          </Field>
        </Card>
      </fieldset>

      <div className="sticky bottom-0 -mx-1 flex flex-wrap items-center gap-3 border-t border-line bg-page-deep/90 px-1 py-3 backdrop-blur">
        <button type="submit" disabled={pending} className={primaryBtn}>
          {pending ? "Saving…" : "Save plan"}
        </button>
        <Link href="/admin/pricing" className={secondaryBtn}>
          Back to plans
        </Link>
        <Message state={state} />
      </div>
    </form>
  );
}

function IconButton({ label, onClick, d }: { label: string; onClick: () => void; d: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-md text-subtle transition hover:bg-ink/[0.06] hover:text-ink"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={d} />
      </svg>
    </button>
  );
}
