import { type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/routing";
import { Prata, Outfit, Kufam } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MobileCta } from "@/components/layout/MobileCta";
import { BranchProvider } from "@/context/BranchContext";
import "../globals.css";

const prata = Prata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const kufam = Kufam({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: [
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr" | "ar")) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  const messages = await getMessages();
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${prata.variable} ${outfit.variable} ${kufam.variable}`}
    >
      <body className="min-h-screen noise-bg">
        <NextIntlClientProvider messages={messages}>
          <BranchProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
            <MobileCta />
          </BranchProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
