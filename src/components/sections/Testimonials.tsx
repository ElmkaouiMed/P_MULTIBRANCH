"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Star, Quote, MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fetchTestimonials, fetchLocations } from "@/lib/sheets";
import type { Testimonial, Location } from "@/types";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([fetchTestimonials(), fetchLocations()]).then(
      ([test, locs]) => {
        setTestimonials(test);
        setLocations(locs);
      }
    );
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered =
    filterBranch === "all"
      ? testimonials
      : testimonials.filter((t) => t.branch === filterBranch);

  const selectedLoc = filterBranch === "all" ? null : locations.find((l) => l.slug === filterBranch);
  const filterLabel = selectedLoc
    ? isRtl ? selectedLoc.nameAr : selectedLoc.name
    : t("allBranches");

  return (
    <section className="section-padding bg-ink-900/20">
      <div className="container-mb" dir={isRtl ? "rtl" : "ltr"}>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div ref={dropdownRef} className="relative mb-10 flex justify-center">
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "inline-flex items-center gap-3 rounded-none px-5 py-3 text-sm shadow-lg transition-all min-w-[220px]",
              "bg-ink-800/70 border border-ink-700/40 hover:border-gold-500/30",
              selectedLoc ? "text-ink-50" : "text-ink-300"
            )}
          >
            {selectedLoc ? (
              <div className="h-8 w-8 shrink-0 overflow-hidden bg-ink-700 border border-ink-600/50">
                <img src={selectedLoc.image} alt="" className="h-full w-full object-cover" />
              </div>
            ) : (
              <MapPin className="h-4 w-4 shrink-0 text-gold-500" />
            )}
            <span className="flex-1 text-start">{filterLabel}</span>
            <ChevronDown className={cn("h-4 w-4 text-ink-500 transition-transform", open && "rotate-180")} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 w-72 overflow-hidden border border-ink-700 bg-ink-900 shadow-2xl shadow-ink-950/50 backdrop-blur-xl z-30"
              >
                <ul className="py-2 max-h-64 overflow-y-auto">
                  <li>
                    <button
                      onClick={() => { setFilterBranch("all"); setOpen(false); }}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-ink-800/50",
                        filterBranch === "all" && "bg-gold-500/5 text-gold-400"
                      )}
                    >
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span>{t("allBranches")}</span>
                    </button>
                  </li>
                  {locations.map((loc) => (
                    <li key={loc.slug}>
                      <button
                        onClick={() => { setFilterBranch(loc.slug); setOpen(false); }}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-ink-800/50",
                          filterBranch === loc.slug && "bg-gold-500/5"
                        )}
                      >
                        <div className="h-10 w-10 shrink-0 overflow-hidden bg-ink-700 border border-ink-600/50">
                          <img src={loc.image} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 text-start">
                          <p className="font-medium text-ink-50">{isRtl ? loc.nameAr : loc.name}</p>
                          <p className="text-xs text-ink-500">{isRtl ? loc.cityAr : loc.city}</p>
                        </div>
                        {filterBranch === loc.slug && (
                          <span className="text-[10px] font-medium text-gold-400">Selected</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-glow p-6"
            >
              <Quote className="h-8 w-8 text-gold-500/20 mb-3" />
              <div className="mb-4 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={cn(
                      "h-4 w-4",
                      s < testimonial.rating
                        ? "fill-gold-500 text-gold-500"
                        : "text-ink-700"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-ink-300">
                &ldquo;{locale === "ar" && testimonial.textAr ? testimonial.textAr : locale === "fr" && testimonial.textFr ? testimonial.textFr : testimonial.text}&rdquo;
              </p>
              <div className="mt-5 border-t border-ink-800/50 pt-4">
                <p className="text-sm font-medium text-ink-50">
                  {locale === "ar" && testimonial.nameAr ? testimonial.nameAr : locale === "fr" && testimonial.nameFr ? testimonial.nameFr : testimonial.name}
                </p>
                <p className="text-xs text-ink-500">{locale === "ar" && testimonial.titleAr ? testimonial.titleAr : locale === "fr" && testimonial.titleFr ? testimonial.titleFr : testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
