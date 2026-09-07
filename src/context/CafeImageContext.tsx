import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAllImagesFromStorage,
  saveImageToStorage,
  removeImageFromStorage,
} from '../utils/imageStorage';

export type SlotId = 'theke' | 'erdbeerbecher' | 'kiwibecher' | 'lattemacchiato' | 'windbeutel';

export interface ImageSlot {
  id: SlotId;
  title: string;
  contextUsage: string;
  expectedFilenamePattern: string;
  defaultUrl: string;
  currentUrl: string;
  isOriginalUploaded: boolean;
  alt: string;
}

const INITIAL_SLOTS: Record<SlotId, Omit<ImageSlot, 'currentUrl' | 'isOriginalUploaded'>> = {
  theke: {
    id: 'theke',
    title: 'Eistheke & Gastraum',
    contextUsage: 'Gastraum, Kuchenvitrine & Galerie',
    expectedFilenamePattern: '13-54-56',
    defaultUrl: '/images/ambiente-theke.jpg',
    alt: 'Die gemütliche Eistheke und Kuchenvitrine im Eiscafé Ambiente Pößneck',
  },
  erdbeerbecher: {
    id: 'erdbeerbecher',
    title: 'Erdbeer-Eisbecher',
    contextUsage: 'Hero-Startbereich & Galerie',
    expectedFilenamePattern: '13-52-57',
    defaultUrl: '/images/erdbeer-eisbecher.jpg',
    alt: 'Klassischer Erdbeer-Eisbecher mit Schlagsahne und Waffel im Eiscafé Ambiente',
  },
  kiwibecher: {
    id: 'kiwibecher',
    title: 'Kiwi-Eisbecher im Kelchglas',
    contextUsage: 'Angebot (Eis) & Galerie',
    expectedFilenamePattern: '13-53-15',
    defaultUrl: '/images/kiwi-eisbecher.jpg',
    alt: 'Bunter Kiwi-Eisbecher mit Sahne und Früchten im hohen Eisglas',
  },
  lattemacchiato: {
    id: 'lattemacchiato',
    title: 'Latte Macchiato & Torte',
    contextUsage: 'Angebot (Kaffee) & Über uns',
    expectedFilenamePattern: '13-54-06',
    defaultUrl: '/images/latte-torte.jpg',
    alt: 'Latte Macchiato und ein Stück feine Torte auf dem Cafétisch',
  },
  windbeutel: {
    id: 'windbeutel',
    title: 'Sahne-Windbeutel & Kuchen',
    contextUsage: 'Angebot (Kuchen & Süßes) & Galerie',
    expectedFilenamePattern: '13-53-39',
    defaultUrl: '/images/windbeutel-kuchen.jpg',
    alt: 'Großer, mit Sahne gefüllter Windbeutel und saftiger Kuchen',
  },
};

interface CafeImageContextType {
  slots: Record<SlotId, ImageSlot>;
  getImageUrl: (slotId: SlotId) => string;
  getImageAlt: (slotId: SlotId) => string;
  hasOriginalUploads: boolean;
  uploadFiles: (files: FileList | File[]) => Promise<{ matchedCount: number; totalCount: number }>;
  uploadSingleSlot: (slotId: SlotId, file: File) => Promise<void>;
  resetSlot: (slotId: SlotId) => Promise<void>;
  resetAllSlots: () => Promise<void>;
}

const CafeImageContext = createContext<CafeImageContextType | undefined>(undefined);

export const CafeImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedImages, setStoredImages] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAllImagesFromStorage().then((images) => {
      setStoredImages(images);
      setIsLoaded(true);
    });
  }, []);

  const getSlot = (id: SlotId): ImageSlot => {
    const base = INITIAL_SLOTS[id];
    const original = storedImages[id];
    return {
      ...base,
      currentUrl: original || base.defaultUrl,
      isOriginalUploaded: Boolean(original),
    };
  };

  const slots: Record<SlotId, ImageSlot> = {
    theke: getSlot('theke'),
    erdbeerbecher: getSlot('erdbeerbecher'),
    kiwibecher: getSlot('kiwibecher'),
    lattemacchiato: getSlot('lattemacchiato'),
    windbeutel: getSlot('windbeutel'),
  };

  const hasOriginalUploads = Object.values(slots).some((s) => s.isOriginalUploaded);

  const getImageUrl = (slotId: SlotId): string => {
    return slots[slotId]?.currentUrl || INITIAL_SLOTS[slotId].defaultUrl;
  };

  const getImageAlt = (slotId: SlotId): string => {
    return slots[slotId]?.alt || INITIAL_SLOTS[slotId].alt;
  };

  const uploadSingleSlot = async (slotId: SlotId, file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        await saveImageToStorage(slotId, dataUrl);
        setStoredImages((prev) => ({ ...prev, [slotId]: dataUrl }));
        resolve();
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const uploadFiles = async (files: FileList | File[]): Promise<{ matchedCount: number; totalCount: number }> => {
    const fileArray = Array.from(files);
    let matchedCount = 0;
    const remainingSlots: SlotId[] = ['theke', 'erdbeerbecher', 'kiwibecher', 'lattemacchiato', 'windbeutel'];

    for (const file of fileArray) {
      const name = file.name.toLowerCase();
      let matchedSlot: SlotId | null = null;

      // Smart matching by filename keywords or Google Maps timestamps
      if (name.includes('13-54-56') || name.includes('theke') || name.includes('tresen') || name.includes('innen')) {
        matchedSlot = 'theke';
      } else if (name.includes('13-52-57') || name.includes('erdbeer') || name.includes('strawberry')) {
        matchedSlot = 'erdbeerbecher';
      } else if (name.includes('13-53-15') || name.includes('kiwi') || name.includes('kelch')) {
        matchedSlot = 'kiwibecher';
      } else if (name.includes('13-54-06') || name.includes('latte') || name.includes('macchiato') || name.includes('kaffee')) {
        matchedSlot = 'lattemacchiato';
      } else if (name.includes('13-53-39') || name.includes('windbeutel') || name.includes('kuchen') || name.includes('torte')) {
        matchedSlot = 'windbeutel';
      } else {
        // Fallback to next unfilled slot
        matchedSlot = remainingSlots.shift() || null;
      }

      if (matchedSlot) {
        await uploadSingleSlot(matchedSlot, file);
        matchedCount++;
        // Remove from remaining
        const idx = remainingSlots.indexOf(matchedSlot);
        if (idx !== -1) remainingSlots.splice(idx, 1);
      }
    }

    return { matchedCount, totalCount: fileArray.length };
  };

  const resetSlot = async (slotId: SlotId) => {
    await removeImageFromStorage(slotId);
    setStoredImages((prev) => {
      const copy = { ...prev };
      delete copy[slotId];
      return copy;
    });
  };

  const resetAllSlots = async () => {
    for (const key of Object.keys(slots) as SlotId[]) {
      await removeImageFromStorage(key);
    }
    setStoredImages({});
  };

  if (!isLoaded) {
    // Avoid flash of unstyled content
    return null;
  }

  return (
    <CafeImageContext.Provider
      value={{
        slots,
        getImageUrl,
        getImageAlt,
        hasOriginalUploads,
        uploadFiles,
        uploadSingleSlot,
        resetSlot,
        resetAllSlots,
      }}
    >
      {children}
    </CafeImageContext.Provider>
  );
};

export const useCafeImages = (): CafeImageContextType => {
  const ctx = useContext(CafeImageContext);
  if (!ctx) {
    throw new Error('useCafeImages must be used within a CafeImageProvider');
  }
  return ctx;
};
