import type { MetadataRoute } from "next";
import { fetchCars, fetchLocations } from "@/lib/sheets";

const locales = ["en", "fr", "ar"] as const;
const baseUrl = "https://multibranch-template.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cars, locations] = await Promise.all([
    fetchCars(),
    fetchLocations(),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });

    entries.push({
      url: `${baseUrl}/${locale}/cars`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    entries.push({
      url: `${baseUrl}/${locale}/corporate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });

    for (const location of locations) {
      entries.push({
        url: `${baseUrl}/${locale}/locations/${location.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const car of cars) {
      entries.push({
        url: `${baseUrl}/${locale}/cars/${car.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
