import { cn } from "cn";

export function InfoPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-full bg-accent px-2.5 text-xs font-semibold tracking-wide text-accent-foreground uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
