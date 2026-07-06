import { cache } from "react";
import type {
  Car,
  Location,
  Testimonial,
  PricingTier,
  FaqItem,
  Settings,
  SheetData,
} from "@/types";

const SHEET_URL = process.env.NEXT_PUBLIC_SHEET_JSON_URL;

export const fetchSheetData = cache(async (): Promise<SheetData | null> => {
  if (!SHEET_URL) return null;
  try {
    const res = await fetch(SHEET_URL, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data: SheetData = await res.json();
    return data;
  } catch {
    return null;
  }
});

export const fetchCars = cache(async (): Promise<Car[]> => {
  const data = await fetchSheetData();
  return data?.cars ?? getFallbackCars();
});

export const fetchCarBySlug = cache(
  async (slug: string): Promise<Car | undefined> => {
    const cars = await fetchCars();
    return cars.find((c) => c.slug === slug);
  }
);

export const fetchLocations = cache(async (): Promise<Location[]> => {
  const data = await fetchSheetData();
  return data?.locations ?? getFallbackLocations();
});

export const fetchLocationBySlug = cache(
  async (slug: string): Promise<Location | undefined> => {
    const locations = await fetchLocations();
    return locations.find((l) => l.slug === slug);
  }
);

export const fetchTestimonials = cache(async (): Promise<Testimonial[]> => {
  const data = await fetchSheetData();
  return data?.testimonials ?? getFallbackTestimonials();
});

export const fetchPricing = cache(async (): Promise<PricingTier[]> => {
  const data = await fetchSheetData();
  return data?.pricing ?? getFallbackPricing();
});

export const fetchFaq = cache(async (): Promise<FaqItem[]> => {
  const data = await fetchSheetData();
  return data?.faq ?? getFallbackFaq();
});

export const fetchSettings = cache(async (): Promise<Settings> => {
  const data = await fetchSheetData();
  return data?.settings ?? getFallbackSettings();
});

function getFallbackCars(): Car[] {
  return [
    {
      id: "1",
      slug: "toyota-yaris",
      brand: "Toyota",
      model: "Yaris",
      year: 2024,
      category: "economy",
      transmission: "automatic",
      fuelType: "gasoline",
      seats: 5,
      doors: 4,
      luggage: 2,
      pricePerDay: 35,
      pricePerWeek: 210,
      pricePerMonth: 700,
      deposit: 200,
      description:
        "Compact and fuel-efficient city car, perfect for navigating urban streets with ease.",
      features: ["Air Conditioning", "Bluetooth", "Backup Camera", "AUX Input"],
      images: [
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
      ],
      status: "available",
      branch: "downtown-dubai",
    },
    {
      id: "2",
      slug: "hyundai-elantra",
      brand: "Hyundai",
      model: "Elantra",
      year: 2024,
      category: "sedan",
      transmission: "automatic",
      fuelType: "gasoline",
      seats: 5,
      doors: 4,
      luggage: 3,
      pricePerDay: 45,
      pricePerWeek: 270,
      pricePerMonth: 900,
      deposit: 250,
      description:
        "Reliable mid-size sedan with modern features and excellent fuel economy.",
      features: [
        "Apple CarPlay",
        "Android Auto",
        "Blind Spot Monitoring",
        "Cruise Control",
      ],
      images: [
        "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&q=80",
      ],
      status: "available",
      branch: "downtown-dubai",
    },
    {
      id: "3",
      slug: "nissan-pathfinder",
      brand: "Nissan",
      model: "Pathfinder",
      year: 2024,
      category: "suv",
      transmission: "automatic",
      fuelType: "gasoline",
      seats: 7,
      doors: 5,
      luggage: 4,
      pricePerDay: 75,
      pricePerWeek: 450,
      pricePerMonth: 1500,
      deposit: 400,
      description:
        "Spacious SUV with third-row seating, ideal for family trips and off-road adventures.",
      features: [
        "Third Row Seating",
        "4WD",
        "Roof Rails",
        "Tow Package",
        "Panoramic Sunroof",
      ],
      images: [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
      ],
      status: "available",
      branch: "downtown-dubai",
    },
    {
      id: "4",
      slug: "toyota-hiace",
      brand: "Toyota",
      model: "HiAce",
      year: 2024,
      category: "van",
      transmission: "automatic",
      fuelType: "diesel",
      seats: 12,
      doors: 4,
      luggage: 6,
      pricePerDay: 90,
      pricePerWeek: 540,
      pricePerMonth: 1800,
      deposit: 500,
      description:
        "Spacious passenger van perfect for group transfers and airport runs.",
      features: ["Diesel Engine", "High Roof", "Sliding Door", "AC"],
      images: [
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
      ],
      status: "available",
      branch: "downtown-dubai",
    },
    {
      id: "5",
      slug: "toyota-corolla",
      brand: "Toyota",
      model: "Corolla",
      year: 2024,
      category: "sedan",
      transmission: "automatic",
      fuelType: "gasoline",
      seats: 5,
      doors: 4,
      luggage: 3,
      pricePerDay: 40,
      pricePerWeek: 240,
      pricePerMonth: 800,
      deposit: 200,
      description:
        "The world's best-selling sedan, offering unmatched reliability and comfort.",
      features: [
        "Lane Departure Alert",
        "Pre-Collision System",
        "LED Headlights",
      ],
      images: [
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
      ],
      status: "available",
      branch: "marina-dubai",
    },
    {
      id: "6",
      slug: "nissan-sunny",
      brand: "Nissan",
      model: "Sunny",
      year: 2024,
      category: "economy",
      transmission: "automatic",
      fuelType: "gasoline",
      seats: 5,
      doors: 4,
      luggage: 2,
      pricePerDay: 30,
      pricePerWeek: 180,
      pricePerMonth: 600,
      deposit: 150,
      description:
        "Affordable and practical compact car for budget-conscious travelers.",
      features: ["Air Conditioning", "Bluetooth", "USB Charging"],
      images: [
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      ],
      status: "available",
      branch: "marina-dubai",
    },
    {
      id: "7",
      slug: "toyota-fortuner",
      brand: "Toyota",
      model: "Fortuner",
      year: 2024,
      category: "suv",
      transmission: "automatic",
      fuelType: "diesel",
      seats: 7,
      doors: 5,
      luggage: 4,
      pricePerDay: 85,
      pricePerWeek: 510,
      pricePerMonth: 1700,
      deposit: 500,
      description:
        "Robust off-road SUV with powerful diesel engine and premium interior.",
      features: ["4WD", "Diesel", "Third Row", "Sunroof", "Push Start"],
      images: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
      ],
      status: "available",
      branch: "marina-dubai",
    },
    {
      id: "8",
      slug: "mercedes-benz-c-class",
      brand: "Mercedes-Benz",
      model: "C-Class",
      year: 2024,
      category: "luxury",
      transmission: "automatic",
      fuelType: "gasoline",
      seats: 5,
      doors: 4,
      luggage: 3,
      pricePerDay: 120,
      pricePerWeek: 720,
      pricePerMonth: 2400,
      deposit: 800,
      description:
        "Premium German engineering with a refined interior and advanced technology.",
      features: [
        "Leather Seats",
        "Burmester Sound",
        "Ambient Lighting",
        "Massage Seats",
      ],
      images: [
        "https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80",
      ],
      status: "available",
      branch: "abu-dhabi",
    },
    {
      id: "9",
      slug: "bmw-x5",
      brand: "BMW",
      model: "X5",
      year: 2024,
      category: "luxury",
      transmission: "automatic",
      fuelType: "gasoline",
      seats: 5,
      doors: 5,
      luggage: 4,
      pricePerDay: 140,
      pricePerWeek: 840,
      pricePerMonth: 2800,
      deposit: 1000,
      description:
        "Luxury SUV with breathtaking performance and the ultimate driving experience.",
      features: [
        "xDrive AWD",
        "Panoramic Roof",
        "Harman Kardon Sound",
        "Head-Up Display",
      ],
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      ],
      status: "available",
      branch: "abu-dhabi",
    },
    {
      id: "10",
      slug: "hyundai-i10",
      brand: "Hyundai",
      model: "i10",
      year: 2024,
      category: "economy",
      transmission: "manual",
      fuelType: "gasoline",
      seats: 5,
      doors: 4,
      luggage: 1,
      pricePerDay: 25,
      pricePerWeek: 150,
      pricePerMonth: 500,
      deposit: 100,
      description:
        "Ultra-compact city runabout, easy to park and very economical.",
      features: ["Air Conditioning", "AUX Input", "Electric Windows"],
      images: [
        "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
      ],
      status: "available",
      branch: "abu-dhabi",
    },
    {
      id: "11",
      slug: "nissan-urvan",
      brand: "Nissan",
      model: "Urvan",
      year: 2024,
      category: "van",
      transmission: "manual",
      fuelType: "diesel",
      seats: 14,
      doors: 4,
      luggage: 8,
      pricePerDay: 100,
      pricePerWeek: 600,
      pricePerMonth: 2000,
      deposit: 600,
      description:
        "Large passenger van ideal for group tours, events, and airport transfers.",
      features: ["Diesel", "High Roof", "Dual AC", "Rear AC"],
      images: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      ],
      status: "available",
      branch: "sharjah",
    },
    {
      id: "12",
      slug: "kia-sportage",
      brand: "Kia",
      model: "Sportage",
      year: 2024,
      category: "suv",
      transmission: "automatic",
      fuelType: "gasoline",
      seats: 5,
      doors: 5,
      luggage: 3,
      pricePerDay: 65,
      pricePerWeek: 390,
      pricePerMonth: 1300,
      deposit: 350,
      description:
        "Stylish compact SUV with a bold design and long list of standard features.",
      features: [
        "Wireless Charging",
        "Dual Zone AC",
        "Rear Camera",
        "Blind Spot Alert",
      ],
      images: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
      ],
      status: "available",
      branch: "sharjah",
    },
  ];
}

