"use client";

import { motion } from "framer-motion";
import { Users, Fuel, Gauge, Luggage, MessageSquareText } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Car as CarType } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import { Link } from "@/routing";
import { useBranchContext } from "@/context/BranchContext";
import { createWhatsAppUrl, createBookingMessage } from "@/lib/whatsapp";

interface CarCardProps {
  car: CarType;
  onSelect?: (car: CarType) => void;
  compact?: boolean;
  index?: number;
}

export function CarCard({ car, onSelect, compact, index = 0 }: CarCardProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("fleet");
  const { resolveBranchWhatsApp } = useBranchContext();

  const specs = [
    { icon: <Users className="h-3.5 w-3.5" />, label: `${car.seats}` },
    {
      icon: <Fuel className="h-3.5 w-3.5" />,
      label: car.transmission === "automatic" ? "A/T" : "M/T",
    },
    { icon: <Luggage className="h-3.5 w-3.5" />, label: `${car.luggage}` },
    { icon: <Gauge className="h-3.5 w-3.5" />, label: car.fuelType },
  ];

  const whatsapp = resolveBranchWhatsApp();
  const whatsappUrl = createWhatsAppUrl(
    whatsapp,
    createBookingMessage({ car: `${car.brand} ${car.model}` }, locale)
  );

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={cn(
        "card-glow group cursor-default",
        compact && "flex flex-row items-center gap-4 p-3"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          compact
            ? "h-20 w-28 shrink-0 rounded-none"
            : "aspect-[4/3] w-full rounded-none"
        )}
      >
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
        <span className={cn("absolute top-3 rounded-none bg-ink-950/70 px-3 py-1 text-[11px] font-medium tracking-wider text-ink-200 uppercase backdrop-blur-sm border border-ink-600/30", isRtl ? "right-3" : "left-3")}>
          {car.category}
        </span>

        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 flex translate-y-4 items-center justify-center p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn-primary px-4 py-2 text-xs gap-1.5 shadow-lg shadow-gold-500/20"
          >
            <MessageSquareText className="h-4 w-4" />
            {t("bookNow")}
          </a>
        </div>
      </div>

      <div className={cn("flex flex-col", compact ? "flex-1 min-w-0" : "p-5")}>
          <div className="flex items-start justify-between gap-3" dir={isRtl ? "rtl" : "ltr"}>
          <div className="min-w-0">
            <h3
              className={cn(
                "font-display text-ink-50 truncate",
                compact ? "text-sm" : "text-lg"
              )}
              dir={isRtl ? "rtl" : "ltr"}
            >
              {car.brand}{" "}
              <span className="text-ink-400">{car.model}</span>
            </h3>
            <p className={cn("text-ink-500", compact ? "text-xs" : "text-sm")}>
              {car.year}
            </p>
          </div>
          <div className="text-end shrink-0">
            <span
              className={cn(
                "font-display font-bold text-gold-400",
                compact ? "text-base" : "text-2xl"
              )}
            >
              {formatPrice(car.pricePerDay, locale)}
            </span>
            <span className="text-[11px] text-ink-500">/day</span>
          </div>
        </div>

        {!compact && (
          <div className="mt-4 flex flex-wrap gap-3 border-t border-ink-700/50 pt-4">
            {specs.map((spec, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-xs text-ink-400"
              >
                {spec.icon}
                {spec.label}
              </span>
            ))}
          </div>
        )}

        {onSelect && (
          <button
            onClick={() => onSelect(car)}
            className={cn(
              "mt-4 w-full rounded-none bg-gold-500/10 py-2.5 text-sm font-medium text-gold-400 transition-all hover:bg-gold-500/20 border border-gold-500/20",
              compact && "mt-0 shrink-0 w-auto px-5"
            )}
          >
            Select
          </button>
        )}
      </div>
    </motion.div>
  );

  if (onSelect) return content;

  return (
    <Link href={`/cars/${car.slug}` as any} className="block">
      {content}
    </Link>
  );
}
