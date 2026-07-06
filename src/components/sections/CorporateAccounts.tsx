"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  Check,
  Building2,
  Users,
  BarChart3,
  HeadphonesIcon,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useBranchContext } from "@/context/BranchContext";
import { createWhatsAppUrl, createBookingMessage } from "@/lib/whatsapp";

const benefitIcons = [
  <Users key="1" className="h-6 w-6" />,
  <BarChart3 key="2" className="h-6 w-6" />,
  <Building2 key="3" className="h-6 w-6" />,
  <Check key="4" className="h-6 w-6" />,
  <BarChart3 key="5" className="h-6 w-6" />,
  <HeadphonesIcon key="6" className="h-6 w-6" />,
];

const stats = [
  { value: "500+", label: "CLIENTS" },
  { value: "15+", label: "YEARS" },
  { value: "1K+", label: "VEHICLES" },
  { value: "98%", label: "SATISFACTION" },
];

export function CorporateAccounts() {
  const t = useTranslations("corporate");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { resolveBranchWhatsApp } = useBranchContext();

  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    fleetSize: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const benefits = t.raw("benefitList") as string[];

  const handleSubmit = () => {
    const whatsapp = resolveBranchWhatsApp();
    const msg = createBookingMessage(
      {
        name: form.company,
        phone: form.phone,
        message: `Contact: ${form.contact}, Email: ${form.email}, Fleet Size: ${form.fleetSize}, Requirements: ${form.message}`,
        car: "Corporate Fleet Inquiry",
      },
      locale
    );
    window.open(createWhatsAppUrl(whatsapp, msg), "_blank");
    setSent(true);
  };

  return (
    <section className="section-padding bg-ink-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(235,110,74,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute inset-0 grain-overlay opacity-30" />
      <div className="container-mb relative" dir={isRtl ? "rtl" : "ltr"}>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-4 mb-16 flex flex-wrap justify-center gap-x-12 gap-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-gold-400">{stat.value}</span>
              <span className="text-[11px] tracking-[0.15em] text-ink-500">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-16 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <span className="inline-flex items-center gap-2 rounded-none border border-gold-500/20 bg-gold-500/8 px-3 py-1 text-[11px] tracking-wider text-gold-400/80 uppercase">
              {t("benefits")}
            </span>

            <p className="mt-5 text-ink-300 leading-relaxed max-w-lg">{t("description")}</p>

            <div className="mt-8 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex items-start gap-4 rounded-none border border-ink-800/40 bg-ink-900/30 p-5 transition-all hover:border-gold-500/20 hover:bg-ink-900/60"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-gold-500/10 text-gold-400 transition-all group-hover:bg-gold-500/20">
                    {benefitIcons[i]}
                  </span>
                  <span className="pt-1 text-sm text-ink-300 leading-snug">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="rounded-none border border-ink-800/60 bg-ink-900/50 backdrop-blur-sm p-6 sm:p-8">
              <h3 className="mb-6 font-display text-lg text-ink-50">{t("formTitle")}</h3>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-none bg-green-500/10 text-green-400">
                    <Check className="h-8 w-8" />
                  </div>
                  <p className="mt-4 font-medium text-ink-200">{t("formSent")}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-ink-300 mb-1.5">{t("formName")}</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full rounded-none border border-ink-700/50 bg-ink-950 px-4 py-3 text-sm text-ink-100 outline-none transition-all focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-300 mb-1.5">{t("formContact")}</label>
                      <input
                        type="text"
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        className="w-full rounded-none border border-ink-700/50 bg-ink-950 px-4 py-3 text-sm text-ink-100 outline-none transition-all focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/40"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-ink-300 mb-1.5">{t("formEmail")}</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-none border border-ink-700/50 bg-ink-950 px-4 py-3 text-sm text-ink-100 outline-none transition-all focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-300 mb-1.5">{t("formPhone")}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-none border border-ink-700/50 bg-ink-950 px-4 py-3 text-sm text-ink-100 outline-none transition-all focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-300 mb-1.5">{t("formFleetSize")}</label>
                    <input
                      type="text"
                      value={form.fleetSize}
                      onChange={(e) => setForm({ ...form, fleetSize: e.target.value })}
                      className="w-full rounded-none border border-ink-700/50 bg-ink-950 px-4 py-3 text-sm text-ink-100 outline-none transition-all focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-300 mb-1.5">{t("formMessage")}</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-none border border-ink-700/50 bg-ink-950 px-4 py-3 text-sm text-ink-100 outline-none transition-all focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/40 resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="btn-primary w-full px-6 py-3.5 text-sm gap-2"
                  >
                    {t("formSubmit")}
                    <ArrowRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-1", isRtl && "rotate-180")} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
