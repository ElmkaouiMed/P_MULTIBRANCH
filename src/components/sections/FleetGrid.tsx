"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { CarCard } from "@/components/ui/CarCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fetchCars, fetchLocations } from "@/lib/sheets";
import { useBranchContext } from "@/context/BranchContext";
import { getCarsByBranch } from "@/lib/branch-utils";
import { Link } from "@/routing";
import type { Car, CarCategory, Location } from "@/types";
import {
  Car as CarIcon,
  Zap,
  Compass,
  Bus,
  Gem,
  MapPin,
  ChevronDown,
} from "lucide-react";

interface FleetGridProps {
  branchSlug?: string;
  showHeading?: boolean;
  limit?: number;
}

const categories: { key: CarCategory; icon: typeof CarIcon }[] = [
  { key: "economy", icon: Zap },
  { key: "sedan", icon: CarIcon },
  { key: "suv", icon: Compass },
  { key: "van", icon: Bus },
  { key: "luxury", icon: Gem },
];

export function FleetGrid({
  branchSlug,
  showHeading = true,
  limit,
}: FleetGridProps) {
  const t = useTranslations("fleet");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [cars, setCars] = useState<Car[]>([]);
  const [branches, setBranches] = useState<Location[]>([]);
  const [activeCategory, setActiveCategory] = useState<CarCategory | "all">(
    "all"
  );
  const [activeBranch, setActiveBranch] = useState<string>("all");
  const [branchOpen, setBranchOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const branchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([fetchCars(), fetchLocations()]).then(([c, l]) => {
      setCars(c);
      setBranches(l);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (branchRef.current && !branchRef.current.contains(e.target as Node)) {
        setBranchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  let filtered = cars;

  if (branchSlug) filtered = getCarsByBranch(filtered, branchSlug);
  if (activeBranch !== "all") filtered = getCarsByBranch(filtered, activeBranch);

  if (activeCategory !== "all") {
    filtered = filtered.filter((c) => c.category === activeCategory);
  }

  if (limit) filtered = filtered.slice(0, limit);

  const uniqueBranches = [
    ...new Set(
      (branchSlug ? getCarsByBranch(cars, branchSlug) : cars).map(
        (c) => c.branch
      )
    ),
  ];

  const countsByCategory = categories.reduce(
    (acc, { key }) => {
      const pool = activeBranch !== "all" ? getCarsByBranch(cars, activeBranch) : cars;
      acc[key] = pool.filter((c) => c.category === key).length;
      return acc;
    },
    {} as Record<string, number>
  );

  const selectedBranchName = activeBranch === "all"
    ? t("allBranches")
    : branches.find((b) => b.slug === activeBranch)
      ? isRtl
        ? branches.find((b) => b.slug === activeBranch)!.nameAr
        : branches.find((b) => b.slug === activeBranch)!.name
      : activeBranch;

  return (
    <section className="section-padding bg-ink-900/30">
      <div className="container-mb">
        {showHeading && (
          <SectionHeading title={t("title")} subtitle={t("subtitle")} gold />
        )}

        <div
          className="relative mb-10"
          dir={isRtl ? "rtl" : "ltr"}
        >
          <div className="flex flex-wrap items-start gap-3 sm:gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible scrollbar-none -mx-5 px-5 sm:mx-0 sm:px-0">
              {categories.map(({ key, icon: Icon }) => {
                const isActive = activeCategory === key;
                return (
                  <button
                    key={key}
                    onClick={() =>
                      setActiveCategory(isActive ? "all" : key)
                    }
                    className={cn(
                      "relative flex items-center gap-2 whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-medium transition-all shrink-0",
                      isActive
                        ? "text-ink-950"
                        : "bg-ink-800/50 text-ink-300 hover:bg-ink-700/50 border border-ink-700/30"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filterBg"
                        className="absolute inset-0 rounded-none bg-gold-500 shadow-lg shadow-gold-500/15"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className="h-4 w-4" />
                      {t(key)}
                    </span>
                    {countsByCategory[key] > 0 && (
                      <span
                        className={cn(
                          "relative z-10 text-[11px] font-mono tabular-nums",
                          isActive ? "text-ink-800" : "text-ink-500"
                        )}
                      >
                        {countsByCategory[key]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {!branchSlug && uniqueBranches.length > 1 && (
              <div ref={branchRef} className="relative shrink-0">
                <button
                  onClick={() => setBranchOpen(!branchOpen)}
                  className={cn(
                    "flex items-center gap-2 rounded-none border px-4 py-2.5 text-sm transition-all",
                    "bg-ink-800/50 text-ink-300 hover:bg-ink-700/50 border-ink-700/30"
                  )}
                >
                  <MapPin className="h-4 w-4 shrink-0 text-gold-500/70" />
                  <span className="max-w-[140px] truncate">
                    {selectedBranchName}
                  </span>
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 text-ink-500 transition-transform", branchOpen && "rotate-180")}
                  />
                </button>

                <AnimatePresence>
                  {branchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "absolute top-full mt-2 w-56 overflow-hidden border border-ink-700 bg-ink-900 shadow-xl backdrop-blur-xl z-30",
                        isRtl ? "left-0" : "right-0"
                      )}
                    >
                      {[
                        { slug: "all", name: t("allBranches") },
                        ...uniqueBranches.map((slug) => ({
                          slug,
                          name: branches.find((b) => b.slug === slug)
                            ? isRtl
                              ? branches.find((b) => b.slug === slug)!.nameAr
                              : branches.find((b) => b.slug === slug)!.name
                            : slug,
                        })),
                      ].map((item) => (
                        <button
                          key={item.slug}
                          onClick={() => {
                            setActiveBranch(item.slug);
                            setBranchOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-ink-800/50",
                            activeBranch === item.slug && "bg-gold-500/5"
                          )}
                        >
                          <span className={cn(
                            "flex-1 text-start",
                            activeBranch === item.slug ? "text-gold-400" : "text-ink-300"
                          )}>
                            {item.name}
                          </span>
                          {activeBranch === item.slug && (
                            <span className="text-[10px] font-medium text-gold-400">
                              Active
                            </span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-none bg-ink-800/50 p-4">
                <div className="aspect-[4/3] rounded-none bg-ink-700/50" />
                <div className="mt-4 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-ink-700/50" />
                  <div className="h-3 w-1/2 rounded bg-ink-700/50" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-none bg-ink-800/30 py-20 text-center border border-ink-700/30">
            <p className="text-ink-400">{t("noCars")}</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((car, i) => (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <CarCard car={car} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {limit && cars.length > limit && (
          <div className="mt-12 text-center">
            <Link
              href="/cars"
              className="btn-outline px-7 py-3.5 text-sm gap-2"
            >
              {t("viewAll")}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
