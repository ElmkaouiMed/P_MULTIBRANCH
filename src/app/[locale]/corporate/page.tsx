import { getTranslations } from "next-intl/server";
import { CorporateAccounts } from "@/components/sections/CorporateAccounts";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "corporate" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function CorporatePage() {
  return (
    <div className="pt-28">
      <CorporateAccounts />
    </div>
  );
}
