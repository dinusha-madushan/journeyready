import type { CSSProperties, ReactNode } from "react";

export function Card({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section className={`glass ${className}`} style={style}>
      {children}
    </section>
  );
}

export function Ring({
  pct,
  value,
  label,
}: {
  pct: number;
  value: string | number;
  label: string;
}) {
  const p = Math.min(100, Math.max(0, pct));
  return (
    <div className="text-center text-sm">
      <div className="ring" style={{ "--p": p } as CSSProperties}>
        <b>{value}</b>
      </div>
      <span className="mt-1 block">{label}</span>
    </div>
  );
}

export function Bar({ pct }: { pct: number }) {
  const safePct = Math.min(100, Math.max(0, pct));
  return (
    <div
      className="bar"
      role="progressbar"
      aria-valuenow={Math.round(safePct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <i style={{ width: `${safePct}%` }} />
    </div>
  );
}
