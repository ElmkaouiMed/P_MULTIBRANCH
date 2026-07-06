"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  gold?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = true,
  gold = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={cn("mb-14 max-w-2xl", centered && "mx-auto text-center")}
    >
      <h2
        className={cn(
          "heading-lg",
          gold && "text-gradient-gold",
          !gold && light && "text-ink-50",
          !gold && !light && "text-ink-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed max-w-lg",
            centered && "mx-auto",
            light ? "text-ink-400" : "text-ink-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
