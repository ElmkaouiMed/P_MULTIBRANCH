"use client";

import { useState, useEffect } from "react";
import { MessageSquareText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useBranchContext } from "@/context/BranchContext";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const { resolveBranchWhatsApp } = useBranchContext();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const whatsapp = resolveBranchWhatsApp();
  const url = createWhatsAppUrl(whatsapp, "Hello! I'd like to rent a car.");

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-none bg-gold-500 text-ink-950 shadow-xl shadow-gold-500/20 transition-all hover:bg-gold-400 hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
          aria-label="Contact via WhatsApp"
        >
          <span className="absolute inset-0 animate-ping rounded-none bg-gold-500/30" />
          <MessageSquareText className="relative h-7 w-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
