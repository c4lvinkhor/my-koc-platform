import { useState } from 'react';
import { i18n, type Lang } from '../data/i18n';

export function useLanguage() {
  const [lang, setLang] = useState<Lang>('BM');

  const t = (key: string): string => {
    return i18n[lang][key] || key;
  };

  return { lang, setLang, t };
}
