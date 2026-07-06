"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fetchFaq } from "@/lib/sheets";
import { useBranchContext } from "@/context/BranchContext";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import type { FaqItem } from "@/types";

export function FaqSection() {
  const t = useTranslations("faq");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { resolveBranchWhatsApp } = useBranchContext();
  const [items, setItems] = useState<FaqItem[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetchFaq().then(setItems);
  }, []);

  return (
    <section className="section-padding bg-ink-900/20">
      <div className="container-mb" dir={isRtl ? "rtl" : "ltr"}>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="mx-auto max-w-3xl space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-none border border-ink-800/50 bg-ink-900/40 backdrop-blur-sm"
            >
              <button
                onClick={() =>
                  setOpenId(openId === item.id ? null : item.id)
                }
                className="flex w-full items-center justify-between px-6 py-5 text-start transition-colors hover:bg-ink-800/30"
              >
                <span className="text-sm font-medium text-ink-50 px-4">
                  {locale === "ar" && item.questionAr ? item.questionAr : locale === "fr" && item.questionFr ? item.questionFr : item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-ink-500 transition-transform duration-300",
                    openId === item.id && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="border-t border-ink-800/50 px-6 py-5">
                      <motion.p
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.25, delay: 0.1 }}
                        className="text-sm leading-relaxed text-ink-400 font-light"
                      >
                        {locale === "ar" && item.answerAr ? item.answerAr : locale === "fr" && item.answerFr ? item.answerFr : item.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={createWhatsAppUrl(
              resolveBranchWhatsApp(),
              "Hello! I have a question about car rental."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-7 py-3.5 text-sm gap-2.5"
          >
            <MessageSquareText className="h-4 w-4" />
            {t("contactCta")}
          </a>
        </div>
      </div>
    </section>
  );
}
