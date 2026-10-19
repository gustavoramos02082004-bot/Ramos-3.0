import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Frame({
  title,
  extra,
  children,
  className,
}: {
  title: string;
  extra?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("sys-frame relative", className)}>
      <Corner className="-top-px -left-px border-t-2 border-l-2" />
      <Corner className="-top-px -right-px border-t-2 border-r-2" />
      <Corner className="-bottom-px -left-px border-b-2 border-l-2" />
      <Corner className="-right-px -bottom-px border-r-2 border-b-2" />
      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <h2 className="font-display text-xs tracking-widest text-primary uppercase">{title}</h2>
        {extra}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

function Corner({ className }: { className: string }) {
  return <span className={cn("pointer-events-none absolute size-3 border-primary", className)} />;
}

export function Meter({
  label,
  value,
  max,
  tone = "primary",
}: {
  label: string;
  value: number;
  max: number;
  tone?: "primary" | "gold" | "danger";
}) {
  const pct = max <= 0 ? 0 : Math.max(0, Math.min(100, (value / max) * 100));
  const bar = tone === "gold" ? "bg-gold" : tone === "danger" ? "bg-danger" : "bg-primary";
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
        <span className="tracking-wide text-muted uppercase">{label}</span>
        <span className="tabular-nums text-fg">
          {value}
          <span className="text-muted">/{max}</span>
        </span>
      </div>
      <div className="h-2 bg-surface-2">
        <div className={cn("h-full transition-all", bar)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Btn({
  variant = "primary",
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "gold";
}) {
  const look = {
    primary: "bg-primary text-bg",
    gold: "bg-gold text-bg",
    danger: "bg-danger text-fg",
    ghost: "border border-line bg-transparent text-fg",
  }[variant];
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 px-4 text-base font-semibold tracking-wide disabled:cursor-not-allowed disabled:opacity-40",
        look,
        className,
      )}
      {...props}
    />
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm tracking-wide text-muted uppercase">{label}</span>
      {children}
    </label>
  );
}

export const fieldClass =
  "min-h-11 w-full border border-line bg-bg px-3 text-fg outline-none";

export function SystemDialog({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-bg/80" />
        <Dialog.Content className="sys-frame fixed inset-x-4 top-16 z-40 mx-auto max-h-[80vh] max-w-lg overflow-y-auto p-4">
          <Dialog.Title className="font-display text-lg tracking-wide text-primary">{title}</Dialog.Title>
          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
