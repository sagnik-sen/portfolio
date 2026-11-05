import type { ReactNode } from "react";

// Case-study diagrams, drawn on a 360-wide grid so the text stays readable on a phone.
// Columns: full = 8..352, halves = 8 / 186 (w 166), thirds = 8 / 126 / 244 (w 108).

type Tone = "plain" | "main" | "planned";

function Box({ x, y, w, h, title, lines = [], tone = "plain" }: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  tone?: Tone;
}) {
  const cx = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        className={tone === "main" ? "fill-accent/10 stroke-accent" : tone === "planned" ? "fill-none stroke-line-strong" : "fill-elevated stroke-line-strong"}
        strokeDasharray={tone === "planned" ? "5 4" : undefined}
      />
      <text x={cx} y={y + 22} textAnchor="middle" className="fill-primary text-[14px] font-semibold">
        {title}
      </text>
      {lines.map((l, i) => (
        <text key={l} x={cx} y={y + 40 + i * 16} textAnchor="middle" className="fill-secondary text-[12px]">
          {l}
        </text>
      ))}
    </g>
  );
}

const Arrow = ({ x, y1, y2 }: { x: number; y1: number; y2: number }) => (
  <path d={`M${x} ${y1}V${y2}`} className="fill-none stroke-secondary" markerEnd="url(#arrow)" />
);

function Svg({ h, label, children }: { h: number; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 360 ${h}`} role="img" aria-label={label} className="mx-auto h-auto w-full max-w-md">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0L10 5L0 10z" className="fill-secondary" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

const UrbanPulse = () => (
  <Svg h={320} label="Sensors, citizen reports and rain feed a Node server that ticks every 2 seconds and pushes to staff, citizens and the Shardeum testnet">
    <Box x={8} y={8} w={108} h={64} title="Sensors" lines={["water level", "simulated"]} />
    <Box x={126} y={8} w={108} h={64} title="Reports" lines={["from citizens", "trust-weighted"]} />
    <Box x={244} y={8} w={108} h={64} title="Rain" lines={["Open-Meteo", "every 10 min"]} />
    {[62, 180, 298].map((x) => <Arrow key={x} x={x} y1={72} y2={94} />)}
    <Box
      x={8}
      y={96}
      w={344}
      h={124}
      tone="main"
      title="Node server, tick every 2 s"
      lines={["forecast water level per zone", "fuse sensors with reports", "incident after 2 danger ticks", "shelter plans: min-cost max-flow", "on real OSRM road routes"]}
    />
    {[62, 180, 298].map((x) => <Arrow key={x} x={x} y1={220} y2={246} />)}
    <Box x={8} y={248} w={108} h={64} title="Staff" lines={["command center", "live incidents"]} />
    <Box x={126} y={248} w={108} h={64} title="Citizens" lines={["Tamil, English", "offline snapshot"]} />
    <Box x={244} y={248} w={108} h={64} title="Shardeum" lines={["Merkle roots", "every 5 min"]} />
  </Svg>
);

const Atlas = () => (
  <Svg h={408} label="Zod source, git history and a workload feed three harnesses that produce static facts, id scores and runtime calls; queries run over the facts">
    <Box x={8} y={8} w={108} h={64} title="Zod source" lines={["132 files", "one commit"]} />
    <Box x={126} y={8} w={108} h={64} title="Git history" lines={["389 commits"]} />
    <Box x={244} y={8} w={108} h={64} title="Workload" lines={["12 runs"]} />
    {[62, 180, 298].map((x) => <Arrow key={x} x={x} y1={72} y2={94} />)}
    <Box x={8} y={96} w={108} h={64} title="extract.ts" lines={["ts-morph +", "type checker"]} />
    <Box x={126} y={96} w={108} h={64} title="history.ts" lines={["reruns extract", "per commit"]} />
    <Box x={244} y={96} w={108} h={64} title="trace.ts" lines={["V8 sampling", "profiler"]} />
    {[62, 180, 298].map((x) => <Arrow key={x} x={x} y1={160} y2={182} />)}
    <Box x={8} y={184} w={108} h={64} tone="main" title="Static facts" lines={["9 kinds, ~34k", "with confidence"]} />
    <Box x={126} y={184} w={108} h={64} title="Id stability" lines={["schemes scored", "on 297 pairs"]} />
    <Box x={244} y={184} w={108} h={64} title="Runtime calls" lines={["548 edges", "34.4% match ids"]} />
    <Arrow x={62} y1={248} y2={270} />
    <Box x={8} y={272} w={344} h={56} title="Query scripts" lines={["callers, blast radius, unused imports"]} />
    <Box x={8} y={344} w={344} h={56} tone="planned" title="Lenses + query engine" lines={["designed, not built yet"]} />
  </Svg>
);

const Chip = ({ x, y, w, label }: { x: number; y: number; w: number; label: string }) => (
  <g>
    <rect x={x} y={y} width={w} height={28} rx={14} className="fill-elevated stroke-line-strong" />
    <text x={x + w / 2} y={y + 18} textAnchor="middle" className="fill-primary text-[12px]">
      {label}
    </text>
  </g>
);

const OpenEscrow = () => (
  <Svg h={404} label="The buyer's browser signs through MetaMask; the escrow contract moves from awaiting payment to funded to completed, or to a frozen dispute, and pays the seller">
    <Box x={8} y={8} w={344} h={64} title="Buyer's browser" lines={["React + ethers v6, signs with MetaMask", "re-reads state every 5 s (no events)"]} />
    <Arrow x={180} y1={72} y2={94} />
    <Box x={8} y={96} w={344} h={140} tone="main" title="Escrow contract, Shardeum testnet" />
    <Chip x={24} y={136} w={112} label="Awaiting payment" />
    <path d="M136 150H152" className="fill-none stroke-secondary" markerEnd="url(#arrow)" />
    <Chip x={154} y={136} w={72} label="Funded" />
    <path d="M226 150H242" className="fill-none stroke-secondary" markerEnd="url(#arrow)" />
    <Chip x={244} y={136} w={92} label="Completed" />
    <text x={144} y={180} textAnchor="middle" className="fill-secondary text-[11px]">
      fund
    </text>
    <text x={290} y={180} textAnchor="middle" className="fill-secondary text-[11px]">
      release ×2
    </text>
    <Arrow x={190} y1={164} y2={192} />
    <text x={198} y={184} className="fill-secondary text-[11px]">
      dispute
    </text>
    <Chip x={134} y={194} w={112} label="Disputed, frozen" />
    <Arrow x={180} y1={236} y2={258} />
    <Box x={8} y={260} w={344} h={56} title="Seller's wallet" lines={["paid by call() on each release"]} />
    <Box x={8} y={340} w={166} h={56} title="Read API" lines={["Express, unused by the app"]} />
    <Box x={186} y={340} w={166} h={56} tone="planned" title="Inco privacy" lines={["planned, not built"]} />
  </Svg>
);

export const DIAGRAMS: Record<string, () => ReactNode> = {
  "urbanpulse-chennai": UrbanPulse,
  atlas: Atlas,
  openescrow: OpenEscrow,
};
