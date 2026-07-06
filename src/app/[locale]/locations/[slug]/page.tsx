import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { fetchLocations, fetchCars, fetchSettings } from "@/lib/sheets";
import { getCarsByBranch, resolveWhatsApp } from "@/lib/branch-utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CarCard } from "@/components/ui/CarCard";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const [locations, cars] = await Promise.all([
    fetchLocations(),
    fetchCars(),
  ]);
  const locales = ["en", "fr", "ar"];
  return locations.flatMap((loc) =>
    locales.map((locale) => ({ slug: loc.slug, locale }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const [locations, settings] = await Promise.all([
    fetchLocations(),
    fetchSettings(),
  ]);
  const branch = locations.find((l) => l.slug === slug);
  if (!branch) return {};

  const isRtl = locale === "ar";
  const city = isRtl ? branch.cityAr : branch.city;
  const brand = settings.ownerName || "MultiBranch Rentals";
  return {
    title: `Car Rental in ${city} — ${brand}`,
    description: `Rent a car in ${city} from ${brand}. View our fleet, pricing, and book online.`,
    openGraph: { title: `Car Rental in ${city} — ${brand}`, description: `Rent a car in ${city} from ${brand}.` },
  };
}

export default async function BranchPage({ params }: Props) {
  const { slug, locale } = await params;
  const isRtl = locale === "ar";
  const bd = await getTranslations({ locale, namespace: "branchDetail" });

  const [locations, cars, settings] = await Promise.all([
    fetchLocations(),
    fetchCars(),
    fetchSettings(),
  ]);

  const branch = locations.find((l) => l.slug === slug);
  if (!branch) notFound();

  const branchCars = getCarsByBranch(cars, slug);
  const whatsapp = resolveWhatsApp(branch, settings.ownerWhatsApp);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${settings.ownerName} — ${isRtl ? branch.nameAr : branch.name}`,
    description: `Car rental service in ${isRtl ? branch.cityAr : branch.city}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: isRtl ? branch.addressAr : branch.address,
      addressLocality: isRtl ? branch.cityAr : branch.city,
      addressCountry: "AE",
    },
    geo: { "@type": "GeoCoordinates", latitude: branch.lat, longitude: branch.lng },
    telephone: branch.phone,
    openingHours: branch.hours,
  };

  return (
    <div className="pt-20" dir={isRtl ? "rtl" : "ltr"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-ink-950 border-b border-ink-800/50">
        <div className="container-mb py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="heading-xl text-ink-50!">
                {isRtl ? branch.nameAr : branch.name}
              </h1>
              <p className="mt-3 text-ink-400">
                {isRtl ? branch.addressAr : branch.address}
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href={`tel:${branch.phone}`}
                  className="flex items-center gap-3 text-sm text-ink-300 hover:text-gold-400 transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-none bg-gold-500/10 text-gold-500">
                    <Phone className="h-4 w-4" />
                  </span>
                  {branch.phone}
                </a>
                <a
                  href={`mailto:${branch.email}`}
                  className="flex items-center gap-3 text-sm text-ink-300 hover:text-gold-400 transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-none bg-gold-500/10 text-gold-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  {branch.email}
                </a>
                <div className="flex items-start gap-3 text-sm text-ink-300">
                  <span className="flex h-8 w-8 items-center justify-center rounded-none bg-gold-500/10 text-gold-500 shrink-0">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span className="pt-1.5">{isRtl ? branch.hoursAr : branch.hours}</span>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gold-400 hover:text-gold-300 transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-none bg-gold-500/10 text-gold-500">
                    <MapPin className="h-4 w-4" />
                  </span>
                  Get Directions
                </a>
              </div>

              <a
                href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Hello! I'd like to inquire about cars at ${isRtl ? branch.nameAr : branch.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-none bg-gold-500 px-7 py-3.5 font-body text-sm font-semibold text-ink-950 transition-all hover:bg-gold-400 shadow-lg shadow-gold-500/15"
              >
                {bd("contactBranch")}
              </a>
            </div>

            <div className="overflow-hidden rounded-none border border-ink-800/50">
              <iframe
                title={isRtl ? branch.nameAr : branch.name}
                width="100%"
                height="360"
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${branch.lat},${branch.lng}&center=${branch.lat},${branch.lng}&zoom=15`}
                className="border-0 grayscale invert-[.85] hue-rotate-180"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="section-padding bg-ink-900/20">
        <div className="container-mb">
          <SectionHeading
            title={bd("carsAt", { branch: isRtl ? branch.nameAr : branch.name })}
          />

          {branchCars.length === 0 ? (
            <div className="rounded-none bg-ink-800/30 py-20 text-center border border-ink-700/30">
              <p className="text-ink-400">{bd("noCars")}</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {branchCars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
