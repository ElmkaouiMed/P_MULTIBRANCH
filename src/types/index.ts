export type Locale = "en" | "fr" | "ar";

export type CarCategory = "economy" | "sedan" | "suv" | "van" | "luxury";
export type Transmission = "automatic" | "manual";
export type FuelType = "gasoline" | "diesel" | "electric" | "hybrid";
export type CarStatus = "available" | "booked" | "maintenance" | "retired";

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  transmission: Transmission;
  fuelType: FuelType;
  seats: number;
  doors: number;
  luggage: number;
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  deposit: number;
  description: string;
  features: string[];
  images: string[];
  status: CarStatus;
  /** Slug of the Location this car belongs to — join key */
  branch: string;
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  address: string;
  addressAr: string;
  city: string;
  cityAr: string;
  phone: string;
  /** Per-branch WhatsApp number — can be empty; falls back to Settings.ownerWhatsApp */
  whatsapp: string;
  email: string;
  hours: string;
  hoursAr: string;
  lat: number;
  lng: number;
  image: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  text: string;
  nameAr?: string;
  titleAr?: string;
  textAr?: string;
  nameFr?: string;
  titleFr?: string;
  textFr?: string;
  /** Optional — slug of the branch this testimonial refers to */
  branch?: string;
}

export interface PricingTier {
  id: string;
  category: CarCategory;
  daily: number;
  weekly: number;
  monthly: number;
  mileage: string;
  deposit: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  questionAr?: string;
  answerAr?: string;
  questionFr?: string;
  answerFr?: string;
}

export interface Settings {
  ownerName: string;
  ownerWhatsApp: string;
  businessEmail: string;
  businessPhone: string;
  businessHours: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
}

export interface SheetData {
  cars: Car[];
  locations: Location[];
  testimonials: Testimonial[];
  pricing: PricingTier[];
  faq: FaqItem[];
  settings: Settings;
}
