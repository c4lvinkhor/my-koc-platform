interface ServicesSectionProps {
  t: (key: string) => string;
}

export default function ServicesSection({ t }: ServicesSectionProps) {
  const services = [
    {
      number: '01',
      titleKey: 'service_1_title',
      descKey: 'service_1_desc',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      number: '02',
      titleKey: 'service_2_title',
      descKey: 'service_2_desc',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      number: '03',
      titleKey: 'service_3_title',
      descKey: 'service_3_desc',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
    },
    {
      number: '04',
      titleKey: 'service_4_title',
      descKey: 'service_4_desc',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-widest mb-4">
              {t('services_eyebrow')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--color-text-primary)] tracking-tight leading-[1.1]">
              {t('services_title')}
            </h2>
          </div>
          <div className="md:pt-6">
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t('services_subtitle')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.number}
              className="group p-8 rounded-2xl bg-[var(--color-surface-raised)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-xl bg-[var(--color-surface-overlay)] text-[var(--color-accent)] group-hover:bg-[var(--color-accent)]/10 transition-colors">
                  {service.icon}
                </div>
                <span className="font-display text-4xl text-[var(--color-text-muted)]/30">{service.number}</span>
              </div>
              <h3 className="font-display text-2xl text-[var(--color-text-primary)] mb-3 tracking-tight">
                {t(service.titleKey)}
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {t(service.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