function getFallbackLocations(): Location[] {
  return [
    {
      id: "1",
      slug: "downtown-dubai",
      name: "Downtown Dubai",
      nameAr: "وسط مدينة دبي",
      address: "Sheikh Mohammed Bin Rashid Blvd, Dubai Mall",
      addressAr: "شارع الشيخ محمد بن راشد، دبي مول",
      city: "Dubai",
      cityAr: "دبي",
      phone: "+971 4 123 4567",
      whatsapp: "+971501234567",
      email: "downtown@multibranch.com",
      hours: "Sat–Thu 7:00–23:00, Fri 13:00–22:00",
      hoursAr: "السبت-الخميس ٧:٠٠-٢٣:٠٠، الجمعة ١٣:٠٠-٢٢:٠٠",
      lat: 25.1972,
      lng: 55.2744,
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      order: 1,
    },
    {
      id: "2",
      slug: "marina-dubai",
      name: "Dubai Marina",
      nameAr: "مرسى دبي",
      address: "Dubai Marina Walk, Near Marina Mall",
      addressAr: "ممشى مرسى دبي، بالقرب من مول مارينا",
      city: "Dubai",
      cityAr: "دبي",
      phone: "+971 4 234 5678",
      whatsapp: "+971502345678",
      email: "marina@multibranch.com",
      hours: "Sat–Thu 7:00–23:00, Fri 13:00–22:00",
      hoursAr: "السبت-الخميس ٧:٠٠-٢٣:٠٠، الجمعة ١٣:٠٠-٢٢:٠٠",
      lat: 25.0824,
      lng: 55.1435,
      image:
        "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80",
      order: 2,
    },
    {
      id: "3",
      slug: "abu-dhabi",
      name: "Abu Dhabi Downtown",
      nameAr: "وسط مدينة أبوظبي",
      address: "Corniche Road, Abu Dhabi",
      addressAr: "شارع الكورنيش، أبوظبي",
      city: "Abu Dhabi",
      cityAr: "أبوظبي",
      phone: "+971 2 345 6789",
      whatsapp: "",
      email: "abudhabi@multibranch.com",
      hours: "Sat–Thu 7:00–22:00, Fri 14:00–21:00",
      hoursAr: "السبت-الخميس ٧:٠٠-٢٢:٠٠، الجمعة ١٤:٠٠-٢١:٠٠",
      lat: 24.4764,
      lng: 54.3705,
      image:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      order: 3,
    },
    {
      id: "4",
      slug: "sharjah",
      name: "Sharjah City Center",
      nameAr: "مركز مدينة الشارقة",
      address: "Al Wahda Street, Sharjah",
      addressAr: "شارع الوحدة، الشارقة",
      city: "Sharjah",
      cityAr: "الشارقة",
      phone: "+971 6 456 7890",
      whatsapp: "+971604567890",
      email: "sharjah@multibranch.com",
      hours: "Sat–Thu 8:00–22:00, Fri 14:00–21:00",
      hoursAr: "السبت-الخميس ٨:٠٠-٢٢:٠٠، الجمعة ١٤:٠٠-٢١:٠٠",
      lat: 25.3573,
      lng: 55.4033,
      image:
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
      order: 4,
    },
  ];
}

