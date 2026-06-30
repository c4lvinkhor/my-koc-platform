interface AboutSectionProps {
  t: (key: string) => string;
}

export default function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="about" className="py-32 relative border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=A%20modern%20Malaysian%20office%20space%20with%20warm%20lighting%20and%20diverse%20professionals%20collaborating%2C%20editorial%20photography%20style%2C%20rich%20tones&image_size=portrait_4_3"
                alt="MY KOC Platform Team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--color-accent)]/10 rounded-3xl border border-[var(--color-accent)]/20 flex flex-col items-center justify-center backdrop-blur-sm">
              <p className="font-display text-4xl text-[var(--color-accent)]">10+</p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">{t('about_experience')}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-widest mb-4">
              {t('about_eyebrow')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--color-text-primary)] tracking-tight leading-[1.1] mb-8">
              {t('about_title')}
            </h2>
            <div className="space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
              <p>{t('about_desc_1')}</p>
              <p>{t('about_desc_2')}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-[var(--color-border)]">
              <div>
                <p className="font-display text-3xl text-[var(--color-text-primary)]">2,400+</p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{t('about_stat_kocs')}</p>
              </div>
              <div>
                <p className="font-display text-3xl text-[var(--color-text-primary)]">850+</p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{t('about_stat_merchants')}</p>
              </div>
              <div>
                <p className="font-display text-3xl text-[var(--color-text-primary)]">97%</p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{t('about_stat_satisfaction')}</p>
              </div>
              <div>
                <p className="font-display text-3xl text-[var(--color-text-primary)]">16</p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{t('about_stat_negeri')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
