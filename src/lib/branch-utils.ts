/**
 * BRANCH MATCHING UTILITY
 *
 * This is the core join logic for the MultiBranch template.
 *
 * HOW IT WORKS:
 *   Cars have a `branch` field (string).
 *   Locations have a `slug` field (string).
 *   A car is available at a location IF car.branch === location.slug.
 *
 * SHEET SETUP:
 *   In your Google Sheets "Cars" tab, add a column called "branch".
 *   Each row's value must exactly match the "slug" column in the "Locations" tab.
 *   Example:
 *     Cars.branch = "downtown-dubai"
 *     Locations.slug = "downtown-dubai"  ✓ match
 *
 *   If a car is available at multiple branches, duplicate the car row
 *   with a different branch value for each location.
 */

import type { Car, Location } from "@/types";

/**
 * Returns all cars that belong to the given branch slug.
 * Returns an empty array if the branch slug is invalid or has no cars.
 */
export function getCarsByBranch(
  cars: Car[],
  branchSlug: string
): Car[] {
  return cars.filter(
    (car) =>
      car.branch.toLowerCase().trim() === branchSlug.toLowerCase().trim()
  );
}

/**
 * Returns a lookup map: branchSlug -> Car[] for O(1) access.
 * Useful when rendering multiple branch pages at once (e.g. sitemap generation).
 */
export function getCarsByBranchMap(cars: Car[]): Map<string, Car[]> {
  const map = new Map<string, Car[]>();
  for (const car of cars) {
    const key = car.branch.toLowerCase().trim();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(car);
  }
  return map;
}

/**
 * Find a location by its slug. Returns undefined if not found.
 */
export function getLocationBySlug(
  locations: Location[],
  slug: string
): Location | undefined {
  return locations.find(
    (loc) => loc.slug.toLowerCase().trim() === slug.toLowerCase().trim()
  );
}

/**
 * Resolve the WhatsApp number to use in a given context:
 *   1. If a branch is selected and it has its own whatsapp, use that.
 *   2. Otherwise, fall back to the head-office number from settings.
 */
export function resolveWhatsApp(
  branch: Location | undefined | null,
  ownerWhatsApp: string
): string {
  if (branch?.whatsapp) return branch.whatsapp;
  return ownerWhatsApp;
}

/**
 * Returns all unique branch slugs that have at least one car assigned.
 */
export function getActiveBranchSlugs(cars: Car[]): string[] {
  return [...new Set(cars.map((c) => c.branch.toLowerCase().trim()))];
}

/**
 * Returns branches that have at least one car (i.e. active branches).
 */
export function getActiveBranches(
  cars: Car[],
  locations: Location[]
): Location[] {
  const activeSlugs = new Set(cars.map((c) => c.branch.toLowerCase().trim()));
  return locations.filter((loc) => activeSlugs.has(loc.slug.toLowerCase().trim()));
}
