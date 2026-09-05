import { CafeInfo, OfferingItem, GalleryPhoto, DayOpeningHour } from '../types';

/**
 * ZENTRALE DATENSTRUKTUR FÜR DAS EISCAFÉ AMBIENTE
 * Alle relevanten Kontaktdaten, Öffnungszeiten und Inhalte sind hier zentral gebündelt.
 * Änderungen an Öffnungszeiten oder Telefonnummern müssen nur hier vorgenommen werden.
 */
export const CAFE_DATA: CafeInfo = {
  name: 'Eiscafé Ambiente',
  brandSubtitle: 'Eiscafé · Pößneck',
  tagline: 'Eis, Kaffee & gemütliche Momente in Pößneck.',
  address: {
    street: 'Kurzackerstraße 10',
    zip: '07381',
    city: 'Pößneck',
    state: 'Thüringen',
    fullFormatted: 'Kurzackerstraße 10, 07381 Pößneck, Thüringen',
  },
  phones: {
    landline: '03647 445330',
    landlineRaw: '+493647445330',
    mobile: '0163 2124808',
    mobileRaw: '+491632124808',
  },
  googleRating: {
    score: 4.2,
    maxScore: 5.0,
    source: 'Google',
    label: 'Bewertung auf Google',
  },
  // Direkter Routenplaner-Link zu Google Maps
  googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kurzackerstra%C3%9Fe+10,+07381+P%C3%B6%C3%9Fneck',
  // Karten-Ansicht Embed URL
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Kurzackerstra%C3%9Fe+10,+07381+P%C3%B6%C3%9Fneck&t=&z=16&ie=UTF8&iwloc=&output=embed',
  // ZENTRALE ÖFFNUNGSZEITEN (Montag Ruhetag, Di-So 13:00 - 17:30)
  openingHours: [
    {
      dayIndex: 1,
      dayName: 'Montag',
      isOpen: false,
      displayHours: 'geschlossen',
    },
    {
      dayIndex: 2,
      dayName: 'Dienstag',
      isOpen: true,
      openTime: '13:00',
      closeTime: '17:30',
      displayHours: '13:00 – 17:30 Uhr',
    },
    {
      dayIndex: 3,
      dayName: 'Mittwoch',
      isOpen: true,
      openTime: '13:00',
      closeTime: '17:30',
      displayHours: '13:00 – 17:30 Uhr',
    },
    {
      dayIndex: 4,
      dayName: 'Donnerstag',
      isOpen: true,
      openTime: '13:00',
      closeTime: '17:30',
      displayHours: '13:00 – 17:30 Uhr',
    },
    {
      dayIndex: 5,
      dayName: 'Freitag',
      isOpen: true,
      openTime: '13:00',
      closeTime: '17:30',
      displayHours: '13:00 – 17:30 Uhr',
    },
    {
      dayIndex: 6,
      dayName: 'Samstag',
      isOpen: true,
      openTime: '13:00',
      closeTime: '17:30',
      displayHours: '13:00 – 17:30 Uhr',
    },
    {
      dayIndex: 0,
      dayName: 'Sonntag',
      isOpen: true,
      openTime: '13:00',
      closeTime: '17:30',
      displayHours: '13:00 – 17:30 Uhr',
    },
  ],
};

/**
 * Berechnung des aktuellen Öffnungsstatus in Echtzeit
 */
