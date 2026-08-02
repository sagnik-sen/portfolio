"use client";

import { motion } from "framer-motion";

const INITIATIVES = [
  {
    name: "DevsHouse '25",
    note: "MLH-partnered hackathon",
    span: "md:col-span-7",
    size: "text-2xl md:text-3xl",
  },
  {
    name: "Google Solution Challenge 2025",
    note: "Global student build program",
    span: "md:col-span-5",
    size: "text-xl md:text-2xl",
  },
  {
    name: "GenAI Exchange Hackathon",
    note: "Applied GenAI build sprint",
    span: "md:col-span-5",
    size: "text-xl md:text-2xl",
  },
  {
    name: "Flutter Frames",
    note: "Mobile dev community event",
    span: "md:col-span-4",
    size: "text-lg",
  },
  {
    name: "Google Cloud Arcade 2025",
    note: "Cloud skills challenge",
    span: "md:col-span-3",
    size: "text-lg",
  },
];

export function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-6xl px-6 py-32 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 max-w-2xl"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-tertiary">
          Leadership
        </span>
        <h2 className="mt-4 text-3xl font-medium leading-tight text-primary md:text-4xl">
          As General Secretary of GDG on Campus VIT Chennai, I&apos;ve
          run operations behind programs reaching hundreds of students.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-12">
        {INITIATIVES.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className={`border-t border-line pt-5 ${item.span}`}
          >
            <h3 className={`font-medium leading-snug text-primary ${item.size}`}>
              {item.name}
            </h3>
            <p className="mt-2 font-mono text-[12px] text-tertiary">
              {item.note}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
