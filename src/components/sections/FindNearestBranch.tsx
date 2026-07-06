"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fetchLocations } from "@/lib/sheets";
import { useBranchContext } from "@/context/BranchContext";
import type { Location } from "@/types";

export function FindNearestBranch() {
  const t = useTranslations("findNearest");
  const lo = useTranslations("locations");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { setSelectedBranch } = useBranchContext();
  const [branches, setBranches] = useState<Location[]>([]);
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  useEffect(() => {
    fetchLocations().then(setBranches);
  }, []);

  const center =
    branches.length > 0
      ? `${
          branches.reduce((s, b) => s + b.lat, 0) / branches.length
        },${branches.reduce((s, b) => s + b.lng, 0) / branches.length}`
      : "25.2048,55.2708";

  return (
    <section className="section-padding bg-ink-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute inset-0 grain-overlay opacity-30" />
      <div className="container-mb relative z-10" dir={isRtl ? "rtl" : "ltr"}>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} gold />

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            {branches.map((branch, i) => (
              <motion.button
                key={branch.slug}
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => {
                  setActiveBranch(branch.slug);
                  setSelectedBranch(branch);
                }}
                className={cn(
                  "w-full rounded-none border p-5 text-start transition-all duration-300",
                  activeBranch === branch.slug
                    ? "border-gold-500/40 bg-gold-500/5 shadow-lg shadow-gold-500/5"
                    : "border-ink-800/60 bg-ink-900/50 hover:border-ink-700/60"
                )}
              >
                <h3
                  className={cn(
                    "font-display text-base",
                    activeBranch === branch.slug
                      ? "text-gold-400"
                      : "text-ink-50"
                  )}
                >
                  {isRtl ? branch.nameAr : branch.name}
                </h3>
                <p className="mt-1 text-xs text-ink-500">
                  {isRtl ? branch.cityAr : branch.city}
                </p>
                <div className="mt-3 space-y-1.5">
                  <p className="flex items-center gap-2 text-xs text-ink-400">
                    <MapPin className="h-3 w-3 shrink-0 text-gold-500/60" />
                    {isRtl ? branch.addressAr : branch.address}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-ink-400">
                    <Clock className="h-3 w-3 shrink-0 text-gold-500/60" />
                    {isRtl ? branch.hoursAr : branch.hours}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="overflow-hidden rounded-none border border-ink-800/50 lg:col-span-3">
            <div className="aspect-[4/3] w-full">
              <iframe
                title="Branches Map"
                width="100%"
                height="100%"
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${center}&center=${center}&zoom=10`}
                className="border-0 grayscale invert-[.85] hue-rotate-180"
                allowFullScreen
              />
            </div>

            <div className="bg-ink-900/90 backdrop-blur-sm border-t border-ink-800/50 p-5">
              {activeBranch ? (
                (() => {
                  const branch = branches.find(
                    (b) => b.slug === activeBranch
                  );
                  if (!branch) return null;
                  return (
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-ink-50">
                          {isRtl ? branch.nameAr : branch.name}
                        </p>
                        <p className="text-xs text-ink-400">
                          {isRtl ? branch.addressAr : branch.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${branch.phone}`}
                          className="btn-secondary px-4 py-2 text-xs gap-1.5"
                        >
                          <Phone className="h-3 w-3" />
                          {lo("callNow")}
                        </a>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary px-4 py-2 text-xs gap-1.5"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {lo("getDirections")}
                        </a>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <p className="text-center text-sm text-ink-500">
                  {t("selectOnMap")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