function getFallbackTestimonials(): Testimonial[] {
  return [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "Business Traveler",
      avatar: "",
      rating: 5,
      text: "Rented from the Downtown branch and the process was incredibly smooth. The car was clean and ready on time. Highly professional team.",
      nameAr: "سارة جونسون",
      titleAr: "مسافرة أعمال",
      textAr: "استأجرت من فرع وسط المدينة وكانت العملية سلسة للغاية. السيارة كانت نظيفة وجاهزة في الوقت المحدد. فريق محترف جداً.",
      nameFr: "Sarah Johnson",
      titleFr: "Voyageur d'affaires",
      textFr: "Loué à l'agence du centre-ville, le processus a été incroyablement fluide. La voiture était propre et prête à l'heure. Équipe très professionnelle.",
      branch: "downtown-dubai",
    },
    {
      id: "2",
      name: "Ahmed Al Mansouri",
      title: "Family Vacation",
      avatar: "",
      rating: 5,
      text: "We rented an SUV from the Marina branch for our family trip. Great service, fair pricing, and the staff were very helpful with directions.",
      nameAr: "أحمد آل منصوري",
      titleAr: "إجازة عائلية",
      textAr: "استأجرنا سيارة دفع رباعي من فرع المارينا لرحلتنا العائلية. خدمة رائعة، أسعار مناسبة، والموظفون كانوا مفيدين جداً في الاتجاهات.",
      nameFr: "Ahmed Al Mansouri",
      titleFr: "Vacances en famille",
      textFr: "Nous avons loué un SUV à l'agence de Marina pour notre voyage familial. Excellent service, prix équitables, et le personnel a été très utile pour les directions.",
      branch: "marina-dubai",
    },
    {
      id: "3",
      name: "Elena Petrova",
      title: "Business Traveler",
      avatar: "",
      rating: 4,
      text: "Convenient location in Abu Dhabi, good selection of luxury cars. The online booking saved me a lot of time.",
      nameAr: "إيلينا بيتروفا",
      titleAr: "مسافرة أعمال",
      textAr: "موقع مناسب في أبوظبي، تشكيلة جيدة من السيارات الفاخرة. الحجز عبر الإنترنت وفر لي الكثير من الوقت.",
      nameFr: "Elena Petrova",
      titleFr: "Voyageur d'affaires",
      textFr: "Emplacement pratique à Abu Dhabi, bon choix de voitures de luxe. La réservation en ligne m'a fait gagner beaucoup de temps.",
      branch: "abu-dhabi",
    },
    {
      id: "4",
      name: "Mohammed Al Falasi",
      title: "Local Resident",
      avatar: "",
      rating: 5,
      text: "I use them for all my car needs. The Sharjah branch has the best prices for long-term rentals. Loyal customer for 2 years now.",
      nameAr: "محمد الفلاسي",
      titleAr: "مقيم محلي",
      textAr: "أستخدمهم لجميع احتياجاتي من السيارات. فرع الشارقة لديه أفضل الأسعار للتأجير طويل الأمد. عميل مخلص منذ سنتين.",
      nameFr: "Mohammed Al Falasi",
      titleFr: "Résident local",
      textFr: "Je les utilise pour tous mes besoins automobiles. L'agence de Sharjah a les meilleurs prix pour les locations longue durée. Client fidèle depuis 2 ans.",
      branch: "sharjah",
    },
    {
      id: "5",
      name: "James Wilson",
      title: "Tourist",
      avatar: "",
      rating: 5,
      text: "Booked a car online before arriving in Dubai. The pickup at Downtown was quick, and dropping off at Marina was just as easy. Will definitely use again.",
      nameAr: "جيمس ويلسون",
      titleAr: "سائح",
      textAr: "حجزت سيارة عبر الإنترنت قبل الوصول إلى دبي. الاستلام في وسط المدينة كان سريعاً، والتسليم في المارينا كان بنفس السهولة. سأستخدم الخدمة مرة أخرى بالتأكيد.",
      nameFr: "James Wilson",
      titleFr: "Touriste",
      textFr: "J'ai réservé une voiture en ligne avant d'arriver à Dubaï. La prise en charge au centre-ville a été rapide, et le retour à Marina tout aussi facile. Je réutiliserai certainement leurs services.",
      branch: "downtown-dubai",
    },
  ];
}

