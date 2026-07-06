import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { fetchCars, fetchLocations, fetchSettings } from "@/lib/sheets";
import { getLocationBySlug, resolveWhatsApp } from "@/lib/branch-utils";
import { CarDetailClient } from "./CarDetailClient";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const cars = await fetchCars();
  const locales = ["en", "fr", "ar"];
  return cars.flatMap((car) =>
    locales.map((locale) => ({ slug: car.slug, locale }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const cars = await fetchCars();
  const car = cars.find((c) => c.slug === slug);
  if (!car) return {};

  const t = await getTranslations({ locale, namespace: "fleet" });
  return {
    title: `${car.brand} ${car.model} (${car.year}) — ${t("title")}`,
    description: car.description,
    openGraph: {
      title: `${car.brand} ${car.model} — ${t("title")}`,
      description: car.description,
      images: car.images,
    },
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "fleet" });
  const lo = await getTranslations({ locale, namespace: "locations" });

  const [cars, locations, settings] = await Promise.all([
    fetchCars(),
    fetchLocations(),
    fetchSettings(),
  ]);

  const car = cars.find((c) => c.slug === slug);
  if (!car) notFound();

  const branch = getLocationBySlug(locations, car.branch);
  const whatsapp = resolveWhatsApp(branch, settings.ownerWhatsApp);
  const isRtl = locale === "ar";

  return (
    <div className="pt-28" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container-mb pb-8">
        <CarDetailClient car={car} />

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="card-glow p-6">
              <h3 className="font-display text-lg text-ink-50">
                {t("features")}
              </h3>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {car.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-ink-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-none bg-gold-500/70" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-glow p-6">
              <h3 className="font-display text-lg text-ink-50">
                {t("description")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-400">
                {car.description}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card-glow p-6">
              <div className="text-center">
                <span className="font-display text-4xl font-bold text-gold-400">
                  ${car.pricePerDay}
                </span>
                <span className="text-sm text-ink-500">{t("perDay")}</span>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                {[
                  { label: t("seats"), value: car.seats },
                  { label: t("transmission"), value: car.transmission },
                  { label: t("fuelType"), value: car.fuelType },
                  { label: t("luggage"), value: car.luggage },
                  { label: t("deposit"), value: `$${car.deposit}` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between border-b border-ink-800/50 pb-2"
                  >
                    <span className="text-ink-400">{item.label}</span>
                    <span className="font-medium text-ink-50 capitalize">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`I'd like to book the ${car.brand} ${car.model} (${car.year})`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block w-full rounded-none bg-gold-500 py-3.5 text-center font-body text-sm font-semibold text-ink-950 transition-all hover:bg-gold-400 shadow-lg shadow-gold-500/15"
              >
                {t("bookNow")}
              </a>
            </div>

            {branch && (
              <div className="card-glow p-5">
                <h4 className="font-display text-sm text-ink-50">
                  {isRtl ? branch.nameAr : branch.name}
                </h4>
                <p className="mt-1 text-xs text-ink-400">
                  {isRtl ? branch.addressAr : branch.address}
                </p>
                <a
                  href={`tel:${branch.phone}`}
                  className="mt-3 inline-block text-xs font-medium text-gold-400 hover:text-gold-300"
                >
                  {branch.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
