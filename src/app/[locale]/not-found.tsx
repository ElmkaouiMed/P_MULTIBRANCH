import { getTranslations } from "next-intl/server";
import { Link } from "@/routing";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function NotFoundPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 noise-bg">
      <h1 className="font-display text-8xl font-bold text-gold-500">404</h1>
      <p className="mt-4 text-ink-400">{t("description")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-none bg-gold-500 px-7 py-3.5 font-body text-sm font-semibold text-ink-950 transition-all hover:bg-gold-400 shadow-lg shadow-gold-500/15"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
