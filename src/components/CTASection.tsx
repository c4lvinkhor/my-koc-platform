interface CTASectionProps {
  t: (key: string) => string;
}

export default function CTASection({ t }: CTASectionProps) {
  return (
    <section className="py-32 relative border-t border-[var(--color-border)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] via-[var(--color-surface-raised)] to-[var(--color-surface)]" />
      <div className="grain-overlay absolute inset-0 pointer-events-none opacity-[0.02]" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-widest mb-6">
          {t('cta_eyebrow')}
        </p>
        <h2 className="font-display text-4xl md:text-6xl text-[var(--color-text-primary)] tracking-tight leading-[1.1] mb-6">
          {t('cta_title')}
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto mb-12">
          {t('cta_subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#kocs"
            className="px-8 py-4 rounded-full bg-[var(--color-accent)] text-white font-semibold text-base hover:bg-[var(--color-accent-hover)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,105,20,0.25)]"
          >
            {t('cta_primary')}
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-base hover:border-[var(--color-accent)]/50 transition-all duration-300"
          >
            {t('cta_secondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
