"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, Car } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/routing";
import { useBranchContext } from "@/context/BranchContext";
import { createWhatsAppUrl, createBookingMessage } from "@/lib/whatsapp";

export function MobileCta() {
  const t = useTranslations("fleet");
  const locale = useLocale();
  const { resolveBranchWhatsApp } = useBranchContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const whatsapp = resolveBranchWhatsApp();
  const url = createWhatsAppUrl(whatsapp, createBookingMessage({}, locale));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 inset-x-0 z-30 flex items-center gap-3 border-t border-ink-800/80 bg-ink-950/95 backdrop-blur-xl px-4 py-3 sm:hidden"
        >
          <Link
            href="/cars"
            className="btn-secondary flex-1 py-3 text-sm gap-2"
          >
            <Car className="h-4 w-4" />
            {t("bookFlow")}
          </Link>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 py-3 text-sm gap-2 shadow-lg shadow-gold-500/20"
          >
            <MessageSquareText className="h-4 w-4" />
            {t("bookNow")}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
