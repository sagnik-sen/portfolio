export function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-14 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-12 md:gap-8 md:px-10 md:py-28">
        <h2 className="font-mono text-[13px] text-tertiary md:col-span-3">{label}</h2>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}
