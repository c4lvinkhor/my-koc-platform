import { useState, useMemo, useCallback } from 'react';
import { useLanguage } from './hooks/useLanguage';
import { kocs, negeriList, negeriToDaerahs, platforms, audiences } from './data/kocs';
import type { KOC } from './data/kocs';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterSidebar, { type Filters } from './components/FilterSidebar';
import KOCCard from './components/KOCCard';
import PitchModal from './components/PitchModal';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import KOCDetailModal from './components/KOCDetailModal';

const ITEMS_PER_PAGE = 12;

export default function App() {
  const { lang, setLang, t } = useLanguage();
  const [filters, setFilters] = useState<Filters>({
    negeri: [],
    daerah: [],
    platform: [],
    audience: [],
    halal: null,
    search: '',
  });
  const [selectedKoc, setSelectedKoc] = useState<KOC | null>(null);
  const [detailKoc, setDetailKoc] = useState<KOC | null>(null);
  const [page, setPage] = useState(1);

  const filteredKocs = useMemo(() => {
    return kocs.filter(koc => {
      if (filters.negeri.length > 0 && !filters.negeri.includes(koc.negeri)) return false;
      if (filters.daerah.length > 0 && !filters.daerah.includes(koc.daerah)) return false;
      if (filters.platform.length > 0 && !koc.platforms.some(p => filters.platform.includes(p))) return false;
      if (filters.audience.length > 0 && !filters.audience.includes(koc.audience)) return false;
      if (filters.halal === true && !koc.halalCertified) return false;
      if (filters.halal === false && koc.halalCertified) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return koc.name.toLowerCase().includes(q) ||
          koc.handle.toLowerCase().includes(q) ||
          koc.bio.BM.toLowerCase().includes(q) ||
          koc.tags.some(tag => tag.toLowerCase().includes(q));
      }
      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredKocs.length / ITEMS_PER_PAGE);
  const paginatedKocs = filteredKocs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const handleExplore = useCallback(() => {
    const el = document.getElementById('kocs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text-primary)] font-body">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} onExplore={handleExplore} />

      <section id="kocs" className="py-32 relative border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-widest mb-4">
                {t('filters_title')}
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--color-text-primary)] tracking-tight leading-[1.1]">
                {lang === 'BM' ? 'Cari KOC yang Sesuai' : lang === 'ZH' ? '寻找合适的KOC' : 'Find the Right KOC'}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--color-text-muted)]">{t('filter_showing')}</span>
              <span className="px-3 py-1 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] text-sm font-semibold">
                {filteredKocs.length}
              </span>
              <span className="text-sm text-[var(--color-text-muted)]">{t('filter_results')}</span>
            </div>
          </div>

          <div className="mb-12">
            <div className="relative max-w-xl">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={filters.search}
                onChange={e => handleFiltersChange({ ...filters, search: e.target.value })}
                placeholder={t('filter_search')}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-base"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              negeriList={negeriList}
              negeriToDaerahs={negeriToDaerahs}
              platforms={platforms}
              audiences={audiences}
              t={t}
            />

            <div className="flex-1">
              {filteredKocs.length > 0 ? (
                <>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedKocs.map((koc, i) => (
                      <KOCCard
                        key={koc.id}
                        koc={koc}
                        onSelect={setSelectedKoc}
                        onViewProfile={setDetailKoc}
                        index={i}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="w-10 rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                            p === page
                              ? 'bg-[var(--color-accent)] text-white'
                              : 'bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/50'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="w-10 h-10 rounded-lg bg-[var(--color-surface-raised)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-lg">{t('results_no_match')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ServicesSection t={t} />
      <AboutSection t={t} />
      <CTASection t={t} />
      <Footer t={t} />

      {detailKoc && !selectedKoc && (
         <KOCDetailModal
           koc={detailKoc}
           onClose={() => setDetailKoc(null)}
           onGeneratePitch={(koc) => {
             setDetailKoc(null);
             setSelectedKoc(koc);
           }}
           t={t}
         />
       )}

       {selectedKoc && (
         <PitchModal
           koc={selectedKoc}
           onClose={() => setSelectedKoc(null)}
           t={t}
         />
       )}
    </div>
  );
}
