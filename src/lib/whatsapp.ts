function cleanPhone(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

export function createWhatsAppUrl(phone: string, text: string): string {
  const cleaned = cleanPhone(phone);
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`;
}

interface BookingDetails {
  name?: string;
  phone?: string;
  car?: string;
  branch?: string;
  pickupDate?: string;
  returnDate?: string;
  message?: string;
}

export function createBookingMessage(
  details: BookingDetails,
  locale: string = "en"
): string {
  const lines: string[] = [];

  if (locale === "ar") {
    lines.push("طلب حجز سيارة:");
    if (details.name) lines.push(`الاسم: ${details.name}`);
    if (details.phone) lines.push(`الهاتف: ${details.phone}`);
    if (details.car) lines.push(`السيارة: ${details.car}`);
    if (details.branch) lines.push(`الفرع: ${details.branch}`);
    if (details.pickupDate) lines.push(`تاريخ الاستلام: ${details.pickupDate}`);
    if (details.returnDate)
      lines.push(`تاريخ الإرجاع: ${details.returnDate}`);
    if (details.message) lines.push(`ملاحظات: ${details.message}`);
  } else if (locale === "fr") {
    lines.push("Demande de réservation:");
    if (details.name) lines.push(`Nom: ${details.name}`);
    if (details.phone) lines.push(`Téléphone: ${details.phone}`);
    if (details.car) lines.push(`Voiture: ${details.car}`);
    if (details.branch) lines.push(`Succursale: ${details.branch}`);
    if (details.pickupDate)
      lines.push(`Date de prise en charge: ${details.pickupDate}`);
    if (details.returnDate)
      lines.push(`Date de retour: ${details.returnDate}`);
    if (details.message) lines.push(`Notes: ${details.message}`);
  } else {
    lines.push("New Booking Request:");
    if (details.name) lines.push(`Name: ${details.name}`);
    if (details.phone) lines.push(`Phone: ${details.phone}`);
    if (details.car) lines.push(`Car: ${details.car}`);
    if (details.branch) lines.push(`Branch: ${details.branch}`);
    if (details.pickupDate)
      lines.push(`Pick-up Date: ${details.pickupDate}`);
    if (details.returnDate)
      lines.push(`Return Date: ${details.returnDate}`);
    if (details.message) lines.push(`Notes: ${details.message}`);
  }

  return lines.join("\n");
}
