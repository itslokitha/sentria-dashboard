import { useSettings } from './useSettings.tsx';
import { translations, Language } from '../translations';

export function useTranslation() {
  const { settings } = useSettings();
  const lang = (settings.language || 'en') as Language;

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[lang];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English if translation not found
        console.warn(`Translation not found for: ${path} in language: ${lang}`);
        current = translations.en;
        for (const k of keys) {
          if (current && typeof current === 'object' && k in current) {
            current = current[k];
          } else {
            return path; // Return the path itself if not found
          }
        }
        return current;
      }
    }

    return typeof current === 'string' ? current : path;
  };

  return { t, lang };
}