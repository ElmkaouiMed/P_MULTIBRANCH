import { getTranslations } from "next-intl/server";
import { FleetGrid } from "@/components/sections/FleetGrid";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fleet" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function CarsPage() {
  return (
    <div className="pt-28">
      <FleetGrid showHeading />
    </div>
  );
}
