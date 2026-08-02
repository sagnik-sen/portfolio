import { cn } from "@/lib/utils";

export function SectionDivider({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto flex max-w-6xl items-center gap-6 px-6 md:px-10", className)}>
      <div className="h-px flex-1 bg-line" />
      {label && (
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-tertiary">
          {label}
        </span>
      )}
      <div className="h-px flex-1 bg-line" />
    </div>
  );
}
