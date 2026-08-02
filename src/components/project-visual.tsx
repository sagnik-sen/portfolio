"use client";

import { motion } from "framer-motion";

export function ProjectVisual({ variant }: { variant: 1 | 2 | 3 }) {
  if (variant === 1) {
    // Classification / routing — layered horizontal bands sorting into lanes
    return (
      <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="pv1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <rect width="400" height="320" fill="var(--bg-surface)" />
        {[40, 90, 140, 190, 240, 290].map((y, i) => (
          <motion.line
            key={y}
            x1={30}
            y1={y}
            x2={370}
            y2={y}
            stroke={i % 2 === 0 ? "url(#pv1)" : "var(--line-strong)"}
            strokeWidth={i % 2 === 0 ? 2 : 1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.08 }}
          />
        ))}
        {[70, 165, 260].map((y, i) => (
          <motion.circle
            key={y}
            cx={340}
            cy={y}
            r={4}
            fill="var(--accent-blue)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
          />
        ))}
      </svg>
    );
  }

  if (variant === 2) {
    // Narration / audio — concentric waveform rings
    return (
      <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden="true">
        <rect width="400" height="320" fill="var(--bg-surface)" />
        <g transform="translate(200,160)">
          {[24, 48, 74, 102, 132].map((r, i) => (
            <motion.circle
              key={r}
              r={r}
              fill="none"
              stroke={i % 2 === 0 ? "var(--accent-violet)" : "var(--line-strong)"}
              strokeOpacity={i % 2 === 0 ? 0.5 : 1}
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            />
          ))}
          <motion.circle
            r={6}
            fill="var(--accent-blue)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0.4, 1, 0.4] }}
            viewport={{ once: true }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </svg>
    );
  }

  // Retrieval / coaching — nodes converging into an answer
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" aria-hidden="true">
      <rect width="400" height="320" fill="var(--bg-surface)" />
      {[
        [70, 70],
        [70, 160],
        [70, 250],
        [140, 110],
        [140, 210],
      ].map(([x, y], i) => (
        <g key={i}>
          <motion.line
            x1={x}
            y1={y}
            x2={300}
            y2={160}
            stroke="url(#pv3grad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.1 }}
          />
          <circle cx={x} cy={y} r={3} fill="var(--text-tertiary)" />
        </g>
      ))}
      <defs>
        <linearGradient id="pv3grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <motion.circle
        cx={300}
        cy={160}
        r={10}
        fill="var(--accent-violet)"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
    </svg>
  );
}