function getFallbackPricing(): PricingTier[] {
  return [
    {
      id: "1",
      category: "economy",
      daily: 30,
      weekly: 180,
      monthly: 600,
      mileage: "200 km/day free",
      deposit: 150,
    },
    {
      id: "2",
      category: "sedan",
      daily: 45,
      weekly: 270,
      monthly: 900,
      mileage: "250 km/day free",
      deposit: 250,
    },
    {
      id: "3",
      category: "suv",
      daily: 75,
      weekly: 450,
      monthly: 1500,
      mileage: "300 km/day free",
      deposit: 400,
    },
    {
      id: "4",
      category: "van",
      daily: 95,
      weekly: 570,
      monthly: 1900,
      mileage: "250 km/day free",
      deposit: 550,
    },
    {
      id: "5",
      category: "luxury",
      daily: 130,
      weekly: 780,
      monthly: 2600,
      mileage: "300 km/day free",
      deposit: 900,
    },
  ];
}

function getFallbackFaq(): FaqItem[] {
  return [
    {
      id: "1",
      question: "What documents do I need to rent a car?",
      answer:
        "You need a valid driving license (international or local), passport or Emirates ID, and a security deposit. Minimum age is 21 years.",
      questionAr: "ما هي المستندات المطلوبة لاستئجار سيارة؟",
      answerAr: "تحتاج إلى رخصة قيادة سارية (دولية أو محلية)، جواز سفر أو هوية إماراتية، وتأمين. الحد الأدنى للعمر هو 21 سنة.",
      questionFr: "Quels documents sont nécessaires pour louer une voiture ?",
      answerFr: "Vous avez besoin d'un permis de conduire valide (international ou local), d'un passeport ou d'une carte d'identité des Émirats, et d'une caution. L'âge minimum est de 21 ans.",
    },
    {
      id: "2",
      question: "Can I pick up the car at one branch and return it to another?",
      answer:
        "Yes! We offer one-way rentals between all our branches. A small additional fee may apply depending on the locations.",
      questionAr: "هل يمكنني استلام السيارة من فرع وتسليمها في فرع آخر؟",
      answerAr: "نعم! نقدم خدمة التأجير باتجاه واحد بين جميع فروعنا. قد يتم تطبيق رسوم إضافية بسيطة حسب المواقع.",
      questionFr: "Puis-je prendre la voiture dans une agence et la rendre dans une autre ?",
      answerFr: "Oui ! Nous proposons des locations aller-retour entre toutes nos agences. Des frais supplémentaires peuvent s'appliquer selon les agences.",
    },
    {
      id: "3",
      question: "What is your cancellation policy?",
      answer:
        "Free cancellation up to 24 hours before pickup. Late cancellations may incur a charge of one day's rental.",
      questionAr: "ما هي سياسة الإلغاء؟",
      answerAr: "إلغاء مجاني حتى 24 ساعة قبل الاستلام. قد يتم فرض رسوم يوم إيجار واحد للإلغاء المتأخر.",
      questionFr: "Quelle est votre politique d'annulation ?",
      answerFr: "Annulation gratuite jusqu'à 24 heures avant la prise en charge. Les annulations tardives peuvent entraîner des frais d'un jour de location.",
    },
    {
      id: "4",
      question: "Do you offer long-term rentals?",
      answer:
        "Yes, we offer weekly and monthly rates with significant discounts. Contact your nearest branch for custom quotes.",
      questionAr: "هل تقدمون تأجير طويل الأمد؟",
      answerAr: "نعم، نقدم أسعاراً أسبوعية وشهرية بخصومات كبيرة. اتصل بأقرب فرع للحصول على عروض مخصصة.",
      questionFr: "Proposez-vous des locations longue durée ?",
      answerFr: "Oui, nous proposons des tarifs hebdomadaires et mensuels avec des remises importantes. Contactez votre agence la plus proche pour des devis personnalisés.",
    },
    {
      id: "5",
      question: "What insurance coverage is included?",
      answer:
        "All rentals include basic third-party liability insurance. Collision Damage Waiver (CDW) and comprehensive coverage are available as add-ons.",
      questionAr: "ما هو التغطية التأمينية المشمولة؟",
      answerAr: "جميع الإيجارات تشمل تأمين المسؤولية تجاه الغير الأساسي. تتوفر وثيقة التنازل عن أضرار الاصطدام والتغطية الشاملة كإضافات.",
      questionFr: "Quelle couverture d'assurance est incluse ?",
      answerFr: "Toutes les locations incluent une assurance responsabilité civile de base. Une renonciation aux dommages par collision et une couverture complète sont disponibles en option.",
    },
  ];
}

function getFallbackSettings(): Settings {
  return {
    ownerName: "MultiBranch Rentals",
    ownerWhatsApp: "+971501234567",
    businessEmail: "info@multibranch-rentals.com",
    businessPhone: "+971 4 123 4567",
    businessHours: "Sat–Thu 7:00–23:00, Fri 13:00–22:00",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://x.com",
      youtube: "https://youtube.com",
    },
  };
}
