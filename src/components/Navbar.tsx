import { useState, useEffect } from 'react';
import type { Lang } from '../data/i18n';

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

export default function Navbar({ lang, setLang, t }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--color-surface)]/95 backdrop-blur-md border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="font-display text-xl text-white font-bold">M</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-lg text-[var(--color-text-primary)] tracking-tight leading-none">MY KOC</p>
            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">{t('nav_subtitle')}</p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#kocs" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            {t('nav_kocs')}
          </a>
          <a href="#favorites" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            {t('nav_favorites')}
          </a>
          <a href="#services" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            {t('nav_services')}
          </a>
          <a href="#about" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            {t('nav_about')}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-[var(--color-surface-overlay)] rounded-full p-1">
            {(['BM', 'EN', 'ZH'] as Lang[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  lang === l
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href="#kocs"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-[var(--color-accent)] text-white text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            {t('nav_cta')}
          </a>
        </div>
      </div>
    </nav>
  );
}
