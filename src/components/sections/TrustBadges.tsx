"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, BadgeCheck, Receipt, Headphones } from "lucide-react";

const icons = [
  <MapPin key="1" className="h-5 w-5" />,
  <BadgeCheck key="2" className="h-5 w-5" />,
  <Receipt key="3" className="h-5 w-5" />,
  <Headphones key="4" className="h-5 w-5" />,
];

export function TrustBadges() {
  const t = useTranslations("trust");

  const badges = [
    { title: t("badge1"), desc: t("desc1") },
    { title: t("badge2"), desc: t("desc2") },
    { title: t("badge3"), desc: t("desc3") },
    { title: t("badge4"), desc: t("desc4") },
  ];

  return (
    <section className="border-y border-ink-800/50 bg-ink-950">
      <div className="container-mb">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-ink-800/50 lg:divide-x">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex items-start gap-4 px-6 py-8 sm:px-8 sm:py-10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-gold-500/5 text-gold-400 transition-all group-hover:bg-gold-500/15 group-hover:text-gold-300 border border-gold-500/15 group-hover:border-gold-500/30">
                {icons[i]}
              </span>
              <div>
                <h3 className="font-body text-sm font-semibold text-ink-50">
                  {badge.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">
                  {badge.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