export function getOpeningStatus(date: Date = new Date()): {
  isTodayOpen: boolean;
  isOpenRightNow: boolean;
  statusHeadline: string;
  statusBadge: string;
  statusSubtext: string;
  currentDayIndex: number;
  todaySchedule: DayOpeningHour;
} {
  const currentDay = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const schedule = CAFE_DATA.openingHours.find((h) => h.dayIndex === currentDay) || CAFE_DATA.openingHours[0];

  if (!schedule.isOpen || !schedule.openTime || !schedule.closeTime) {
    return {
      isTodayOpen: false,
      isOpenRightNow: false,
      statusHeadline: 'Heute geschlossen',
      statusBadge: 'Geschlossen',
      statusSubtext: 'Heute ist Ruhetag im Eiscafé Ambiente. Morgen wieder für Sie da!',
      currentDayIndex: currentDay,
      todaySchedule: schedule,
    };
  }

  // Parse hours and minutes
  const [openHour, openMin] = schedule.openTime.split(':').map(Number);
  const [closeHour, closeMin] = schedule.closeTime.split(':').map(Number);

  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();
  const currentTotalMins = currentHours * 60 + currentMinutes;
  const openTotalMins = openHour * 60 + openMin;
  const closeTotalMins = closeHour * 60 + closeMin;

  const isOpenRightNow = currentTotalMins >= openTotalMins && currentTotalMins < closeTotalMins;

  let subtext = `Heute geöffnet von ${schedule.openTime} bis ${schedule.closeTime} Uhr`;
  if (isOpenRightNow) {
    const minsLeft = closeTotalMins - currentTotalMins;
    if (minsLeft <= 45) {
      subtext = `Jetzt geöffnet – schließt heute um ${schedule.closeTime} Uhr (in ${minsLeft} Min.)`;
    } else {
      subtext = `Jetzt geöffnet – wir freuen uns auf Ihren Besuch bis ${schedule.closeTime} Uhr`;
    }
  } else if (currentTotalMins < openTotalMins) {
    subtext = `Heute ab ${schedule.openTime} Uhr für Sie geöffnet`;
  } else {
    subtext = `Heute bis ${schedule.closeTime} Uhr geöffnet gewesen. Bis morgen!`;
  }

  return {
    isTodayOpen: true,
    isOpenRightNow,
    statusHeadline: 'Heute geöffnet',
    statusBadge: isOpenRightNow ? 'Jetzt geöffnet' : 'Heute geöffnet',
    statusSubtext: subtext,
    currentDayIndex: currentDay,
    todaySchedule: schedule,
  };
}

/**
 * 3 KERNANGEBOTE GEMÄSS VORGABE
 * Keine erfundenen Produkte oder Preise.
 */
export const CAFE_OFFERINGS: OfferingItem[] = [
  {
    id: 'eis',
    title: 'Eis',
    description: 'Leckeres Eis für kleine und große Eisliebhaber.',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80',
    alt: 'Appetitliche Auswahl an feinstem Eis im Glas serviert',
    accentColor: '#D9822B',
  },
  {
    id: 'kaffee',
    title: 'Kaffee',
    description: 'Kaffee und Kaffeespezialitäten für eine gemütliche Auszeit.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    alt: 'Frisch gebrühter aromatischer Kaffee mit samtigem Schaum',
    accentColor: '#8C5332',
  },
  {
    id: 'kuchen',
    title: 'Kuchen & Süßes',
    description: 'Etwas Süßes zum Kaffee oder einfach für zwischendurch.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    alt: 'Hausgemachter frischer Kuchen und feine süße Spezialitäten',
    accentColor: '#A06D53',
  },
];

/**
 * BILDERGALERIE
 * HINWEIS FÜR DEN BETREIBER DES EISCAFÉ AMBIENTE:
 * Hier können die Platzhalter-URLs ganz unkompliziert durch echte Fotografien aus dem
 * Eiscafé (z.B. Gastraum, Theke, Eisbecher, Außenbereich in der Kurzackerstraße) ersetzt werden.
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    title: 'Feine Eisbecher & Genuss',
    category: 'Eis & Spezialitäten',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    alt: 'Köstlich garnierter Eisbecher mit Früchten',
  },
  {
    id: 'photo-2',
    title: 'Gemütliches Beisammensein',
    category: 'Café-Atmosphäre',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    alt: 'Helles, gemütliches Café-Ambiente mit Tischen und angenehmer Stimmung',
  },
  {
    id: 'photo-3',
    title: 'Aromatische Kaffeespezialitäten',
    category: 'Kaffee',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    alt: 'Frische Kaffeespezialität im eleganten Glas',
  },
  {
    id: 'photo-4',
    title: 'Süße Köstlichkeiten & Kuchen',
    category: 'Kuchen & Gebäck',
    imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    alt: 'Verlockendes Stück Kuchen für den Nachmittagskaffee',
  },
  {
    id: 'photo-5',
    title: 'Erfrischendes Eisvergnügen',
    category: 'Eis & Spezialitäten',
    imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80',
    alt: 'Bunte Auswahl cremiger Eiskugeln in der Waffel',
  },
  {
    id: 'photo-6',
    title: 'Eine entspannte Pause in Pößneck',
    category: 'Auszeit',
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    alt: 'Wohlfühl-Atmosphäre bei einer Tasse Kaffee im Café',
  },
];
