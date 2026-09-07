import { CafeInfo, OfferingItem, GalleryPhoto, DayOpeningHour } from '../types';
import thekeImg from '../assets/images/ambiente-theke.jpg';
import erdbeerImg from '../assets/images/erdbeer-eisbecher.jpg';
import kiwiImg from '../assets/images/kiwi-eisbecher.jpg';
import latteImg from '../assets/images/latte-torte.jpg';
import windbeutelImg from '../assets/images/windbeutel-kuchen.jpg';

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
  // Google Maps Fotos & Rezensionen Übersicht
  googleMapsPhotosUrl: 'https://www.google.com/maps/search/?api=1&query=Eiscaf%C3%A9+Ambiente+Kurzackerstra%C3%9Fe+10+P%C3%B6%C3%9Fneck',
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
    image: kiwiImg,
    alt: 'Hausgemachter bunter Eisbecher mit Sahne und frischen Früchten im Eiscafé Ambiente',
    accentColor: '#D9822B',
  },
  {
    id: 'kaffee',
    title: 'Kaffee',
    description: 'Kaffee und Kaffeespezialitäten für eine gemütliche Auszeit.',
    image: latteImg,
    alt: 'Frisch zubereiteter Latte Macchiato mit feinem Milchschaum im Eiscafé Ambiente',
    accentColor: '#8C5332',
  },
  {
    id: 'kuchen',
    title: 'Kuchen & Süßes',
    description: 'Etwas Süßes zum Kaffee oder einfach für zwischendurch.',
    image: windbeutelImg,
    alt: 'Hausgebackener Sahne-Windbeutel und Kuchen im Eiscafé Ambiente',
    accentColor: '#A06D53',
  },
];

/**
 * BILDERGALERIE
 * Verwendet ausschließlich die 5 Originalaufnahmen des Eiscafé Ambiente:
 * 1. Theke & Innenraum
 * 2. Erdbeer-Eisbecher
 * 3. Bunter Eisbecher im Kelchglas
 * 4. Latte Macchiato & Torte
 * 5. Windbeutel & Kuchen
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-theke',
    title: 'Eistheke, Vitrine & Café-Ambiente',
    category: 'Unser Café',
    imageUrl: thekeImg,
    alt: 'Die gemütliche Eistheke und Kuchenvitrine im Eiscafé Ambiente Pößneck',
  },
  {
    id: 'photo-erdbeer',
    title: 'Klassischer Erdbeer-Eisbecher',
    category: 'Eisspezialitäten',
    imageUrl: erdbeerImg,
    alt: 'Frischer Erdbeer-Eisbecher mit Sahne, Waffel und Minze im Glas serviert',
  },
  {
    id: 'photo-kiwi',
    title: 'Fruchtiger Eisbecher im Kelchglas',
    category: 'Eisspezialitäten',
    imageUrl: kiwiImg,
    alt: 'Bunter Eisbecher mit feiner Sahne, Früchten und Waffel im hohen Eisglas',
  },
  {
    id: 'photo-latte',
    title: 'Latte Macchiato & Torte',
    category: 'Kaffee & Torten',
    imageUrl: latteImg,
    alt: 'Geschichteter Latte Macchiato und ein Stück feine Torte auf dem Cafétisch',
  },
  {
    id: 'photo-windbeutel',
    title: 'Großer Sahne-Windbeutel & Kuchen',
    category: 'Kuchen & Gebäck',
    imageUrl: windbeutelImg,
    alt: 'Großer, mit frischer Sahne gefüllter Windbeutel und saftiger Kuchen',
  },
];
