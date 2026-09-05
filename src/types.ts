export interface DayOpeningHour {
  dayIndex: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  dayName: string;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
  displayHours: string;
}

export interface CafeInfo {
  name: string;
  brandSubtitle: string;
  tagline: string;
  address: {
    street: string;
    zip: string;
    city: string;
    state: string;
    fullFormatted: string;
  };
  phones: {
    landline: string;
    landlineRaw: string;
    mobile: string;
    mobileRaw: string;
  };
  googleRating: {
    score: number;
    maxScore: number;
    source: string;
    label: string;
  };
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  openingHours: DayOpeningHour[];
}

export interface OfferingItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  accentColor: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  alt: string;
}
