"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type NeuralFieldProps = {
  className?: string;
  density?: "full" | "compact";
};

// Deterministic pseudo-scatter so the graph looks organic but never
// shifts between server and client render.
function makeNodes(seed: number, count: number, w: number, h: number) {
  const nodes: { x: number; y: number; r: number }[] = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: rand() * w,
      y: rand() * h,
      r: 1.4 + rand() * 1.8,
    });
  }
  return nodes;
}

function makeEdges(nodes: { x: number; y: number }[], maxDist: number) {
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) edges.push([i, j]);
    }
  }
  return edges;
}

export function NeuralField({ className, density = "full" }: NeuralFieldProps) {
  const W = 1200;
  const H = 800;
  const count = density === "full" ? 22 : 10;
  const maxDist = density === "full" ? 220 : 260;

  const { nodes, edges } = useMemo(() => {
    const nodes = makeNodes(17, count, W, H);
    const edges = makeEdges(nodes, maxDist);
    return { nodes, edges };
  }, [count, maxDist]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nf-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="nf-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {edges.map(([a, b], i) => (
        <motion.line
          key={`e-${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#nf-line)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 1.8, delay: 0.4 + i * 0.015, ease: "easeOut" }}
        />
      ))}

      {nodes.map((n, i) => (
        <motion.circle
          key={`n-${i}`}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill="var(--text-primary)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.55, 0.35] }}
          transition={{
            duration: 3,
            delay: 0.2 + i * 0.05,
            ease: "easeOut",
          }}
        />
      ))}

      {nodes.slice(0, Math.ceil(nodes.length / 3)).map((n, i) => (
        <motion.circle
          key={`glow-${i}`}
          cx={n.x}
          cy={n.y}
          r={14}
          fill="url(#nf-node)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{
            duration: 5 + (i % 4),
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
