"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Search, MapPin, ChevronDown, Car, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBranchContext } from "@/context/BranchContext";
import { Link } from "@/routing";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { branches, setSelectedBranch, selectedBranch } = useBranchContext();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filtered = branches.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.nameAr.includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.cityAr.includes(q)
    );
  });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (slug: string) => {
    const branch = branches.find((b) => b.slug === slug) ?? null;
    setSelectedBranch(branch);
    setOpen(false);
    setSearch("");
  };

  const stats = [
    { value: "10K+", label: "RENTALS" },
    { value: "4.9", label: "RATING" },
    { value: "5min", label: "PICKUP" },
    { value: "100%", label: "SATISFACTION" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y: heroY }}>
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=85"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(235,110,74,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 grain-overlay" />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <motion.div
        className="container-mb relative z-10 w-full pt-24"
        style={{ opacity: heroOpacity }}
      >
        <div className="md:max-w-3xl" dir={isRtl ? "rtl" : "ltr"}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 btn-ghost text-[11px] tracking-wider text-gold-400/80 uppercase border border-gold-500/20 bg-gold-500/8"
          >
            <span className="h-1.5 w-1.5 rounded-none bg-gold-500 animate-pulse" />
            {t("badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="heading-xl font-bold mt-8 text-ink-50!"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-5 text-lg leading-relaxed text-ink-400 md:max-w-xl"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-10"
          >
            <div ref={dropdownRef} className="relative md:max-w-lg">
              <button
                onClick={() => setOpen(!open)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-none px-6 py-5 text-start shadow-2xl transition-all",
                  "bg-ink-900/70 backdrop-blur-xl border border-ink-700/50 hover:border-gold-500/30",
                  selectedBranch ? "text-ink-50" : "text-ink-400"
                )}
                aria-haspopup="listbox"
                aria-expanded={open}
              >
                <MapPin className="h-5 w-5 shrink-0 text-gold-500" />
                <span className="flex-1 font-body text-base">
                  {selectedBranch
                    ? isRtl
                      ? selectedBranch.nameAr
                      : selectedBranch.name
                    : t("selectBranch")}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-ink-500 transition-transform",
                    open && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full mb-3 w-full overflow-hidden rounded-none border border-ink-700 bg-ink-900 shadow-2xl shadow-ink-950/50 backdrop-blur-xl"
                  >
                    <div className="border-b border-ink-800 p-4">
                      <div className="flex items-center gap-3 rounded-none bg-ink-950 px-4 py-2.5">
                        <Search className="h-4 w-4 text-ink-500" />
                        <input
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder={t("searchPlaceholder")}
                          className="flex-1 bg-transparent text-sm text-ink-100 outline-none placeholder:text-ink-500"
                          autoFocus
                          aria-label="Search branches"
                        />
                      </div>
                    </div>

                    <ul className="max-h-64 overflow-y-auto py-2" role="listbox">
                      {filtered.length === 0 ? (
                        <li className="px-5 py-8 text-center text-sm text-ink-500">
                          No branches found
                        </li>
                      ) : (
                        filtered.map((branch) => (
                          <li key={branch.slug} role="option">
                            <button
                              onClick={() => handleSelect(branch.slug)}
                              className={cn(
                                "flex w-full items-center gap-4 px-5 py-3.5 text-start transition-all hover:bg-ink-800/50",
                                selectedBranch?.slug === branch.slug && "bg-gold-500/5"
                              )}
                            >
                              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-none bg-ink-800">
                                <img
                                  src={branch.image}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-ink-50 truncate">
                                  {isRtl ? branch.nameAr : branch.name}
                                </p>
                                <p className="text-xs text-ink-500 truncate">
                                  {isRtl ? branch.cityAr : branch.city}
                                </p>
                              </div>
                              {selectedBranch?.slug === branch.slug && (
                                <span className="text-xs font-medium text-gold-400">
                                  Selected
                                </span>
                              )}
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/cars"
                  className="btn-primary px-7 py-3.5 text-sm gap-2.5 shadow-xl shadow-gold-500/20"
              >
                <Car className="h-4 w-4" />
                {t("cta")}
                <ArrowRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-1", isRtl && "rotate-180")} />
              </Link>
              <Link
                href="/locations/downtown-dubai"
                className="btn-ghost px-7 py-3.5 text-sm gap-2.5 border border-ink-600/40 text-ink-200 backdrop-blur-sm"
              >
                <MapPin className="h-4 w-4" />
                {t("browseAll")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-16 flex flex-wrap gap-x-10 gap-y-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2.5">
                <span className="font-display text-2xl font-bold text-gold-400">
                  {stat.value}
                </span>
                <span className="text-[11px] text-ink-500 tracking-[0.15em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.5 }}
        className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-ink-950 to-transparent"
      />
    </section>
  );
}
