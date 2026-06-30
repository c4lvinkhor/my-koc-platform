interface HeroProps {
  t: (key: string) => string;
  onExplore: () => void;
}

export default function Hero({ t, onExplore }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img
          src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=A%20stunning%20aerial%20photograph%20of%20Kuala%20Lumpur%20cityscape%20at%20golden%20hour%2C%20Malaysia%2C%20with%20Petronas%20Towers%20and%20modern%20skyline%2C%20warm%20lighting%2C%20editorial%20travel%20photography%2C%20cinematic%20composition&image_size=landscape_16_9"
          alt="Perak Heritage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[var(--color-surface)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-[0.3em] mb-6">
            {t('hero_eyebrow')}
          </p>
        </div>

        <h1 className="opacity-0 animate-fade-in-up font-display text-5xl md:text-7xl lg:text-8xl text-[var(--color-text-primary)] tracking-tight leading-[0.95] mb-8 whitespace-pre-line" style={{ animationDelay: '0.4s' }}>
          {t('hero_title')}
        </h1>

        <p className="opacity-0 animate-fade-in-up text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed mb-12" style={{ animationDelay: '0.6s' }}>
          {t('hero_subtitle')}
        </p>

        <div className="opacity-0 animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={onExplore}
            className="px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-semibold text-base hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg shadow-[var(--color-accent)]/20"
          >
            {t('hero_cta')}
          </button>
          <a
            href="#services"
            className="px-8 py-4 rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-base hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-raised)] transition-all duration-300"
          >
            {t('hero_cta_secondary')}
          </a>
        </div>

        <div className="opacity-0 animate-fade-in-up mt-20 pt-8 border-t border-[var(--color-border)] grid grid-cols-3 gap-8" style={{ animationDelay: '1s' }}>
          <div>
            <p className="font-display text-3xl md:text-4xl text-[var(--color-text-primary)]">2,400+</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">{t('hero_stat_kocs')}</p>
          </div>
          <div>
            <p className="font-display text-3xl md:text-4xl text-[var(--color-text-primary)]">850+</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">{t('hero_stat_merchants')}</p>
          </div>
          <div>
            <p className="font-display text-3xl md:text-4xl text-[var(--color-text-primary)]">97%</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">{t('hero_stat_satisfaction')}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <div className="w-6 h-10 rounded-full border-2 border-[var(--color-border)] flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-[var(--color-text-muted)] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
